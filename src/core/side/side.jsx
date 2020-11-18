import React from 'react';

import './side.css';

class Side extends React.Component {
    render() {
        return (
            <aside>
                <ul label="LABELS">
                    <li>
                        <span>Java</span>
                    </li>
                    <li>
                        <span>JavaScript</span>
                    </li>
                    <li>
                        <span>Nginx</span>
                    </li>
                    <li>
                        <span>Linux/Shell</span>
                    </li>
                </ul>
                <ul label="LINKS">
                    <li>
                        <span>返回主页</span>
                    </li>
                </ul>
            </aside>
        );
    }
}

export default Side;