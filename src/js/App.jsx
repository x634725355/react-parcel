import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
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
                <Suspense fallback={<div>Loading.....</div>} >
                    <MyPlayStore.Provider value={store}>
                        <Route path="/" exact render={() => <Redirect to='/login' />} />
                        <Route path="/login" exact component={BasicLogin} />
                        <Route path="/main" component={Main} />
                    </MyPlayStore.Provider>
                </Suspense>
                {/* <Decorator></Decorator> */}
            </Router>
        )
    }
}