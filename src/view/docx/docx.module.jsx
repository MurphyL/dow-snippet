import { useState } from 'react';

import { useFetch } from 'utils/ajax.jsx';

import ASide from 'plug/aside/aside.plugin.jsx';

import Post from 'plug/post/post.plugin.jsx';

import styles from './docx.module.css';

const DocX = ({ location }) => {
    const { data, error } = useFetch('/docs/meta.json');
    const [ asideStatus, setAsideStatus ] = useState(true);
    if(error) {
        return '数据加载失败';
    }
    if(!data) {
        return 'loading';
    }
    const { pathname } = location;
    const target = pathname.replace(/(^\/docs\/?)|(\/*$)/g, '');
    const { c = [{ n: '404' }], x = [] } = data;
    const sideOptions = { cates: c };
    const postDetails = {};
    if(target === '') {
        sideOptions.kind = 'index';
        sideOptions.docs = ((c[0] || {}).l || []).map(i => x[i]);
        sideOptions.markCate = (o, i) => (i === 0);
        sideOptions.markPost = (u, i) => (i === 0);
        Object.assign(postDetails, sideOptions.docs[0]);
    } else {
        const [ cate, ...others ] = target.split('/');
        sideOptions.docs = ((c.find(({ c }) => (c === cate)) || {}).l || []).map(i => x[i]);
        sideOptions.markCate = (c, i) => (c === cate);
        if(others.length === 0) {
            sideOptions.kind = 'cate';
            sideOptions.markPost = (u, i) => (i === 0);
            Object.assign(postDetails, sideOptions.docs[0]);
        } else {
            sideOptions.kind = 'post';
            sideOptions.markPost = (u, i) => (u === pathname);
            Object.assign(postDetails, x.find(({ u }) => (u === pathname)));
        }
    }
    return (
        <div className={ styles.docs }>
            <ASide { ...sideOptions } show={ asideStatus } />
            <Post details={ postDetails } toggleNavi={ () => {
                setAsideStatus(!asideStatus);
             } } />
        </div>
    );
};

export default DocX;