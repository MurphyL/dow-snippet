import React, { Fragment } from 'react';
import { useParams, useLocation } from "react-router-dom";

import PostsContext from 'utils/context.js';

import Navi from 'plug/navi/navi.jsx';
import Post from 'plug/post/post.jsx';

import './doc.css';

const Document = () => {
    const { cate } = useParams();
    const { pathname } = useLocation();
    return (
        <PostsContext.Consumer>
            {({ items = [], mapping ={} }) => (
                <Fragment >
                    <Navi select={ ({ url }) => (url === pathname) } items={ (mapping[cate].map(i => items[i]) || []) }/>
                    <Post details={ items.find(({ u }) => u === pathname) } />
                </Fragment>
            )}
        </PostsContext.Consumer>
    );
}

export default Document;