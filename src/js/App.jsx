import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Home } from '../pages/main/Home';
// import { Decorator } from '../components/Decorator/Decorator';
import { BasicLogin } from '../pages/sub/Login';

import './App.less';
import '../assets/font_icons/iconfont';

export class App extends Component {

    render() {
        return (
            <Router>
                <div className="box">
                    <Route path="/home" component={Home} />
                    <Route path="/" exact component={BasicLogin} />
                </div>

                {/* <Decorator></Decorator> */}
            </Router>
        )
    }
}