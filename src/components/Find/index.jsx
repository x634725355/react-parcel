import React, { Component } from "react";
import { Carousel } from 'antd-mobile';

import { API } from "../../utils/fetchAPI";

import './index.less';

export class Find extends Component {

    state = {
        bannerData: [],
        data: ['1', '2', '3'],
        imgHeight: 176,
    }

    componentDidMount() {
        this.getbannerData();

        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }

    async getbannerData() {
        const { banners } = await API.get('/banner', { type: 1 });

        this.setState({ bannerData: banners });

    }

    renderBanner() {
        const { onWiperChange } = this.props
        return (
            <div className="banners"
                onTouchStart={() => onWiperChange(false)}
                onTouchEnd={() => onWiperChange(true)}
            >
                <Carousel
                    autoplay
                    infinite
                    dotActiveStyle={{ backgroundColor: '#c81912' }}
                    cellSpacing={15}
                >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            href="#"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight, padding: "0px 10px" }}
                        >
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top', height: 150, borderRadius: 10 }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
            </div>
        );
    }

    render() {
        return (
            <div>
                {/* 渲染轮播图 */}
                {this.renderBanner()}
            </div>
        );
    }
}