import React, { Fragment, useRef, useState } from 'react';

import DataFrame from 'dataframe-js';

import readXlsxFile from 'read-excel-file';

import { saveAs } from 'file-saver';

import Tabs from "plug/tabs/tabs.jsx";

import Table from "plug/df-table/df-table.jsx";

import { PromiseLoadable } from "plug/loading/loading.jsx";

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

const FileResolver = () => {
    const tabRef = useRef();
    const tableRef = useRef();
    const [ dfs, setDataFrames ] = useState(null);
    return (
        <Fragment>
            <div className="bar">
                <input type="file" accept={ Object.keys(ACCEPT_FILE_TYPES).join(', ') } onChange={ (e) =>  {
                    setDataFrames(resolveFile(e.target.files));
                } } multiple />
                <button onClick={ () => {
                    if(!dfs) {
                        return console.error('尚未加载数据文件');;
                    }
                    const tabInfo = dfs[tabRef.current];
                    const columns = Array.from(tableRef.current[tabInfo.filename]);
                    if(!tabInfo || columns.length === 0) {
                        return console.error('没有选中任何数据');
                    }
                    tabInfo.dataset.then((df) => {
                        const result = df.select(...columns);
                        const [ height, weight ] = result.dim();
                        console.log(`操作的数据集（${height}行/${weight}列）- ${tabInfo.filename}`);
                        console.table(result.toCollection());
                        // '\uFEFF' - bom
                        const blob = new Blob(['\uFEFF' + result.toCSV()], {
                            type: "text/csv;charset=ANSI",
                            endings: "native"
                        });
                        saveAs(blob, `${tabInfo.filename}.${Date.now()}.csv`);
                    })
                } }>导出</button>
            </div>
            <Tabs ref={ tabRef } items={ (dfs || []).map(({ filetype, dataset, filename }) => {
                return ({
                    name: ( <div>{ filetype } - { filename }</div> ),
                    body: () => (
                        <PromiseLoadable  promise={dataset} render={ (df) => (
                            <div className="dataset">
                                <Table ref={ tableRef } unique={ filename } df={ df } />
                            </div>
                        )} />
                    )
                });
            }) } />
        </Fragment>
    );
};

export default FileResolver;