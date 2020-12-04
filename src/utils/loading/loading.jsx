import React from 'react';

const Loading = ({ message }) => {
    return (
        <div>
            <img src="/img/squares.svg" alt={ message } />
        </div>
    );
};

export default Loading;