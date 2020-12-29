const fs = require('fs');
const low = require('lowdb');
const path = require('path');
const shell = require('shelljs');
const toml = require('@iarna/toml');
const matter = require('gray-matter');
const FileSync = require('lowdb/adapters/FileSync');

const LOWDB_CONFIG = {};

if(process.env.NODE_ENV === 'production') {
    Object.assign(LOWDB_CONFIG, {
        serialize: (data) => JSON.stringify(data),
        deserialize: (data) => JSON.parse(data)
    });
}

const execute = (tag, process) => {
    console.group(tag);
    process && process();
    console.groupEnd(tag);
    console.log('\n');
};

const clean = (root) => {
    console.log(`正在删除历史文件：${root}`);
    shell.rm('-rf', root);
    shell.mkdir('-p', root);
};

const create = (dest) => {
    console.log(`正在创建数据文件：${dest}`);
    const db = low(new FileSync(dest, LOWDB_CONFIG));
    db.defaults({ }).write();
    return db;
};

const parse = (filepath) => {
    console.log(`正在解析数据文件：${filepath}`);
    return toml.parse(fs.readFileSync(filepath).toString());
};

((tag) => execute(tag, () => {
    const DOCS_DOC_ROOT = './xdm/docs';
    // 删除历史文件
    clean('./public/docs');
    // 创建数据库
    const db = create('./public/docs/meta.json')
    // 解析数据文件
    const { cates = [] } = parse('./xdm/docs/meta.toml');
    // 构造数据
    const mapping = [];
    cates.forEach((item) => {
        const { cate, tag } = item;
        const items = [];
        shell.ls('-R', path.join(DOCS_DOC_ROOT, cate, '**/*.md')).forEach((filepath) => {
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
    // 写入数据
    console.log('正在写入数据文件……');
    const cl = cates.map(({ cate, name, tag, l }) => ({ c: cate, n: name, t: tag, l }));
    db.set('x', mapping).set('c', cl).write();
    console.log('数据文件已生成！');
}))('文档数据文件');

((tag) => execute(tag, () => {
    const X_NAVI_FILE = './xdm/x/navi.toml';
    // 删除历史文件
    clean('./public/x');
    // 创建数据库
    const db = create('./public/x/navi.json')
    // 解析数据文件
    const { navi } = parse('./xdm/x/navi.toml');
    db.set('items', navi.map(({ name, url }) => ({ n: name, u: url }))).write();
    // 写入数据
    console.log('正在写入数据文件……');
    console.log('数据文件已生成！');
}))('导航数据文件')