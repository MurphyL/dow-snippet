import React, { Fragment } from 'react';

import { Link } from "react-router-dom";
import Markdown from 'markdown-to-jsx';

import { markdownOptions } from '../../utils/mark/mark';

import { E404 } from '../error/error.jsx';

import './board.css';

const Navi = ({ items = [] }) => {
    return (
        <nav>
            <ol>
                { items.map(({ path, title }, index) => (
                    <li key={index}>
                        <Link to={ `/${path || 'error/404'}` }>{ title }</Link>
                    </li>
                )) }
            </ol>
        </nav>
    );
}

const Post = ({ details }) => {
    return (
        <article>
            <section className="header">
                <span>{details.title}</span>
            </section>
            <section className="board">
                <div className="mark">
                    <Markdown children={ details.content || '' } options={ markdownOptions } />
                </div>
            </section>
        </article>
    );
}

const Board = ({ items, getObject }) => {
    const details = getObject ? getObject(items) : null;
    return details ? (
        <Fragment>
            <Navi items={ items.map(({ title, path }) => ({ title, path })) }/>
            <Post details={ getObject(items) } />
        </Fragment>
    ) : (
        <E404 message="当前类目暂无代码片段"/>
    );

}

export default Board;