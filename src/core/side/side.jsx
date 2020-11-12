import React from 'react';

import './side.css';

class Side extends React.Component {
    render() {
        return (
            <aside>
                <ul label="LABELS">
                    <li>Java</li>
                    <li>JavaScript</li>
                    <li>Nginx</li>
                    <li>Linux</li>
                </ul>
                <ul label="LINKS">
                    <li>返回主页</li>
                </ul>
            </aside>
        );
    }
}

export default Side;