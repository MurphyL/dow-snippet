import React from 'react';

import axios from 'axios';

import Side from '../side/side.jsx';
import Navi from '../navi/navi.jsx';
import Board from '../board/board.jsx';

// import './app.scss';
import './app.css';

class App extends React.Component {


    componentDidMount() {
        axios.get('/x.json').then(({ statusText, data }) => {
            console.log(statusText, data);
        });
    }

    render() {
        return (
            <React.StrictMode>
                <main>
                    <Side />
                    <Navi />
                    <Board />
                </main>
                <footer>
                    <div>测试脚步</div>
                </footer>
            </React.StrictMode>
        );
    }
}

export default App;