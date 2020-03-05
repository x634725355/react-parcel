import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Home } from '../pages/main/Home';
// import { Decorator } from '../components/Decorator/Decorator';
import { BasicLogin } from '../pages/sub/Login';
import { RecommendedDaily } from '../pages/sub/RecommendedDaily';

import './App.less';
import '../assets/font_icons/iconfont';

export class App extends Component {

    render() {
        return (
            <Router>
                <div className="box">
                    <Route path="/" exact component={BasicLogin} />
                    <Route path="/home" component={Home} />
                    <Route path="/recommended" exact component={RecommendedDaily} />
                </div>

                {/* <Decorator></Decorator> */}
            </Router>
        )
    }
}