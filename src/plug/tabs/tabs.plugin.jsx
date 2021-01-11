import { forwardRef, useState, useEffect } from "react";

import styles from './tabs.module.css';

const Tabs = forwardRef(({ items = [], selected = 0 }, ref) => {
    const [current, setCurrent] = useState(selected);
    useEffect(() => {
        ref.current = current;
    }, [current, ref]);
    return (
        <div className={styles.tabs_plugin}>
            { (items && items.length > 0) && (
                <div className={styles.tab_keys}>
                    { items.map((item, i) => (
                        <div key={i} className={`${styles.tab_key} ${(current === i) ? 'selected' : ''}`} onClick={() => setCurrent(i)}>{item.name}</div>
                    ))}
                </div>
            )}
            <div className={styles.tab_body}>
                {((item) => item ? item.body() : <div>Nothing here!</div>)(items[current])}
            </div>
        </div>
    );
});

Tabs.displayName = 'Tabs';

export default Tabs;