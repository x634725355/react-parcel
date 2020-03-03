import React, { Component } from "react";
import { List, InputItem, Toast, Button } from 'antd-mobile';
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
                alert('Validation failed');
            }
        });
    }
    onReset() {
        this.props.form.resetFields();
    }
    validateAccount(rule, value, callback) {
        if (value && value.length > 4) {
            callback();
        } else {
            callback(new Error('At least four characters for account'));
        }
    }

    renderHeader() {
        return (
            <div className="logo">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        );
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div  style={{ height: iphoneHeight }} >
                <form className="login">
                    <List
                        renderHeader={this.renderHeader()}
                        renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
                    >
                        <InputItem
                            {...getFieldProps('account', {
                                // initialValue: 'little ant',
                                rules: [
                                    { required: true, message: 'Please input account' },
                                    { validator: this.validateAccount.bind(this) },
                                ],
                            })}
                            clear
                            error={!!getFieldError('account')}
                            onErrorClick={() => {
                                alert(getFieldError('account').join('、'));
                            }}
                            placeholder="请输入您的手机号或者邮箱"
                        ></InputItem>
                        <InputItem {...getFieldProps('password')} placeholder="请输入您的密码" type="password"></InputItem>
                        <Item>
                            <Button type="primary" size="small" inline onClick={this.onSubmit.bind(this)}>Submit</Button>
                            <Button size="small" inline style={{ marginLeft: '2.5px' }} onClick={this.onReset.bind(this)}>Reset</Button>
                        </Item>
                    </List>
                </form>
            </div>
        )
    }
}

export const BasicLogin = createForm()(Login);