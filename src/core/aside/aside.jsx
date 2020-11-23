import React from 'react';

import { Link, useParams } from "react-router-dom";


import './aside.css';

const ASide = ({ navi = {} }) => {
    const { cate } = useParams();
    return (
        <aside>
            <ul label="LABELS">
                { (Object.keys(navi) || []).map((key, i) => {
                    return (
                        <li key={ i } className={ (cate === key) ? 'selected' : '' }>
                            <Link to={ `/cat/${key}` }>{ navi[key] }</Link>
                        </li>
                    );
                }) }
            </ul>
            <ul label="LINKS">
                <li>
                    <a href="/" target="_blank">返回主页</a>
                </li>
            </ul>
        </aside>
    );
};

export default ASide;