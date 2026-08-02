const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

class FakeClassList {
    constructor() {
        this.values = new Set();
    }

    add(value) { this.values.add(value); }
    remove(value) { this.values.delete(value); }
    contains(value) { return this.values.has(value); }
    toggle(value) {
        if (this.values.has(value)) {
            this.values.delete(value);
            return false;
        }
        this.values.add(value);
        return true;
    }
}

class FakeElement {
    constructor(id = '') {
        this.id = id;
        this.children = [];
        this.classList = new FakeClassList();
        this.dataset = {};
        this.listeners = {};
        this.style = { setProperty() {} };
        this.value = '';
        this.disabled = false;
        this.clientHeight = 600;
        this.clientWidth = 800;
        this._textContent = '';
    }

    addEventListener(type, listener) { this.listeners[type] = listener; }
    appendChild(child) { this.children.push(child); return child; }
    append(...children) { this.children.push(...children); }
    replaceChildren(...children) { this.children = children; this._textContent = ''; }
    focus() {}
    select() {}
    blur() {}

    set innerHTML(value) {
        this.children = [];
        this._textContent = value;
    }

    get innerHTML() { return this._textContent; }
    set textContent(value) { this._textContent = String(value); }
    get textContent() { return this._textContent; }
    get scrollHeight() { return this._textContent.length > 4000 ? 1200 : 300; }
}

function createReaderContext() {
    const ids = [
        'reader-content', 'fileInput', 'fileNameDisplay', 'progress-input',
        'char-info', 'search-panel', 'searchInput', 'search-results', 'ttsBtn',
        'prevBtn', 'nextBtn', 'fontSizeRange', 'brightnessRange', 'announcement',
        'settings-panel', 'encodingSelect', 'themeSelect', 'modeSelect', 'lineHeightSelect', 'rateRange', 'toolbar'
    ];
    const elements = Object.fromEntries(ids.map(id => [id, new FakeElement(id)]));
    elements.fontSizeRange.value = '24';
    elements.brightnessRange.value = '1';
    elements.encodingSelect.value = 'utf-8';
    elements.themeSelect.value = 'contrast';
    elements.modeSelect.value = 'page';
    elements.lineHeightSelect.value = '1.6';

    const storage = new Map();
    const document = {
        activeElement: null,
        documentElement: new FakeElement('documentElement'),
        body: new FakeElement('body'),
        addEventListener() {},
        createElement: () => new FakeElement(),
        createTextNode: text => ({ textContent: String(text) }),
        getElementById: id => elements[id]
    };

    class FakeFileReader {
        readAsArrayBuffer(file) {
            this.onload({ target: { result: new TextEncoder().encode(file.content).buffer } });
        }
    }

    const speechSynthesis = {
        cancel() {},
        getVoices: () => [],
        speak() {}
    };
    const window = {
        addEventListener() {},
        innerWidth: 1024,
        crypto: { subtle:null },
        getSelection: () => ({ toString: () => '' }),
        speechSynthesis
    };

    const context = vm.createContext({
        alert() {},
        clearTimeout,
        confirm: () => true,
        console,
        document,
        FileReader: FakeFileReader,
        TextDecoder,
        TextEncoder,
        getComputedStyle: () => ({ fontSize: '24px' }),
        localStorage: {
            getItem: key => storage.has(key) ? storage.get(key) : null,
            setItem: (key, value) => storage.set(key, String(value))
        },
        setTimeout: callback => callback(),
        speechSynthesis,
        SpeechSynthesisUtterance: function(text) { this.text = text; },
        window
    });

    const html = fs.readFileSync('reader.html', 'utf8');
    const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
    vm.runInContext(script, context);

    return {
        context,
        elements,
        async open(name, content) {
            elements.fileInput.listeners.change({ target: { files: [{ name, content, size:content.length, lastModified:0 }] } });
            await new Promise(resolve => setImmediate(resolve));
        },
        read(expression) {
            return vm.runInContext(expression, context);
        },
        storage
    };
}

test('opening a new book resets the previous book position', async () => {
    const reader = createReaderContext();
    await reader.open('long.txt', '甲'.repeat(9000));
    reader.read('turnPage(1)');
    assert.ok(reader.read('currentIndex') > 0);

    await reader.open('short.txt', '新書內容');

    assert.equal(reader.read('currentIndex'), 0);
    assert.equal(reader.elements['reader-content'].textContent, '新書內容');
});

test('invalid and out-of-range saved positions are normalized', async () => {
    const reader = createReaderContext();
    reader.storage.set('txt_auto_invalid.txt', 'not-a-number');
    await reader.open('invalid.txt', 'abcdef');
    assert.equal(reader.read('currentIndex'), 0);

    reader.storage.set('txt_auto_too-far.txt', '9999');
    await reader.open('too-far.txt', 'abcdef');
    assert.equal(reader.read('currentIndex'), 5);
});

test('an empty file keeps controls and position in a safe state', async () => {
    const reader = createReaderContext();
    await reader.open('empty.txt', '');

    assert.equal(reader.read('currentIndex'), 0);
    assert.equal(reader.read('fullText'), '');
    assert.equal(reader.elements.prevBtn.disabled, true);
    assert.equal(reader.elements.nextBtn.disabled, true);
    assert.equal(reader.elements['progress-input'].value, 0);
});

test('jumping to 100 percent never moves beyond the text', async () => {
    const reader = createReaderContext();
    await reader.open('book.txt', 'abcdef');
    reader.elements['progress-input'].value = '100';
    reader.elements['progress-input'].listeners.change.call(reader.elements['progress-input']);

    assert.equal(reader.read('currentIndex'), 5);
    assert.ok(reader.read('currentIndex') < reader.read('fullText.length'));
});
