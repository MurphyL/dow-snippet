const fs = require('fs');
const low = require('lowdb');
const path = require('path');
const shell = require('shelljs');
const lodash = require('lodash');
const toml = require('@iarna/toml');
const matter = require('gray-matter');
const FileSync = require('lowdb/adapters/FileSync');

const DOC_ROOT = './xdm/docs';

const META_FILE = './xdm/docs/meta.toml';
const DEST_FILE = './public/docs/meta.json';

shell.rm('-rf', './public/docs');
shell.mkdir('-p', './public/docs');

const db = low(new FileSync(DEST_FILE));

db.defaults({ }).write();

const meta = fs.readFileSync(META_FILE).toString();

const { cates = [] } = toml.parse(meta);

const mapping = [];


cates.forEach((item) => {
    const { cate, tag } = item;
    const items = [];
    shell.ls('-R', path.join(DOC_ROOT, cate, '**/*.md')).forEach((filepath) => {
        const target = filepath.replace(/^xdm\//g, '');
        shell.mkdir('-p', path.dirname(`./public/${target}`));
        const { data, content } = matter.read(filepath);
        fs.writeFileSync(`./public/${target}`, (content || '').trim());
        const { title, list, icon, tags = [] } = data;
        if(list) {
            items.push(mapping.length);
        }
        mapping.push({
            t: title, 
            i: icon || cate, 
            k: [ tag, ...tags ], // keywords
            u: `/${target.replace(/\.md$/g, '')}` // url
        });
    });
    item.l = items;
});

const cl = cates.map(({ cate, name, tag, l }) => ({ c: cate, n: name, t: tag, l }));

db.set('x', mapping).set('c', cl).write();

console.log('数据文件已生成！~');