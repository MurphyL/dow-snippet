import React from 'react';

import './error.css';

export const E404 = ({ message }) => {
    return (
        <article>
            <div className="error">{ message }</div>
        </article>
    );
};