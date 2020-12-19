import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Markdown from 'markdown-to-jsx';

import { markdownOptions } from 'utils/mark/mark.jsx';

import SimpleIcons from 'utils/icons.jsx';

import { E404 } from 'utils/error/error.jsx';

import Loading from 'utils/loading/loading.jsx';


import './post.css';

const Post = ({ details }) => {
    const [ post, setPostInfo ] = useState(null);
    useEffect(() => {
        if(details) {
            axios.get(`${details.u}.md`).then(({ status, data }) => {
                if(status === 200) {
                    setPostInfo({ content: data });
                }
            });
        }
    }, [ details ]);
    if(!details) {
        return ( 
            <article>
                <E404 message="指定文章不存在" />
            </article> 
        );
    }
    if(null == post) {
        return (
            <article>
                <Loading />
            </article>
        );
    }
    return (
        <article>
            <section className="header">
                <span className="icon">
                    <SimpleIcons icon={ details.i || 'dunked' } />
                </span>
                <span className="text">{ details.t }</span>
            </section>
            <section className="board">
                <div className="markdown-to-jsx">
                    <Markdown children={ post.content || '' } options={ markdownOptions } />
                </div>
            </section>
        </article>
    );
}

export default Post;