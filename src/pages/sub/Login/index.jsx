import React, { Component } from "react";
import { List, InputItem, Toast, Button, WingBlank, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';

import { iphoneHeight } from "../../../utils/iphoneHeight";

import './index.less';
import logo from "../../../assets/images/logo.svg";

const Item = List.Item;

class Login extends Component {

    state = {
        value: 1,
        iphoneHeight: iphoneHeight
    }

    onSubmit() {
        this.props.form.validateFields({ force: true }, (error) => {
            if (!error) {
                console.log(this.props.form.getFieldsValue());
            } else {
                Toast.fail('验证失败');
            }
        });
    }

    onReset() {
        this.props.form.resetFields();
    }

    validateAccount(rule, value, callback) {
        const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

        (regEmail.test(value) || regMobile.test(value)) || callback(new Error('请输入正确的邮箱或者手机号'));
    }

    renderHeader() {
        return (
            <div className="logo">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        );
    }

    renderFooter() {
        return (
            <div className="placeholder">{this.props.form.getFieldError('account')}</div>
        );
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div style={{ height: iphoneHeight }} >
                <form className="login">
                    <List
                        renderHeader={this.renderHeader()}
                        renderFooter={this.renderFooter.bind(this)}
                        // activeStyle = {}
                        className="login-body"
                    >
                        <InputItem 
                            {...getFieldProps('account', {
                                // initialValue: 'little ant',
                                rules: [
                                    { validator: this.validateAccount.bind(this) },
                                ],
                            })}
                            clear
                            error={!!getFieldError('account')}
                            onErrorClick={() => {
                                Toast.fail(getFieldError('account').join('、'));
                            }}
                            placeholder="请输入您的手机号或者邮箱"
                        ></InputItem>
                        <WhiteSpace size="lg" />
                        <InputItem {...getFieldProps('password')} placeholder="请输入您的密码" type="password"></InputItem>
                        <WhiteSpace size="lg" />
                        <Item className="login-button">
                            <Button type="primary" size="small" inline onClick={this.onSubmit.bind(this)}>提交按钮</Button>
                            <Button size="small" inline style={{ marginLeft: '2.5px' }} onClick={this.onReset.bind(this)}>重置</Button>
                        </Item>
                    </List>
                </form>
            </div>
        )
    }
}

export const BasicLogin = createForm()(Login);