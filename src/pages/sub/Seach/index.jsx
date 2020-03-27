import React, { Component } from "react";
import { Route } from "react-router-dom";
import { observer } from 'mobx-react';
import { SearchBar } from 'antd-mobile';


import { SeachTabs } from "../../../components/SeachTabs";

// 状态管理器
import { MyPlayStore } from "../../../components/MyPlayStore/MyPlayStore";
import { API } from "../../../utils/fetchAPI";
import { iphoneHeight } from "../../../utils/share";

import './index.less';

@observer
export class Seach extends Component {

    static contextType = MyPlayStore;

    state = {
        value: '',
        hotValue: '',
        hotPlaceholder: '',
        seachData: null
    };

    componentDidMount() {
        this.autoFocusInst.focus();
        this.getHotSeach();
    }

    onChange(value) {
        this.setState({ value });
    }

    clear() {
        this.setState({ value: '' });
    }

    handleClick() {
        this.manualFocusInst.focus();
    }

    onSubmit() {
        const { value, hotValue } = this.state;

        this.setState({ value: value.trim().length ? value : hotValue })

        this.getSeachData(value.trim().length ? value : hotValue);

        this.props.history.push('/main/seach/tabs');
    }

    async getSeachData(keywords, offset = 0, type = 1) {
        const { result } = await API.get('/search', { keywords, offset, type });

        const newAry = result.songs.map(p => ({ ...p, alia: p.alias, ar: p.artists, al: p.album }));

        this.setState({ seachData: { tracks: newAry, value: keywords } }, () => console.log(this.state.seachData));
    }

    async getHotSeach() {
        const { data: { showKeyword: hotPlaceholder, realkeyword: hotValue } } = await API.get('/search/default');

        this.setState({ hotPlaceholder, hotValue });
    }

    render() {
        const { value, hotPlaceholder, seachData } = this.state;


        return (
            <div style={{ height: iphoneHeight }} >
                <SearchBar
                    cancelText='返回'
                    showCancelButton
                    value={value}
                    placeholder={hotPlaceholder}
                    onSubmit={this.onSubmit.bind(this)}
                    onClear={this.clear.bind(this)}
                    onCancel={() => this.props.history.go(-1)}
                    onChange={this.onChange.bind(this)}
                    ref={ref => this.autoFocusInst = ref} />

                <Route path="/main/seach/tabs" render={() => <SeachTabs seachData={seachData} ></SeachTabs>} />
            </div>
        );
    }

}

