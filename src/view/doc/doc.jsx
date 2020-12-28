import React, { Fragment, useContext, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";

import { DocsContext } from 'utils/context.jsx';

import Post from 'plug/post/post.jsx';

import ASide from 'plug/aside/aside.jsx';

import './doc.css';

const Document = () => {
    const { cate } = useParams();
    const { pathname, state } = useLocation();
    const [ showNavi, toggleNavi ] = useState(document.body.clientWidth > 600);
    const { items = [], mapping = {} } = useContext(DocsContext);
    const details = items.find(({ u }) => u === pathname);
    return (
        <Fragment>
            <ASide show={ showNavi } cate={ cate } mapping={ mapping } getObject={ i => items[i] } />
            { (state && state.nf) ? (
                <p>404</p>
            ) : (
                <Post details={ details } toggleNavi={ () => toggleNavi(!showNavi) }/>
            )}
        </Fragment>
    );
}

export default Document;