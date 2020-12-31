import React, { Fragment } from 'react';

import { Link, useHistory } from "react-router-dom";

import SimpleIcons from 'utils/icons.jsx';

import './aside.css';

const ASide = ({ cates = [{ n: '404' }], docs = [], markCate, markPost, show = true }, ref) => {
    const { push } = useHistory();
    return (
        <Fragment>
            <aside className={ show ? 'show' : 'hide' }>
                <ul className="labels" label="LABELS">
                    { cates.filter(({ l }) => (l && l.length > 0)).map(({ c }, i) => (
                        <li key={ i } className={ markCate(c, i) ? 'selected' : '' } onClick={ () => push(`/docs/${c}`) }>
                            <span className="icon">
                                <SimpleIcons icon={ c } />
                            </span>
                            <span className="text">{ cates[i].n }</span>
                        </li>
                    )) }
                </ul>
                <ul className="links" label="LINKS">
                    <li>
                        <Link to="/x/navi">开发者导航</Link>
                    </li>
                    <li>
                        <a href={ process.env.REACT_APP_MAIN_PAGE || '' } target="_blank" rel="noreferrer">返回主页</a>
                    </li>
                </ul>
            </aside>
            { (docs.length > 0) && (
                <nav className={ show ? 'show' : 'hide' }>
                    <ol>
                        { docs.map(({ u, t }, i) => (
                            <li key={i} className={ markPost(u, i) ? 'selected' : '' }>
                                <Link to={ u || 'error/404' }>{ t }</Link>
                            </li>
                        )) }
                    </ol>
                </nav>
            )}
        </Fragment>
    );
};

export default ASide;