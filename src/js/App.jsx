import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Home } from '../pages/main/Home';
import { Decorator } from '../components/Decorator/Decorator';

import './App.less';
import '../assets/font_icons/iconfont';

export class App extends Component {
    render() {
        return (
            <Router>
                {/* <div className="box">
                    <Route path="/" component={Home} />
                </div> */}

                <Decorator></Decorator>
            </Router>
        )
    }
}