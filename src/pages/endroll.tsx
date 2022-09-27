import React from 'react'
import { Typography, makeStyles, Grid, Box, Button, ListItemAvatar, Avatar, List } from '@material-ui/core'
import Typed from 'react-typed'
import useReactRouter from 'use-react-router'
// import classes from '*.module.css'
const useStyles = makeStyles(() => ({
    outer:{
        display: 'flex',
        alignItems: 'center',//縦
        // backgroundColor: '#EEB57D',
        borderRadius: 16,
        height: '600px',
        width: '70%',
        marginTop: 20,
        justifyContent: 'center',
        marginLeft: '15%',
        padding: 10,
    },
    textDesign: {
        color: "#4575B4",
        fontSize: 20,
        top: "20%",
        position: "absolute",
        zIndex: 100,
        // marginLeft: "30%",
        fontFamily: 'Hira Min Pro',
        textAlign:"center",
        letterSpacing:"6px",
        lineHeight:"40px",
    },
    startText: {
        // borderBottom:"1px solid #4575B4",
        backgroundColor: "#4575B",
        fontSize:"25px",
        color: "#4575B4",
        // width: "60%",
        height: "5%",
        marginTop: "130%",
        // marginLeft: "5%",
        zIndex: 2,
        position: 'absolute',
        letterSpacing:"6px",
        fontFamily: "Hira Min Pro",
        textAlign:"center",
        lineHeight:"50px",
        paddingBottom:"1px",
    },
}))
const Endroll: React.FC = () => {
    const classes = useStyles()
    const { history } = useReactRouter()
    return (
        <div className={classes.outer}>
            <Typed
                className={classes.textDesign}
                strings={['本日は宇都宮での旅行を体験いただきありがとうございました。いかがだったでしょうか。あなたが体験されたシナリオ以外にもまだ３つ用意しておりますので、またチャレンジしていただければと思います。</br></br>プロデューサー：']}
                typeSpeed={50}
            />
            <br />
            {/* <button className={classes.startText} onClick={() => history.push('/tutorial')}>旅行終了</button> */}
            {/* ※東京駅に到着し、係の人から指示があるまで押さないでください */}
        </div>
    )
}
export default Endroll