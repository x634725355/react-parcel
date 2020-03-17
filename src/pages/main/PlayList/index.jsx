import React, { Component } from "react";
import { observer } from "mobx-react";


import { MyPlayStore } from "../../../components/MyPlayStore/MyPlayStore";

import './index.less';

@observer
export class PlayList extends Component {


    static contextType = MyPlayStore;

    render() {
        const { listMark } = this.context;
        
        return (
            <div className={["play-list", listMark ? "display-block" : "display-none"].join(' ')}>
                kokokokoko
            </div>
        )
    }
}