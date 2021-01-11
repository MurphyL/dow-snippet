import React from 'react';

import styles from './error.module.css';

export const E404 = ({ message = '未知错误' }) => {
    return (
        <div className={styles.error_container}>
            <div className={styles.error}>{message}</div>
        </div>
    );
};