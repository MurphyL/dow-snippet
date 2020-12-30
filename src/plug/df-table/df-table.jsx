import './df-table.css';

const DataFrameTable = ({ df }) => {
    return (
        <table>
            <thead>
                <tr>
                    { df.listColumns().map((c, i) => (
                        <th key={ `h-${i}` }>{ c || '-' }</th>
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
};

export default DataFrameTable;