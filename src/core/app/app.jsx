import React from 'react';

import axios from 'axios';

import Side from '../side/side.jsx';
import Navi from '../navi/navi.jsx';
import Board from '../board/board.jsx';

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

    render() {
        const { status, meta } = this.state;
        if(status === 1) {
            return '加载中……'
        }
        if(status === 2) {
            return `数据加载失败：${this.status.message}`
        }
        return (
            <React.StrictMode>
                <main>
                    <Side navi={ meta.navi || [] } />
                    <Navi />
                    <Board />
                </main>
                <footer>
                    <div>测试Footer</div>
                </footer>
            </React.StrictMode>
        );
    }
}

export default App;