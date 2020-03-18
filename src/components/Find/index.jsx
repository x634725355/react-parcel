import React, { Component } from "react";
import { Carousel, Flex, WingBlank, Button } from 'antd-mobile';
import { Link } from "react-router-dom";

// swiper引入
import Swiper from 'swiper/js/swiper'
import { API } from "../../utils/fetchAPI";
import { MyPlayStore } from "../MyPlayStore/MyPlayStore";

import 'swiper/css/swiper.css';
import './index.less';


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
        resourceListData: [],
        songRecommendData: [],
        songRecommendId: []
    }

    static contextType = MyPlayStore;

    componentDidMount() {
        // 获取轮播图
        this.getBannerData();
        // 获取推荐歌单
        this.getResourceListData();
        // 渲染swiper轮播图
        this.renderSwiper();
        // 获取风格推荐数据
        this.getSongRecommend();
    }

    // 获取轮播图数据
    async getBannerData() {
        const { banners } = await API.get('/banner', { type: 1 });

        const newBanners = banners.map(p => ({ img: p.pic, id: p.targetId, type: p.targetType, song: p.song, title: p.typeTitle, color: p.titleColor, url: p.url }));

        this.setState({ bannerData: newBanners });

    }

    // 获取每日推荐歌单
    async getResourceListData() {
        const { recommend } = await API.get('/recommend/resource');

        const newResource = recommend.slice(0, 6).map(p => ({ img: p.picUrl, id: p.id, type: p.type, userId: p.userId, title: p.name, playcount: p.playcount, creator: p.creator }));

        this.setState({ resourceListData: newResource });

    }

    // 获取每日推荐歌曲截取第12首当作风格推荐数据
    async getSongRecommend() {
        const { recommend } = await API.get('/recommend/songs');

        const newResource = recommend.slice(0, 12).map(p => ({ alias: p.alias, starred: p.starred, artists: p.artists, id: p.id, duration: p.duration, album: p.album, title: p.name, playcount: p.playcount, bMusic: p.bMusic, commentThreadId: p.commentThreadId }));

        this.setState({
            songRecommendData: [newResource.slice(0, 3), newResource.slice(3, 6), newResource.slice(6, 9), newResource.slice(9, 12)],
            songRecommendId: newResource.map(p => p.id)
        });

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
        const { bannerData, imgHeight } = this.state;
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
                    {bannerData.map(p => (
                        <Link
                            key={p.id}
                            to="/home"
                            style={{ display: 'inline-block', width: '100%', height: imgHeight, padding: "0px 10px" }}
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

    // 导航栏渲染 TODO: 点击还不够完善
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

    // 计算播放数据
    getPlaycount(data) {
        const length = data.length
        return length > 5 ? (length > 8 ? data.substring(0, length - 7) + '.' + data.substring(1, length - 7) + '亿' : data.substring(0, length - 4) + '万') : data
    }

    // 歌单推荐 TODO:还没添加点击跳转
    renderListResource() {
        const { onWiperChange } = this.props;

        const { resourceListData } = this.state;

        return (
            <WingBlank size='sm'>
                <div>
                    <p className='recommend-songlist'>推荐歌单</p>
                    <h3 className="pick">
                        为你精挑细选
                        <button className="button">查看更多</button>
                    </h3>

                    <div
                        className="song-list"
                        onTouchStart={() => onWiperChange(false)}
                        onTouchEnd={() => onWiperChange(true)}
                    >
                        {/* Swiper  */}
                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                                {resourceListData.map(p => (
                                    <div key={p.id} className="swiper-slide">

                                        <Link className="find-resource" to="/songList" >
                                            <span>▶{this.getPlaycount(p.playcount.toString())}</span>
                                            <img src={p.img} alt="" />
                                            <p>{p.title}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </WingBlank>

        );
    }

    // 风格推荐
    renderSongRecommend() {
        const { onWiperChange } = this.props;

        const { songRecommendData, songRecommendId } = this.state;

        const { onClickSongListId } = this.context;

        return (
            <WingBlank size='sm'>
                <div>
                    <p className='recommend-songlist'>风格推荐</p>
                    <h3 className="pick">
                        不知道什么风格
                        <button className="button">▶播放全部</button>
                    </h3>

                    <div
                        className="song-recommend"
                        onTouchStart={() => onWiperChange(false)}
                        onTouchEnd={() => onWiperChange(true)}
                    >
                        {/* Swiper  */}
                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                                {!!songRecommendData.length && songRecommendData.map((p, index) => (
                                    <div key={index} className="swiper-slide">
                                        {p.map(p => (
                                            <div onClick={(e) => onClickSongListId(e, songRecommendId, p.id)} className='song-recommend-list' key={p.id}>
                                                <img src={p.album.picUrl} alt="" />
                                                <div className='song-recommend-singer'>
                                                    <div className="song-recommend-singer-left">
                                                        <div>
                                                            <span>{p.title}</span><span>-{p.artists.map(p => p.name).join('/')}</span>
                                                        </div>
                                                        <p>这个推荐语真的有点难搞</p>
                                                    </div>
                                                    <div className="song-recommend-singer-right">
                                                        <svg className="icon" aria-hidden="true">
                                                            <use xlinkHref="#iconyinle-bofang"></use>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </WingBlank>
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
                {this.renderListResource()}
                {/* 推荐歌曲 */}
                {this.renderSongRecommend()}
            </div>
        );
    }
}