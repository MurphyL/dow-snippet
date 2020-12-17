import React, { Fragment } from 'react';

import { Link } from "react-router-dom";
import Markdown from 'markdown-to-jsx';

import { markdownOptions } from 'utils/mark/mark';

import { E404 } from 'utils/error/error.jsx';

import SimpleIcons from 'utils/icons/icons';

import './board.css';

const Navi = ({ items = [], selected = 0 }) => {
    return (
        <nav>
            <ol>
                <li className={ 'x' }>
                    <Link to={ `/error/404` }>x</Link>
                </li>
                { items.map(({ path, title }, index) => {
                    return (
                        <li key={index} className={ selected === index ? 'selected' : '' }>
                            <Link to={ `/${path || 'error/404'}` }>{ title }</Link>
                        </li>
                    );
                }) }
            </ol>
        </nav>
    );
}

const Post = ({ details }) => {
    return (
        <article>
            <section className="header">
                <span className="icon">
                    <SimpleIcons icon={ details.icon } />
                </span>
                <span className="text">{details.title}</span>
            </section>
            <section className="board">
                <div className="markdown-to-jsx">
                    <Markdown children={ details.content || '' } options={ markdownOptions } />
                </div>
            </section>
        </article>
    );
}

const Board = ({ items, getObject }) => {
    const { index, object } = getObject ? getObject(items) : null;
    return object ? (
        <Fragment>
            <Navi selected={ index } items={ items.filter(({ list }) => list).map(({ title, path }) => ({ title, path })) }/>
            <Post details={ object } />
        </Fragment>
    ) : (
        <E404 message="当前类目暂无代码片段"/>
    );

}

export default Board;