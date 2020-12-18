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

shell.rm('-f', DEST_FILE);

const join = cat => path.join(DOC_ROOT, cat);

const db = low(new FileSync(DEST_FILE));

db.defaults({ docs: [] }).write();

fs.readFile(META_FILE, (err, content) => {
    if(err) {
        return console.error('数据解析失败');
    }
    db.set('meta', toml.parse(content.toString())).write();
});

const docs = [];

shell.ls(DOC_ROOT).forEach((category, i) => {
    if(/\.toml$/.test(category)){
        return;
    }
    shell.ls('-R', [join(category)]).forEach((item, j) => {
        if(!/\.md/.test(item)) {
            return;
        }
        const file = `doc/${category}/${item}`;
        const { data, content, path } = matter.read(file);
        let { title, icon, list } = data;
        if(!list) {
            return;
        }
        if(icon) {
            icon = icon.toLowerCase()
        } else {
            if(item.indexOf('/') > 0) {
                icon = item.substring(item, item.indexOf('/'));
            } else {
                icon = category;
            }
        }
        docs.push({
            title, 
            path, 
            icon,
            list,
            category, 
        });
    });
});

console.log(docs);

db.get('docs').push(...docs).write();

console.log('数据文件已生成！~');