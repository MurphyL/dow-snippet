import React from 'react';
import { Link } from "react-router-dom";

import './navi.css';

const Navi = ({ items = [], select }) => {
    return (
        <nav>
            <ol>
                { items.map(({ u, t }, i) => {
                    return (
                        <li key={i} className={ (select && select({ url: u, index: i })) ? 'selected' : '' }>
                            <Link to={{ pathname: (u || 'error/404') }}>{ t }</Link>
                        </li>
                    );
                }) }
            </ol>
        </nav>
    );
}

export default Navi;