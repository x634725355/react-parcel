import React, { Component } from "react";
import { Carousel, Flex, Grid } from 'antd-mobile';
import { Link } from "react-router-dom";

// swiper引入
import Swiper from 'swiper/js/swiper'
import 'swiper/css/swiper.css';

import { API } from "../../utils/fetchAPI";

import './index.less';

const data = Array.from(new Array(9)).map((_val, i) => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: `name${i}`,
}));

export class Find extends Component {

    state = {
        bannerData: [],
        imgHeight: 176,
        navList: [
            ['每日推荐', '#iconrili', 'recommended'],
            ['歌单', '#iconlist', 'recommended'],
            ['排行榜', '#iconpaixingbang', 'recommended'],
            ['电台', '#icondiantai', 'recommended'],
            ['私人FM', '#icondiantai1', 'recommended']
        ],
        resourceData: []
    }

    componentDidMount() {
        // 获取轮播图
        this.getBannerData();
        // 获取推荐歌单
        this.getResourceData();
        // 渲染swiper轮播图
        this.renderSwiper();
    }

    // 获取轮播图数据
    async getBannerData() {
        const { banners } = await API.get('/banner', { type: 1 });

        const newBanners = banners.map(p => ({ img: p.pic, id: p.targetId, type: p.targetType, song: p.song, title: p.typeTitle, color: p.titleColor, url: p.url }));

        this.setState({ bannerData: newBanners });

    }

    // 获取每日推荐歌单
    async getResourceData() {
        const { recommend } = await API.get('/recommend/resource');

        const newResource = recommend.map(p => ({ img: p.picUrl, id: p.id, type: p.type, userId: p.userId, title: p.name, playcount: p.playcount, creator: p.creator }));

        this.setState({ resourceData: newResource });

    }

    // 渲染swiper轮播图
    renderSwiper() {
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 5,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            // 异步数据要打开这个开关
            observer: true
        });
    }

    /* 渲染轮播图 */
    renderBanner() {
        const { onWiperChange } = this.props;
        const { bannerData } = this.state;
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
                    swipeSpeed={8}
                >
                    {this.state.bannerData.map(p => (
                        <Link
                            key={p.id}
                            to="/home"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight, padding: "0px 10px" }}
                        >
                            <div className="banners-title" style={{ backgroundColor: p.color }} >{p.title}</div>
                            <img
                                src={`${p.img}`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top', height: 150, borderRadius: 10 }}
                                onLoad={() => this.setState({ imgHeight: 'auto' })}
                            />
                        </Link>
                    ))}
                </Carousel>
            </div>
        );
    }

    // 导航栏渲染 TODO: 点击传值未完成
    renderNavButton() {
        return (
            <div>
                <Flex className="nav">
                    {this.state.navList.map((i, key) => (
                        <Flex.Item key={key}>
                            <Link to={i[2]}>
                                <div className="nav-svg">
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref={i[1]}></use>
                                    </svg>
                                </div>
                                <div className="title">{i[0]}</div>
                            </Link>
                        </Flex.Item>
                    ))}
                </Flex>
            </div >
        )
    }

    // 歌单推荐
    renderResource() {
        const { onWiperChange } = this.props;
        const { resourceData } = this.state;
        return (
            <div>
                <p>推荐歌单</p>
                <h3>为你精挑细选</h3>
                <div
                    className="song-list"
                    onTouchStart={() => onWiperChange(false)}
                    onTouchEnd={() => onWiperChange(true)}
                >
                    {/* Swiper  */}
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {resourceData.map(p => (
                                <div key={p.id} className="swiper-slide">

                                    <Link className="find-resource" to="/songList" >
                                        <span>▶{p.playcount}</span>
                                        <img src={p.img} alt="" />
                                        <p>{p.title}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="find">
                {/* 渲染轮播图 */}
                {this.renderBanner()}
                {/* 导航栏渲染 */}
                {this.renderNavButton()}
                {/* 推荐歌单 */}
                {this.renderResource()}
            </div>
        );
    }
}