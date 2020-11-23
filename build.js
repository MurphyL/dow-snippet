const fs = require('fs');
const low = require('lowdb');
const path = require('path');
const shell = require('shelljs');
const toml = require('@iarna/toml');
const matter = require('gray-matter');
const FileSync = require('lowdb/adapters/FileSync');

const DOC_ROOT = './doc';

const META_FILE = './doc/meta.toml';
const DEST_FILE = './public/murph.json';

const list = cat => path.join(DOC_ROOT, cat, '*.md');

const db = low(new FileSync(DEST_FILE));

db.defaults({ dict: {} }).write();

fs.readFile(META_FILE, (err, content) => {
    if(err) {
        return console.error('数据解析失败');
    }
    db.set('meta', toml.parse(content.toString())).write();
});


shell.ls(DOC_ROOT).forEach(cat => {
    if(/\.toml$/.test(cat)){
        return;
    }
    db.set(`dict.${cat}`, []).write();
    let i = 0;
    shell.ls(list(cat)).forEach((doc) => {
        const { data, content, path } = matter.read(doc);
        const { title, release } = data;
        db.get(`dict.${cat}`).push({
            path, 
            title, 
            release, 
            category: cat, 
            content: (content || '').trim()
        }).write();
        i++;
    });
});
