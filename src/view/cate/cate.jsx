import React, { Fragment } from 'react';
import { useParams } from "react-router-dom";

import PostsContext from 'utils/context.jsx';

import Navi from 'plug/navi/navi.jsx';
import Post from 'plug/post/post.jsx';

import './cate.css';

const Category = () => {
    const { cate } = useParams();
    return (
        <PostsContext.Consumer>
            {({ items = [], mapping ={} }) => (
                <Fragment >
                    <Navi select={ ({ index }) =>( index === 0) } items={ (mapping[cate].map(i => items[i]) || []) }/>
                    <Post details={ items[mapping[cate][0]] || { t: '404' } } />
                </Fragment>
            )}
        </PostsContext.Consumer>
    );
}

export default Category;