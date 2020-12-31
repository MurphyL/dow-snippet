import { useState } from 'react';

import { useLocation } from "react-router-dom";

import { AjaxLoadable } from 'plug/loading/loading.jsx';

import ASide from 'plug/aside/aside.jsx';

import Post from 'plug/post/post.jsx';

import './docx.css';

const Snippet = () => {
    const { pathname } = useLocation();
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
                    Object.assign(postDetails, sideOptions.docs.find(({ u }) => (u === pathname)));
                }
            }
            return (
                <div className="docs">
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