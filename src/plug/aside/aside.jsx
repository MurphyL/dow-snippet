import React from 'react';

import { Link } from "react-router-dom";

import SimpleIcons from 'utils/icons/icons';

import './aside.css';

const ASide = ({ navi = [] }) => {
    return (
        <aside>
            <ul label="LABELS">
                { (navi || []).map((item, i) => {
                    return (
                        <li key={ i } className={  '' }>
                            <Link to={{ pathname: `/cate/${item.c}`, state: { ci: i } }}>
                                <span className="icon">
                                    <SimpleIcons icon={ item.c } />
                                </span>
                                <span className="text">{ item.n }</span>
                            </Link>
                        </li>
                    );
                }) }
            </ul>
            <ul label="LINKS">
                <li>
                    <a href={ process.env.REACT_APP_ENV_HOME_PAGE || '' } target="_blank" rel="noreferrer">返回主页</a>
                </li>
            </ul>
        </aside>
    );
};

export default ASide;