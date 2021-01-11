import { forwardRef, useEffect, useReducer, useState } from "react";

import styles from './df_table.module.css';

const DataFrameTable = forwardRef(({ df, unique = 'default' }, ref) => {
    const [ , forceUpdate ] = useReducer(x => x + 1, 0);
    const [ selected, setSelected ] = useState({});
    useEffect(() => {
        ref.current = selected;
    }, [ ref, unique, selected ]);
    return (
        <table className={styles.dataset}>
            <thead>
                <tr>
                    { df.listColumns().map((c, i) => (
                        <th key={ `h-${i}` } className={ ( selected[unique] && selected[unique].has(c) ) ? styles.selected : '' } onClick={ () => {
                            if(!selected[unique]) {
                                selected[unique] = new Set();
                            }
                            if(selected[unique].has(c)) {
                                selected[unique].delete(c);
                            } else {
                                selected[unique].add(c);
                            }
                            setSelected(selected);
                            forceUpdate();
                        } }>{ c || '-' }</th>
                    )) }
                </tr>
            </thead>
            <tbody>
                { df.toArray().map((row, ri) => (
                    <tr key={ `r-${ri}` }>
                        { row.map((col, ci) => (
                            <td key={ `c-${ci}` }>{ col }</td>
                        )) }
                    </tr>
                )) }
            </tbody>
        </table>
    );
});

DataFrameTable.displayName = 'DataFrameTable';

export default DataFrameTable;