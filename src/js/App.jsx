import React, { Component } from 'react';
import { HashRouter, Route } from "react-router-dom";

import './App.less';

const Home = () => (<h1>我是首页</h1>)

export class App extends Component {
    render() {
        return (
            <HashRouter>
                <Route path="/" component={ Home } />
            </HashRouter>
        )
    }
}