import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';

export class TopNav extends Component {
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search"  />,
                    ]}
                >NavBar</NavBar>
            </div>
        )
    }
}