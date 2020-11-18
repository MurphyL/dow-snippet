import React, { Fragment, useEffect } from 'react';

import { useParams } from "react-router-dom";

import './board.css';

const Board = ({ mapping, changeCate }) => {
    let { cat, md } = useParams();
    useEffect(() => {
        changeCate(cat);
    }, [ cat ]);
    if(!mapping[cat]) {
        return (
            <div>暂无相关代码片段</div>
        );
    }
    const items = mapping[cat] || [];
    return (
        <Fragment>
            <nav>
                <ul>
                    { items.map((item, i) => (
                        <li key={ i }>{ item.title || '' }</li>
                    )) }
                </ul>
            </nav>
            <article>
                <div>doc - { cat }</div>
                <pre>
                    <code>{JSON.stringify(items[0], null, '\t')}</code>
                </pre>
            </article>
        </Fragment>
    );

}

export default Board;