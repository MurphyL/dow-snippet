import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Markdown from 'markdown-to-jsx';

import SimpleIcons from 'utils/icons.jsx';

import { markdownOptions } from 'utils/mark/mark.jsx';

import { Loadable } from 'utils/loading/loading.jsx';

import './post.css';

const Post = ({ details = {}, toggleNavi }) => {
    const [ post, setPostInfo ] = useState({ status: 1 });
    useEffect(() => {
        axios.get(`${details.u}.md`).then(({ status, data }) => {
            setPostInfo({
                 ...(status === 200 ? { status: 0 } : { status: 2, message: '请求数据失败' }), 
                 content: data 
            });
        }).catch(() => {
            setPostInfo({ status: 2, message: '调用接口失败' });
        });
    }, [ details.u ]);
    return (
        <article>
            <Loadable status={ post.status } message="数据加载中……">
                <header className="header" onClick={ toggleNavi }>
                    <div className="label">
                        <span className="icon">
                            <SimpleIcons icon={ details.i || 'dunked' } />
                        </span>
                        <span className="text">{ details.t }</span>
                    </div>
                    <div className="operations">
                        <span>
                            <SimpleIcons icon="menu" />
                        </span>
                    </div>
                </header>
                <section className="board">
                    <div className="markdown-to-jsx">
                        <Markdown children={ post.content || '' } options={ markdownOptions } />
                    </div>
                </section>
            </Loadable>
        </article>
    );
}

export default Post;