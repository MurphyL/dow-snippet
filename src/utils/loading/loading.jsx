import { Fragment } from 'react';

import { useAjax } from 'utils/ajax-hooks.jsx';

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