import React from 'react';

import './mark.css';

const LANG_TYPES = {
    'lang-awk': 'Awk',
    'lang-sh': 'Shell',
    'lang-yml': 'YAML',
    'lang-yaml': 'YAML',
    'lang-toml': 'TOML',
    'lang-java': 'Java',
    'lang-bash': 'Bash',
    'lang-shell': 'Shell',
    'lang-js': 'JavaScript',
    'lang-javascript': 'JavaScript',
    'lang-dockerfile': 'Dockerfile'
};

const Title = ({ type, children }) => {
    return React.createElement(type, { className: 'title' }, <span type={ type.toUpperCase() }>{ children }</span>);
}

const H3 = (props) => (<Title type='h3' { ...props } />);
const H4 = (props) => (<Title type='h4' { ...props } />);
const H5 = (props) => (<Title type='h5' { ...props } />);
const H6 = (props) => (<Title type='h6' { ...props } />);

const Prepare = ({ children }) => {
    if(children && children.type === 'code') {
        const langType = LANG_TYPES[children.props.className] || 'Text';
        return (
            <div className="code-block" desc={ langType }>
                <pre>{ children }</pre>
            </div>
        )
    }
    return (
        <div>TODO prepare block</div>
    );
};

const Paragraph = ({ children }) => {
    if(children && Array.isArray(children)) {
        if(children[0] && children[0].type === 'img') {
            return (
                <p className="image">{ children }</p>
            )
        }
    }
    return (
        <p className="paragraph">{ children }</p>
    );
};

const BlockQuote = ({ children = [] }) => {
    return (
        <blockquote>{ children.map(({props}) => props.children) }</blockquote>
    );
};

export const markdownOptions = {
    forceBlock: true,
    overrides: {
        h1: {
            component: H3
        },
        h2: {
            component: H3
        },
        h3: {
            component: H3
        },
        h4: {
            component: H4
        },
        h5: {
            component: H5
        },
        h6: {
            component: H6
        },
        p: {
            component: Paragraph
        },
        a: {
            props: {
                target: '_blank',
                className: 'hyper-link',
                rel: 'noopener noreferrer'
            }
        },
        pre: {
            component: Prepare
        },
        table: {
            props: {
                border: 1,
                cellSpacing: 0,
                cellPadding: 0,
            }
        },
        blockquote: {
            component: BlockQuote
        }
    }
};