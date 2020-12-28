import { Fragment } from 'react';

import { useLocation } from "react-router-dom";

import { AjaxLoadable } from 'utils/loading/loading.jsx';

import ASide from 'plug/aside/aside.jsx';

const Snippet = () => {
    const { pathname } = useLocation();
    const target = `/${pathname.replace(/^\/docx\/?/, '')}`;
    return (target === '/') ? (
        <AjaxLoadable url="/docs/meta.json" render={({ c = [{ n: '404' }], x = [] }) => {
            return (
                <Fragment>
                    <ASide items={ c } getObject={ i => x[i] } />
                </Fragment>
            );
        }} />
    ) : (
        target
    )
};


export default Snippet;