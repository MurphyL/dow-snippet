const fs = require('fs');
const low = require('lowdb');
const path = require('path');
const shell = require('shelljs');
const lodash = require('lodash');
const toml = require('@iarna/toml');
const matter = require('gray-matter');
const FileSync = require('lowdb/adapters/FileSync');

const DOC_ROOT = './docs';

const META_FILE = './docs/meta.toml';
const DEST_FILE = './public/docs/meta.json';

shell.rm('-rf', './public/docs');
shell.mkdir('-p', './public/docs');

const db = low(new FileSync(DEST_FILE));

db.defaults({ }).write();

const meta = fs.readFileSync(META_FILE).toString();

const { cates = [] } = toml.parse(meta);

const mapping = [];
const grouped = {};

const merged = cates.map((item) => {
    const { cate, name, tag } = item;
    grouped[cate] = [];
    shell.ls('-R', path.join(DOC_ROOT, cate, '**/*.md')).forEach((filepath) => {
        shell.mkdir('-p', path.dirname(`./public/${filepath}`));
        const { data, content } = matter.read(filepath);
        fs.writeFileSync(`./public/${filepath}`, (content || '').trim());
        const { title, list, icon, tags = [] } = data;
        if(list) {
            grouped[cate].push(mapping.length);
        }
        mapping.push({
            t: title, 
            i: icon || cate, 
            l: list ? 1 : 0,    // list
            k: [ tag, ...tags ], // keywords
            u: `/${filepath.replace(/\.md$/, '')}` // url
        });
    });
    return {
        c: cate, n: name
    };
});

db.set('x', mapping).set('cl', merged).set('cm', grouped).write();

console.log('数据文件已生成！~');