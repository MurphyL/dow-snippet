import React from 'react';

import './side.css';

class Side extends React.Component {

    state = {
        selected: 0
    }

    selectedItem(selected) {
        this.setState({ selected });
    }

    render() {
        const { selected } = this.state;
        const { navi } = this.props;
        return (
            <aside>
                <ul label="LABELS">
                    { (Object.keys(navi) || []).map((key, i) => (
                        <li key={ i } className={ i === selected ? 'selected' : '' } onClick={ () =>this.selectedItem.bind(this)(i) }>
                            <span>{ navi[key] }</span>
                        </li>
                    )) }
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