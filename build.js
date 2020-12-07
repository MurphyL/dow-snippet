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

const join = cat => path.join(DOC_ROOT, cat);

const db = low(new FileSync(DEST_FILE));

db.defaults({ dict: {} }).write();

fs.readFile(META_FILE, (err, content) => {
    if(err) {
        return console.error('数据解析失败');
    }
    db.set('meta', toml.parse(content.toString())).write();
});


shell.ls(DOC_ROOT).forEach(category => {
    if(/\.toml$/.test(category)){
        return;
    }
    db.set(`dict.${category}`, []).write();
    shell.ls('-R', [join(category)]).forEach((item) => {
        if(!/\.md/.test(item)) {
            return;
        }
        
        const file = `doc/${category}/${item}`;
        const { data, content, path } = matter.read(file);
        let { title, sort, icon, release } = data;
        if(icon) {
            icon = icon.toLowerCase()
        } else {
            if(item.indexOf('/') > 0) {
                icon = item.substring(item, item.indexOf('/'));
            } else {
                icon = category;
            }
        }
        db.get(`dict.${category}`).push({
            title, 
            sort, 
            path, 
            icon,
            release,
            category, 
            content: (content || '').trim()
        }).write();
    });
});

console.log('数据文件已生成！~');