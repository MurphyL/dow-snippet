import React, { Fragment } from 'react';

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

export default Loading;