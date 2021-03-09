import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Auth/Login';
import Home from './Home/Home';

class App extends Component {
    render () {
        return (
            <div>
                <Switch>
                    <Route path="/index" component={Home} />
                    <Route path="/" component={Login} />
                </Switch>
            </div>
        );
    }
}

export default App;
