import React from 'react';

import './error.css';

export const E404 = ({ message = '未知错误' }) => {
    return (
        <div className="error-container">
            <div className="error">{ message }</div>
        </div>
    );
};