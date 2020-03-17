import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { observer } from 'mobx-react';

// import { Decorator } from '../components/Decorator/Decorator';
// import { bus } from "../../utils/eventBus";

import { BasicLogin } from '../pages/sub/Login';
import { Main } from '../pages/main';
import { MyPlayStore } from '../components/MyPlayStore/MyPlayStore';
import AppState from "../stores/AppState";

import './App.less';
import '../assets/font_icons/iconfont';


// 创建状态管理器实例
const store = new AppState();

@observer
export class App extends Component {

    render() {
        return (
            <Router>
                <MyPlayStore.Provider value={store}>
                    <Route path="/" exact component={BasicLogin} />
                    <Route path="/main" component={Main} />
                </MyPlayStore.Provider>
                {/* <Decorator></Decorator> */}
            </Router>
        )
    }
}