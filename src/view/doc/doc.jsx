import React, { Fragment, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";

import PostsContext from 'utils/context.jsx';

import Post from 'plug/post/post.jsx';

import ASide from 'plug/aside/aside.jsx';

import './doc.css';

const Document = () => {
    const { cate } = useParams();
    const { pathname } = useLocation();
    const [ showNavi, toggleNavi ] = useState(document.body.clientWidth > 600);
    return (
        <PostsContext.Consumer>
            {({ items = [], mapping = {} }) => (
                <Fragment >
                    <ASide show={ showNavi } cate={ cate } mapping={ mapping } getObject={ i => items[i] } />
                    <Post details={ items.find(({ u }) => u === pathname) } toggleNavi={ () => toggleNavi(!showNavi) } />
                </Fragment>
            )}
        </PostsContext.Consumer>
    );
}

export default Document;