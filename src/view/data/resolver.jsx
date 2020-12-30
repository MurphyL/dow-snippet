import React, { Fragment, useState } from 'react';

import DataFrame from 'dataframe-js';

import readXlsxFile from 'read-excel-file';

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
            filetype, dataset, filename: file.name, selected: new Set()
        };
    })
};

const FileResolver = () => {
    const [ dfs, setDataFrames ] = useState(null);
    const [ tabIndex, setCurrentTab ] = useState(null);
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
                    const tabInfo = dfs[tabIndex];
                    if(!tabInfo || tabInfo.selected.size === 0) {
                        return console.error('没有选中任何数据');
                    }
                    tabInfo.dataset.then((df) => {
                        console.log(df.select(...Array.from(tabInfo.selected)).toJSON());
                    })
                } }>导出</button>
            </div>
            <Tabs onChange={ (i) => { setCurrentTab(i) } } items={ (dfs || [ ]).map(({ filetype, dataset, filename, selected }) => {
                return ({
                    name: ( <div>{ filetype } - { filename }</div> ),
                    body: (
                        <PromiseLoadable  promise={dataset} render={ (df) => (
                            <div className="dataset">
                                <Table df={ df } header={ (column) => (
                                    <span className="column" onClick={ ({ target }) => {
                                        if(selected.has(column)) {
                                            target.classList.remove('selected');
                                            selected.delete(column);
                                        } else {
                                            target.classList.add('selected');
                                            selected.add(column);
                                        }
                                        
                                    } }>{ column }</span>
                                ) }/>
                            </div>
                        )} />
                    )
                });
            }) } />
        </Fragment>
    );
};

export default FileResolver;