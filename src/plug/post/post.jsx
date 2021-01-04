import React, { Fragment } from 'react';


import Markdown from 'markdown-to-jsx';

import SimpleIcons from 'utils/icons.jsx';

import { markdownOptions } from 'plug/mark/mark.jsx';

import { AjaxLoadable } from 'plug/loading/loading.jsx';

import './post.css';

const Post = ({ details = {}, toggleNavi }) => {
    return (
        <article>
            <AjaxLoadable url={ `${details.u}.md` } render={ (postContent) => {
                return (
                    <Fragment>
                        <header className="header">
                            <div className="label">
                                <span className="icon">
                                    <SimpleIcons icon={ details.i || 'dunked' } />
                                </span>
                                <span className="text">{ details.t }</span>
                            </div>
                            <div className="operations">
                                <span onClick={ toggleNavi }>
                                    <SimpleIcons icon="menu" />
                                </span>
                            </div>
                        </header>
                        <section className="board">
                            <div className="markdown-to-jsx">
                                <Markdown children={ postContent || '' } options={ markdownOptions } />
                            </div>
                        </section>
                    </Fragment>
                )
            } }/>
        </article>
    );
}

export default Post;