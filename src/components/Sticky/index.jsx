import React, { Component } from "react";

import "./Sticky.css";

export class Sticky extends Component {

    state = {
        height: 0,
        top: 0,
        fixed: false
    }

    components = {}

    scrollListener() {
        const { top, fixed } = this.state;
        const newFixed = window.scrollY > top;
        newFixed !== fixed && this.setState({ fixed: newFixed });
    }

    // 监听 scroll事件
    componentDidMount() {
        const { height, top } = this.components.container.getBoundingClientRect();
        this.setState({ height, top });
        window.addEventListener('scroll', this.scrollListenerBound = this.scrollListener.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollListenerBound);
    }

    render() {
        const { height, fixed } = this.state;
        const { children } = this.props;

        return (
            <div style={{ height }}>
                <div ref={el => this.components.container = el} className={fixed ? "one-fixed" : ''}>
                    {children}
                </div>
            </div>
        );
    }
}
