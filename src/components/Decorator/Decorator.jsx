import React, { Component } from "react";
import { MemoryRouter as Router, Route, Link } from "react-router-dom";

import { Button, InputItem, WhiteSpace, WingBlank } from 'antd-mobile';

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

    entity.prototype.back = function () {
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

function validation(entity) {
    entity.prototype.validata = function (name) {
        if (this.state[name].length < 5) {
            console.error(name + '小于5');
        }
    }
}

function validata2(length) {
    return function (entity) {
        entity.prototype.validata = function (name) {
            if (this.state[name].length < length) {
                console.error(name + '小于' + length);
            }
        }
    }
}

function validata3(obj) {
    return function (entity) {
        entity.prototype.validata = function (name) {
            if (this.state[name].length < obj[name]) {
                console.error(name + '小于' + obj[name]);
            }
        }
    }
}

@validata3({username: 8, pwd: 6})
class Home2 extends Component {
    state = {
        username: "",
        pwd: ''
    }

    InputChangeHandler(name, value) {
        this.setState({ [name]: value });
    }

    render() {
        const { username, pwd } = this.state;
        return (
            <div>
                <InputItem value={username} onChange={this.InputChangeHandler.bind(this, 'username')} >账号</InputItem>
                <InputItem value={pwd} onChange={this.InputChangeHandler.bind(this, 'pwd')} type="password" >密码</InputItem>
                <WhiteSpace size="lg"></WhiteSpace>

                <WingBlank>
                    <Button type="primary" onClick={() => {
                        this.validata('username');
                        this.validata('pwd');
                    }} >注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export class Decorator extends Component {

    state = {

    }

    render() {
        return (
            <Router>
                {/* <Route path="/" exact component={Koko} />
                <Route path="/about" component={Momo} />
                <Route path="/conact" component={Contact} />
                <Route path="/news" component={News} /> */}
                <Home2></Home2>
            </Router>
        );
    }
}