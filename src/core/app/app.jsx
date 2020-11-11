import React from 'react';

import 'bulma/css/bulma.min.css';

import './app.css';

function App() {
    return (
        <React.StrictMode>
            <div className="container is-fullhd">
                <nav className="navbar is-transparent">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="https://bulma.io">
                            <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" />
                        </a>
                    </div>
                    <div class="navbar-menu">
                        <div className="navbar-start">
                            <a className="navbar-item" href="https://bulma.io/">Home</a>
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link" href="https://bulma.io/documentation/overview/start/">Docs</a>
                                <div className="navbar-dropdown is-boxed">
                                    <a className="navbar-item" href="https://bulma.io/documentation/overview/start/">Overview</a>
                                    <a className="navbar-item" href="https://bulma.io/documentation/overview/modifiers/">Modifiers</a>
                                    <a className="navbar-item" href="https://bulma.io/documentation/columns/basics/">Columns</a>
                                    <a className="navbar-item" href="https://bulma.io/documentation/layout/container/">Layout</a>
                                    <a className="navbar-item" href="https://bulma.io/documentation/form/general/">Form</a>
                                    <hr className="navbar-divider" />
                                    <a className="navbar-item" href="https://bulma.io/documentation/elements/box/">Elements</a>
                                    <a className="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">Components</a>
                                </div>
                            </div>
                        </div>
                        <div class="navbar-end">
                            <div class="navbar-item">
                                <div class="field is-grouped">
                                    <p class="control">
                                        <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="https://bulma.io" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=https://bulma.io&amp;via=jgthms">
                                            <span class="icon">
                                                <i class="fab fa-twitter"></i>
                                            </span>
                                            <span>Tweet</span>
                                        </a>
                                    </p>
                                    <p class="control">
                                        <a class="button is-primary" href="https://github.com/jgthms/bulma/releases/download/0.9.1/bulma-0.9.1.zip">
                                            <span class="icon">
                                                <i class="fas fa-download"></i>
                                            </span>
                                            <span>Download</span>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </React.StrictMode>
    );
}

export default App;