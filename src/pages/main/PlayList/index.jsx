import React, { Component } from "react";
import { observer } from "mobx-react";
import { Spring } from "react-spring/renderprops";


import { MyPlayStore } from "../../../components/MyPlayStore/MyPlayStore";

import './index.less';

@observer
export class PlayList extends Component {


    static contextType = MyPlayStore;

    render() {
        const { listMark, onClickHandle } = this.context;

        return (
            <div className={["play-list", listMark ? "display-block" : "display-none"].join(' ')}>
                <Spring from={{ opacity: 0 }} to={{ opacity: listMark - 0 }} >
                    {props => !!props.opacity && <div style={props} onClick={(e) => onClickHandle('listMark', e)} className="mask" />}
                </Spring>
            </div>
        )
    }
}