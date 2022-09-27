import React, { useState } from 'react';
import useReactRouter from 'use-react-router';
import HeaderChat from './headerChat';
import { Typography, makeStyles, Grid, Box, Button, ListItemAvatar, Avatar, List } from '@material-ui/core'
import classes from '*.module.css'
const useStyles = makeStyles((theme) => ({
    textArea: {
        position: "absolute",
        width: "100%",
        color:"blue",
        // backgroundColor: "#EFEDE9",
        top: "10%",
        bottom: "25%",
        // overflow: "auto",
        textAlign: "center",
    },

}))
const Setting: React.FC = () => {
    const classes = useStyles()
    const { history } = useReactRouter();
    return (
        <div>
            <HeaderChat title={"基本情報画面"}/>
            <div className={classes.textArea}>
                <label>お名前：山田 太郎</label>
                {/* <input
                    type="text"
                    name="name"
                    placeholder="山田 太郎"
                /> */}
                <div></div>
                <label>生年月日：1996年11月7日</label>
            </div>
            <div>
                {/* <input type="date" name="birthday" id="birthday"></input> */}
            </div>
            {/* <button onClick={()=>history.push('/topPage')}>完了</button> */}
        </div>
    )
}

export default Setting;