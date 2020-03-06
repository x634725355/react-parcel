import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import propTypes from 'prop-types'

import { NavBar, Icon } from 'antd-mobile'

import './index.less'

// import styles from './TitleBar.module.less'

class EnhanceTitleBar extends Component {
    static propTypes = {
        title: propTypes.string,
        children(props, propName) {
            // 判断至少 title 和 children 二选一。
            if (!(props.title || props.children))
                throw new Error('title 和 children 属性至少必须填写一项！');  // throw 和 return 都是会中断代码执行。
            if (props[propName] && typeof props[propName] !== 'string')
                throw new Error('children 必须是字符串！');
        }
    }

    render() {
        const { history, title, children = title, delta = 1, leftClick = () => history.go(-delta), rightContent } = this.props

        return (
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={leftClick}
                rightContent={rightContent}
            >{children}</NavBar>
        )
    }
}

export const TopNav = withRouter(EnhanceTitleBar)