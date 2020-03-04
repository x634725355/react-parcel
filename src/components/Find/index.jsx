import React, { Component } from "react";

import { API } from "../../utils/fetchAPI";

import './index.less';

export class Find extends Component {

    state = {
        bannerData: []
    }

    componentDidMount() {
        this.getbannerData();
    }

    async getbannerData() {
        const { banners } = await API.get('/banner', { type: 1 });

        this.setState({ bannerData: banners });
    }

    render() {
        return (
            <div>
                发现页面
            </div>
        );
    }
}