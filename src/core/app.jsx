import React, { StrictMode } from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import DocX from 'view/docx/docx.jsx';
import Dash from 'view/murph/murph.jsx';

const App = () => {
    return (
        <StrictMode>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <div>hello</div>
                    </Route>
                    <Route path="/docx/" component={ DocX } />
                    <Route path="/x/:unique" component={ Dash } />
                    <Route>404</Route>
                </Switch>
            </BrowserRouter>
        </StrictMode>
    );
}

export default App;