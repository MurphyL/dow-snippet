import React, { Fragment } from 'react';

import { Link, useHistory } from "react-router-dom";

import SimpleIcons from 'utils/icons.jsx';

import styles from './aside.module.css';

const ASide = ({ cates = [{ n: '404' }], docs = [], markCate, markPost, show = true }, ref) => {
    const { push } = useHistory();
    return (
        <Fragment>
            <aside className={`${styles.aside_plugin} ${show ? styles.show : styles.hide}`}>
                <ul className={styles.labels} label="LABELS">
                    {cates.filter(({ l }) => (l && l.length > 0)).map(({ c }, i) => (
                        <li key={i} className={markCate(c, i) ? styles.selected : ''} onClick={() => push(`/docs/${c}`)}>
                            <span className={styles.icon}>
                                <SimpleIcons icon={c} />
                            </span>
                            <span className={ styles.text }>{cates[i].n}</span>
                        </li>
                    ))}
                </ul>
                <ul className="links" label="LINKS">
                    <li>
                        <Link to="/x/navi">开发者导航</Link>
                    </li>
                    <li>
                        <a href={process.env.REACT_APP_MAIN_PAGE || ''} target="_blank" rel="noreferrer">返回主页</a>
                    </li>
                </ul>
            </aside>
            { (docs.length > 0) && (
                <nav className={`${styles.nav_plugin} ${show ? styles.show : styles.hide}`}>
                    <ol>
                        {docs.map(({ u, t }, i) => (
                            <li key={i} className={markPost(u, i) ? styles.selected : ''}>
                                <Link to={u || 'error/404'}>{t}</Link>
                            </li>
                        ))}
                    </ol>
                </nav>
            )}
        </Fragment>
    );
};

export default ASide;