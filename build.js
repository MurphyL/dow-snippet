const fs = require('fs');
const path = require('path');
const toml = require('toml');
const shell = require('shelljs');
const matter = require('gray-matter');

const DOC_ROOT = './doc';

const list = cat => path.join(DOC_ROOT, cat, '*.md');

const index = {};
const items = [];

shell.rm('-rf', './build');

fs.readFile('./doc/meta.toml', (err, content) => {
    if(!err) {
        console.log(toml.parse(content.toString()));
    }
});

shell.ls(DOC_ROOT).forEach(cat => {
    if(/\.toml$/.test(cat)){
        return;
    }
    shell.ls(list(cat)).forEach(doc => {
        const { data, content, path } = matter.read(doc);
        if(data.release) {
            index[path] = items.length;
        }
        items.push({
            ...data, category: cat, path, content: (content || '').trim()
        });
    });
});

shell.mkdir('-p', ['./build']);

const result = JSON.stringify({ index, items }, null, '\t');

fs.writeFile('./public/x.json', result, (err) => {
    if (err) {
        console.error('数据文件写入失败', err);
    } else {
        console.log('数据文件写入完成');
    }
  });
