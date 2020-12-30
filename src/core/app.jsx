import React, { StrictMode } from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import DocX from 'view/docx/docx.jsx';
import Navi from 'view/murph/navi.jsx';
import FileResolver from 'view/data/resolver.jsx';

const App = () => {
    return (
        <StrictMode>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <div>hello</div>
                    </Route>
                    <Route path="/docs/" component={ DocX } />
                    <Route path="/navi/" exact component={ Navi } />
                    <Route path="/charts/" children={ () => <div>数据可视化</div> } />
                    <Route path="/data/resolver" exact component={ FileResolver } />
                    {/* <Route path="/data/visualizer" exact children={ FileResolver } /> */}
                    <Route>404</Route>
                </Switch>
            </BrowserRouter>
        </StrictMode>
    );
}

export default App;