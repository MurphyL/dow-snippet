import React, { Fragment } from 'react';

import axios from 'axios';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import ASide from 'core/aside/aside.jsx';
import Board from 'core/board/board.jsx';

import Loading from 'utils/loading/loading.jsx';

import { E404 } from 'utils/error/error.jsx';

import './app.css';

class App extends React.Component {

    state = {
        status: 1
    }

    componentDidMount() {
        axios.get('/murph.json').then(({ status, data }) => {
            if(status === 200) {
                this.setState({ ...data, status: 0 });
            } else {
                this.setState({ status: 2, message: '调用接口失败' });
            }
        }).catch(e => {
            this.setState({ status: 2, message: '调用接口失败' });
        });
    }

    render() {
        const { status } = this.state;
        if(status === 1) {
            return (
                <Loading message="数据加载中……" />
            );
        } else if(status === 2) {
            return `数据加载失败：${this.state.message}`
        }
        const { meta, dict } = this.state;
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
                                        <Board items={ dict[cate] || [] } selected={0} getObject={ (items) => ({ 
                                            index: 0, object: items[0] 
                                        })} />
                                    </Fragment>
                                )
                            }} />
                            <Route path={['/doc/:cate/:tag/:post', '/doc/:cate/:post']} render={({ match }) => {
                                const { cate, tag, post } = match.params;
                                const suffix = `${tag ? ('/' + tag) : ''}/${post}`
                                const index = mapping[`doc/${cate}${suffix}`] * 1;
                                if(isNaN(index)) {
                                    return (
                                        <div>404</div>
                                    );
                                }
                                return (
                                    <Fragment>
                                        <ASide navi={ navi } cate={ cate } />
                                        <Board items={ dict[cate] || [] } getObject={ (items) => ({
                                            index, object: items[index]
                                        })} />
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