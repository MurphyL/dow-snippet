import React, { StrictMode, useEffect, useState } from 'react';

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import axios from 'axios';

import Loading from 'utils/loading/loading.jsx';

import Document from 'view/doc/doc.jsx';

import PostsContext from 'utils/context.jsx';

const App = () => {
    const [ fetched, setData ] = useState(null);
    useEffect(() => {
        axios.get('/docs/meta.json').then(({ status, data }) => {
            if(status === 200) {
                setData({ status: 0, ...data });
            } else {
                setData({ status: 2, message: '调用接口失败' });
            }
        }).catch(() => {
            setData({ status: 2, message: '请求数据出错' });
        });
    }, []);
    if(null === fetched) {
        return (
            <Loading message="数据加载中……" />
        );
    } else if(fetched.status === 2) {
        return `数据加载失败：${this.state.message}`
    }
    const { x = [], m = {}} = fetched;
    return (
        <StrictMode>
            <PostsContext.Provider value={{ items: x, mapping: m }}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to={ x[0].u || '/error/404' } />
                        </Route>
                        <Route path={[ '/docs/:cate/:tag/:post', '/docs/:cate/:post' ]} component={ Document } />
                        <Route>404</Route>
                    </Switch>
                </BrowserRouter>
            </PostsContext.Provider>
        </StrictMode>
    );
}

export default App;