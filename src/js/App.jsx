import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Home } from '../pages/main/Home';

import './App.less';

export class App extends Component {
    render() {
        return (
            <Router>
                <Route path="/" component={Home} />
            </Router>
        )
    }
}