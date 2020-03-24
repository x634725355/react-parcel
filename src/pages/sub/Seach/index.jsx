import React, { Component } from "react";
import { observer } from 'mobx-react';
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';

// 状态管理器
import { MyPlayStore } from "../../../components/MyPlayStore/MyPlayStore";


import './index.less';

@observer
export class Seach extends Component {

    static contextType = MyPlayStore;

    state = {
        value: '美食',
    };
    componentDidMount() {
        this.autoFocusInst.focus();
    }
    onChange = (value) => {
        this.setState({ value });
    };
    clear = () => {
        this.setState({ value: '' });
    };
    handleClick = () => {
        this.manualFocusInst.focus();
    }
    render() {
        return (<div>
            <SearchBar
                value={this.state.value}
                placeholder="Search"
                onSubmit={value => console.log(value, 'onSubmit')}
                onClear={value => console.log(value, 'onClear')}
                onFocus={() => console.log('onFocus')}
                onBlur={() => console.log('onBlur')}
                onCancel={() => console.log('onCancel')}
                showCancelButton
                onChange={this.onChange}
                placeholder="自动获取光标"
                ref={ref => this.autoFocusInst = ref} />

        </div>);
    }

}

