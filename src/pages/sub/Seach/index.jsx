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
export default class Seach extends Component {

    static contextType = MyPlayStore;

    state = {
        value: '',
        hotValue: '',
        hotPlaceholder: '',
        seachData: null,
        suggestData: [],
        suggestMark: false,
        seachMark: false
    };

    componentDidMount() {
        this.autoFocusInst.focus();
        this.getHotSeach();
    }

    renderSuggest() {
        const { suggestData } = this.state;
        return (
            <div className='seach-suggest'>
                <ul>
                    {suggestData && suggestData.map(p => (
                        <li className='seach-suggest-item' onClick={this.suggestClick.bind(this, p.keyword)} key={p.keyword}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#iconsousuo"></use>
                            </svg>
                            {p.keyword}
                        </li>
                    ))}
                </ul>
            </div >
        );
    }

    suggestClick(value) {
        this.setState({ value, seachMark: true, suggestMark: false });
        this.getSeachData(value);
    }

    async getSuggest() {
        let res;
        const { value } = this.state;

        value.trim().length && (res = await API.get('/search/suggest', { keywords: this.state.value, type: 'mobile' }));

        this.setState({ suggestData: Object.keys(res.result).length ? res.result.allMatch : false });

        console.log(res);
    }

    async onChange(value) {

        this.getSuggest();

        // 显示搜索建议
        this.setState({ value, suggestMark: true });
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

        // 获取搜索数据
        this.getSeachData(value.trim().length ? value : hotValue);

        // 显示搜索结果
        this.setState({ seachMark: true, suggestMark: false });
    }

    async getSeachData(keywords, offset = 0, type = 1) {
        const { result } = await API.get('/search', { keywords, offset, type });

        const newAry = result.songs.map(p => ({ ...p, alia: p.alias, ar: p.artists, al: p.album }));

        console.log(newAry);

        this.setState({ seachData: { tracks: newAry, value: keywords } }, () => console.log("seach", this.state.seachData));
    }

    async getHotSeach() {
        const { data: { showKeyword: hotPlaceholder, realkeyword: hotValue } } = await API.get('/search/default');

        this.setState({ hotPlaceholder, hotValue });
    }

    render() {
        const { value, hotPlaceholder, seachData, seachMark, suggestMark } = this.state;

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

                {suggestMark && this.renderSuggest()}
                {(!suggestMark && seachMark) && <SeachTabs seachData={seachData} ></SeachTabs>}
            </div>
        );
    }

}

