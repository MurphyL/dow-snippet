import { useEffect, useState } from 'react';
import useSWR from 'swr'
import axios from 'axios';

const fetcher = (url, options = { method: 'GET' }) => fetch(url, options).then(r => {
    console.log(Array.from(r.headers.keys()));
    console.log(r.headers.get('content-type'))
    return r.json();
})

export const useFetch = (url, options) => useSWR(url, fetcher, options);

export const useAjax = ({ method = 'GET', url = '' }) => {
    const [ response, setResponse ] = useState({ status: 1 });
    useEffect(() => {
        axios.request({ 
            method, url 
        }).then(({ status, data }) => {
            if(status === 200) {
                setResponse({ status: 0, payload: data })
            } else {
                setResponse({ status: 2, message: '调用接口失败' })
            }
        }).catch(() => {
            setResponse({ status: 2, message: '请求数据出错' })
        });
    }, [ method, url ]);
    return response;
};
