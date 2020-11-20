import React, { Fragment } from 'react';

import axios from 'axios';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import ASide from '../aside/aside.jsx';
import Board from '../board/board.jsx';

import { E404 } from '../error/error.jsx';

import './app.css';

class App extends React.Component {

    state = {
        status: 1
    }

    componentDidMount() {
        axios.get('/murph.json').then(({ statusText, data }) => {
            const result = {};
            if(statusText === 'OK') {
                Object.assign(result, { ...data, status: 0 });
            } else {
                Object.assign(result, { status: 2, message: '调用接口失败' });
            }
            this.setState(result);
        });
    }

    render() {
        const { status, meta, dict } = this.state;
        if(status === 1) {
            return '加载中……'
        } else if(status === 2) {
            return `数据加载失败：${this.status.message}`
        }
        const { navi = {} } = meta;
        const mapping = {};
        for(let key in dict) {
            for(let i in dict[key]) {
                mapping[dict[key][i].path] = i;
            }
        }
        return (
            <React.StrictMode>
                <main>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" exact>
                                <Redirect to={`/cat/${Object.keys(navi)[0]}`} />
                            </Route>
                            <Route path="/cat/:cate" render={({ match }) => {
                                const { cate } = match.params;
                                return (
                                    <Fragment>
                                        <ASide navi={ navi } cate={ cate } />
                                        <Board items={ dict[cate] || [] } getObject={ (items) => items[0] } />
                                    </Fragment>
                                )
                            }} />
                            <Route path="/doc/:cate/:post" render={({ match }) => {
                                const { cate, post } = match.params;
                                return (
                                    <Fragment>
                                        <ASide navi={ navi } cate={ cate } />
                                        <Board items={ dict[cate] || [] } getObject={ (items) => (
                                            items[mapping[`doc/${cate}/${post}`]]
                                        )} />
                                    </Fragment>
                                )
                            }} />
                            <Route path="/error/404">
                                <ASide navi={ navi } />
                                <E404 message="没找到指定的资源" />
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </main>
                {/* <footer>
                    <div>测试Footer</div>
                </footer> */}
            </React.StrictMode>
        );
    }
}

export default App;