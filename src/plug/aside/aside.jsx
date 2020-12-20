import React, { Fragment } from 'react';

import { Link, useLocation, useHistory } from "react-router-dom";

import SimpleIcons from 'utils/icons.jsx';

import './aside.css';

const ASide = ({ show, cate, mapping = {}, getObject }) => {
    const { pathname } = useLocation();
    const { push } = useHistory();
    const changeCate = (cn) => {
        push(getObject(mapping[cn].l[0]).u);
    };
    return (
        <Fragment>
            <aside className={ show ? 'show' : 'hide' }>
                <ul className="labels" label="LABELS">
                    { Object.keys(mapping).map((cn, i) => (
                        <li key={ i } className={ cn === cate ? 'selected' : '' }>
                            <div onClick={ () => changeCate(cn) }>
                                <span className="icon">
                                    <SimpleIcons icon={ cn } />
                                </span>
                                <span className="text">{ mapping[cn].n }</span>
                            </div>
                        </li>
                    )) }
                </ul>
                <ul className="links" label="LINKS">
                    <li>
                        <a href={ process.env.REACT_APP_MAIN_PAGE || '' } target="_blank" rel="noreferrer">返回主页</a>
                    </li>
                </ul>
            </aside>
            <nav className={ show ? 'show' : 'hide' }>
                <ol>
                    { (mapping[cate].l || []).map(getObject).map(({ u, t }, i) => (
                        <li key={i} className={ pathname === u ? 'selected' : '' }>
                            <Link to={ u || 'error/404' }>{ t }</Link>
                        </li>
                    )) }
                </ol>
            </nav>
        </Fragment>
    );
};

export default ASide;