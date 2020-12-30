import { useState, useEffect } from "react";

import './tabs.css';

const Tabs = ({ items = [], selected = 0, onChange }) => {
    const [ current, setCurrent ] = useState(selected);
    useEffect(() => {
        onChange(current);
    }, [ current, onChange ]);
    return (
        <div className="tabs">
            <div className="tab-keys">
                { items.map((item, i) => (
                    <div key={ i } className={ `tab-key ${ (current === i) ? 'selected' : '' }` } onClick={() => setCurrent(i)}>{ item.name }</div>
                )) }
                {}
            </div>
            <div className="tab-body">
                { ((item) => item ? item.body : <div>Nothing here!</div>)(items[current]) }
            </div>
        </div>
    );    
};

export default Tabs;