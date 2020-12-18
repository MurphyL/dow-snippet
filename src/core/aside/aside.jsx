import React from 'react';

import { Link, useParams } from "react-router-dom";

import SimpleIcons from 'utils/icons/icons';

import './aside.css';

const ASide = ({ navi = [] }) => {
    const { cate } = useParams();
    return (
        <aside>
            <ul label="LABELS">
                { (navi || []).map((item, i) => {
                    return (
                        <li key={ i } className={ (cate === item.cate) ? 'selected' : '' }>
                            <Link to={ `/cat/${item.cate}` }>
                                <span className="icon">
                                    <SimpleIcons icon={ item.cate } />
                                </span>
                                <span className="text">{ item.name }</span>
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