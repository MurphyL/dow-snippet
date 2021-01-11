import { useState } from 'react';

import { AjaxLoadable } from 'plug/loading/loading.jsx';

import ASide from 'plug/aside/aside.plugin.jsx';

import Post from 'plug/post/post.plugin.jsx';

import styles from './docx.module.css';

const Snippet = ({ location }) => {
    const { pathname } = location;
    const [ asideStatus, setAsideStatus ] = useState(true);
    const target = pathname.replace(/(^\/docs\/?)|(\/*$)/g, '');
    return (
        <AjaxLoadable url="/docs/meta.json" render={({ c = [{ n: '404' }], x = [] }) => {
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
        }} />
    )
};

export default Snippet;