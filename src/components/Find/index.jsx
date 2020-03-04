import React, { Component } from "react";
import { Carousel } from 'antd-mobile';

import { API } from "../../utils/fetchAPI";
// import { stopTouchMove } from "../../utils/stopTouchmove";

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
    onClick() {
        console.log(1111);

    }

    async getbannerData() {
        const { banners } = await API.get('/banner', { type: 1 });

        this.setState({ bannerData: banners });

        //  touchmove
    }
    // TODO：轮播图bug
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
                >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            href="#"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
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