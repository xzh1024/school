import React, { Dispatch, Component } from "react";
import { PlatformConnectState } from "../models"
import { PlatFormListModel } from "@/constant"
import { connect } from "dva";
import { AnyAction } from "redux";
import styles from "./index.scss";
import { Button, Modal } from "antd";
import router from 'umi/router';

interface PlatformProps {
    platformData: PlatFormListModel;
    isAuthed: boolean;
}


const PlatformEach: React.FC<PlatformProps> = props => {
    const { platformData, isAuthed } = props;
    return (
        <div className={styles.platform} key={platformData.imgUrl}>
            {/* <a
                className={styles.platform_logo}
                href="www.baidu.com"
                target="_blank"
            >
                <img src={platformData.imgUrl} />
            </a>
            <div className={styles.platform_slot}>
                <span onClick={toPlatform}>进入平台</span>
                {isAuthed &&
                    <span onClick={toManage}>平台管理</span>
                }
                {!isAuthed &&
                    <span onClick={toAccredit}>点击授权</span>
                }
            </div> */}
        </div>
    );
}
export default connect(({ platformData, isAuthed }: PlatformProps) => ({
    platformData: platformData,
    isAuthed: isAuthed
}))(PlatformEach);
