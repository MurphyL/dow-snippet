const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const matter = require('gray-matter');

const DOC_ROOT = './doc';

const list = cat => path.join(DOC_ROOT, cat, '*.md');

const index = {};
const items = [];

shell.rm('-rf', './build');

shell.ls(DOC_ROOT).forEach(cat => {
    shell.ls(list(cat)).forEach(doc => {
        const { data, content, path } = matter.read(doc);
        if(!data.release) {
            return;
        }
        index[path] = items.length;
        items.push({
            ...data, path, content: (content || '').trim()
        });
    });
});

shell.mkdir('-p', ['./build']);

fs.writeFileSync('./build/x.json', JSON.stringify({ index, items }, null, '\t'));
