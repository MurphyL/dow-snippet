import React from 'react';

import axios from 'axios';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ASide from '../aside/aside.jsx';
import Board from '../board/board.jsx';
import Document from '../doc/document.jsx';

// import './app.scss';
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

    changeCate(cate) {
        this.setState({ cate });
    }

    render() {
        const { status, meta, cate, items } = this.state;
        if(status === 1) {
            return '加载中……'
        } else if(status === 2) {
            return `数据加载失败：${this.status.message}`
        }
        return (
            <React.StrictMode>
                <main>
                    <BrowserRouter>
                        <ASide navi={ meta.navi || [] } cate={ cate }/>
                        <Switch>
                            <Route path="/cat/:cat">
                                <Board mapping={ items } changeCate={ this.changeCate.bind(this) } />
                            </Route>
                            <Route path="/doc/:cat/:md">
                                <Document />
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