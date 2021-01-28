import { Fragment, useEffect, useState } from 'react';

import { useAjax } from 'utils/ajax.jsx';

const Loading = ({ message }) => {
    return (
        <div>
            <img src="/img/squares.svg" alt={ message } />
        </div>
    );
};

export const Loadable = ({ status, message, error, children }) => (
    <Fragment>
        { (() => {
            switch(status) {
                case 0:
                    return children;
                case 2:
                    return 'error';
                default:
                    return ( <Loading message={ message } /> )
            }
        })() }
    </Fragment>
);

export const PromiseLoadable = ({ promise, render }) => {
    const [ payload, setPayload ] = useState(null);
    useEffect(() => {
        if(promise) {
            promise.then((res) => { setPayload(res) });
        }
    }, [ promise ]);
    if(null === payload) {
        return 'loading'
    } else {
        return render && typeof(render) === 'function' && render.apply(null, [ payload ]);
    }
    
};

export const AjaxLoadable = ({ method = 'GET', url = '', render }) => {
    const { status, payload, message } = useAjax({ method, url });
    switch(status) {
        case 0:
            return render && typeof(render) === 'function' && render.apply(null, [ payload ]);
        case 2:
            return 'ERROR：' + message;
        default:
            return ( <Loading message={ 'Loading……' } /> )
    }
}

export default Loading;