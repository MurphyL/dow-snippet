import React, { Fragment } from 'react';

import SimpleIcons from 'utils/icons.jsx';

import MarkdownPost from 'plug/mark/mark.plugin.jsx';

import { AjaxLoadable } from 'plug/loading/loading.jsx';

import styles from './post.module.css';

const Post = ({ details = {}, toggleNavi }) => {
    return (
        <article className={styles.post_plugin}>
            <AjaxLoadable url={`${details.u}.md`} render={(postContent) => {
                return (
                    <Fragment>
                        <header className={styles.header}>
                            <div className={styles.label}>
                                <span className={styles.icon}>
                                    <SimpleIcons icon={details.i || 'dunked'} />
                                </span>
                                <span className={styles.text}>{details.t}</span>
                            </div>
                            <div className={styles.operations}>
                                <span onClick={toggleNavi}>
                                    <SimpleIcons icon="menu" />
                                </span>
                            </div>
                        </header>
                        <section className={styles.board}>
                            <div className={styles.markdown_to_jsx}>
                                <MarkdownPost content={postContent || ''} />
                            </div>
                        </section>
                    </Fragment>
                )
            }} />
        </article>
    );
}

export default Post;