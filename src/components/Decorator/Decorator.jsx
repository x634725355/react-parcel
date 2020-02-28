import React, { Component } from "react";
import { MemoryRouter as Router, Route, Link } from "react-router-dom";

import { Button } from 'antd-mobile';

const Momo = p => {
    return (
        <div>
            <h1>关于</h1>
            <Button type="primary" onClick={() => p.history.push('/')} >primary</Button>
            <Link to="/conact?a=7">去联系页面</Link>
            <Link to="/news?a=7">去新闻页面</Link>
        </div>
    )
}

const Koko = p => {
    return (
        <div>
            <h1>我是首页</h1>
            <Button type="primary" onClick={() => p.history.push('/about')} >primary</Button>
        </div>
    )
}

function back(entity) {
    console.log(entity);
    
    entity.prototype.back = function() {
        console.log(123);
        
    }
}

@back
class Contact extends Component {
    render() {
        return (
            <Button type="primary" onClick={() => this.back()}>按钮</Button>
        )
    }
}

@back
class News extends Component {
    render() {
        return (
            <Button onClick={() => this.back()}>按钮</Button>
        )
    }
}

export class Decorator extends Component {

    state = {

    }

    render() {
        return (
            <Router>
                <Route path="/" exact  component={Koko} />
                <Route path="/about" component={Momo} />
                <Route path="/conact" component={Contact} />
                <Route path="/news" component={News} />
            </Router>
        );
    }
}