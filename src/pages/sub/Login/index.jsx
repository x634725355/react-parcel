import React, { Component } from "react";
import { List, InputItem, Toast, Button, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';

import { iphoneHeight, USER_DATA_KEY } from "../../../utils/share";
import { API } from "../../../utils/fetchAPI";

import './index.less';
import logo from "../../../assets/images/logo.svg";

const Item = List.Item;

class Login extends Component {

    componentDidMount() {
        const { setFieldsValue } = this.props.form;

        setFieldsValue({ account: '15228767132', password: 'zxc740829' });
    }

    onSubmit() {
        this.props.form.validateFields({ force: true }, async (error) => {
            const { getFieldsValue, setFieldsValue } = this.props.form;

            if (!error) {
                // 用getFieldsValue解构出用户和密码数据
                const { account, password, type } = getFieldsValue();

                switch (type) {
                    case 'phone':
                        let { profile } = await API.post('/login/cellphone', { phone: account, password });

                        // 将用户数据保存到localStorage中
                        localStorage[USER_DATA_KEY] = JSON.stringify(profile);

                        // 跳转到home页面
                        this.props.history.push('/home');

                        break;
                    case 'email':
                        ({ profile } = await API.post('/login', { email: account, password }));

                        // 将用户数据保存到localStorage中
                        localStorage[USER_DATA_KEY] = JSON.stringify(profile);

                        // 跳转到home页面
                        this.props.history.push('/home');

                        break;
                    default:
                        break;
                }

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
        const regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        const { setFieldsValue } = this.props.form;
        // callback有return的功能
        if (regEmail.test(value)) {
            // 判断是邮箱

            callback(setFieldsValue({ type: 'email' }));
        } else if (regPhone.test(value)) {
            // 判断是手机号

            callback(setFieldsValue({ type: 'phone' }));
        }

        callback(new Error('请输入正确的邮箱或者手机号'));
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
                        <InputItem className="hidden" type="hidden" {...getFieldProps('type')} />
                        <Item className="login-button">
                            <Button type="primary" size="small" inline onClick={this.onSubmit.bind(this)}>登录</Button>
                            <Button size="small" inline style={{ marginLeft: '2.5px' }} onClick={this.onReset.bind(this)}>重置</Button>
                        </Item>
                    </List>
                </form>
            </div>
        )
    }
}

export const BasicLogin = createForm()(Login);