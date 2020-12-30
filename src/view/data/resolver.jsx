import React, { Fragment, useState } from 'react';

import DataFrame from 'dataframe-js';

import readXlsxFile from 'read-excel-file';

import Tabs from "plug/tabs/tabs.jsx";

import Table from "plug/df-table/df-table.jsx";

import { PromiseLoadable } from "utils/loading/loading.jsx";

import './resolver.css';

const FILE_PROCESSER_CONFIG = {
    Excel: async (file) => {
        const dataSet = await readXlsxFile(file);
        const titleRow = dataSet.shift();
        return new DataFrame(dataSet, titleRow);
    },
    CSV: async (file) => await DataFrame.fromCSV(file, true)

};

// 支持解析的数据类型 - http://www.iana.org/assignments/media-types/media-types.xhtml
const ACCEPT_FILE_TYPES = {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
    '.csv': 'CSV',
    // 'application/json': 'JSON',
};

const SUPPORTED_FILE_TYPES = Object.assign({
    'application/vnd.ms-excel': 'CSV',
}, ACCEPT_FILE_TYPES);

const resolveFile = (files) => {
    return Array.from(files).map(file => {
        const filetype = SUPPORTED_FILE_TYPES[file.type];
        const dataset = FILE_PROCESSER_CONFIG[filetype](file);
        return {
            filetype, dataset, filename: file.name
        };
    })
};

function  FileResolver() {
    const [ dfs, setDataFrames ] = useState(null);
    console.log(dfs);
    return (
        <Fragment>
            <div className="bar">
                <input type="file" accept={ Object.keys(ACCEPT_FILE_TYPES).join(', ') } onChange={ (e) =>  {
                    setDataFrames(resolveFile(e.target.files));
                } } multiple />
            </div>
            { (null !== dfs) && <Tabs items={ dfs.map(({ filetype, dataset, filename }) => {
                return ({
                    name: <div>{ filetype } - { filename }</div>,
                    body: <PromiseLoadable  promise={dataset} render={ (df) => (
                        <div className="dataset">
                            <Table df={ df } />
                        </div>
                    )} />
                });
            }) } /> }
        </Fragment>
    );
};

export default FileResolver;


/***
 * 
    { (null !== dfs) && dfs.map((df, i) => (
        <PromiseLoadable key={ `f-${i}` } promise={df} render={({ filetype, filename, dataset }) => (
            <Tabs />
        )} />
    )) }
 * 
 */

// <div className="dataset">
//     <table>
//         <thead>
//             <tr>
//                 { df.listColumns().map((c, i) => (
//                     <th key={ `h-${i}` }>{ c || '-' }</th>
//                 )) }
//             </tr>
//         </thead>
//         <tbody>
//             { df.toArray().map((row, ri) => (
//                 <tr key={ `r-${ri}` }>
//                     { row.map((col, ci) => (
//                         <td key={ `c-${ci}` }>{ col }</td>
//                     )) }
//                 </tr>
//             )) }
//         </tbody>
//     </table>
// </div>