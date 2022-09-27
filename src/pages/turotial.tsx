import classes from '*.module.css'
import React from 'react'
import Typed from 'react-typed'
import { makeStyles } from '@material-ui/core'
import useReactRouter from 'use-react-router'

const title = '選択式ミステリー旅行';
const useStyles = makeStyles(() => ({
    tutorialContainer: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        position: 'relative',
        flexDirection: 'column',
        textAlign: 'center',
        fontFamily: "HiraMinPro-W6",
        color: "#4575B4",
        fontSize: '17px',
    },
    tutorialWrapper: {
        height: '100%',
        padding: '1.875rem',
    },
    tutorialTypingBlock: {
      minHeight: '640px',
    },
    tutorialTextDesign: {
        textAlign: "center",
        letterSpacing: "6px",
        lineHeight: "40px",
    },
    tutorialLinkBlock: {
        marginTop: '88px',
        '& a': {
            borderBottom:"1px solid #4575B4",
            fontSize: "15px",
            letterSpacing: "5px",
            textAlign: "center",
            paddingBottom: "4px",
        },
    },
}))

const Tutorial: React.FC = () => {
    const { history } = useReactRouter()
    const classes = useStyles()

    return (
        <div className={classes.tutorialContainer}>
            <div className={classes.tutorialWrapper}>
                <div className={classes.tutorialTypingBlock}>
                    <Typed
                        className={classes.tutorialTextDesign}
                        strings={[`${title}<br /><br /><br />本アプリは<br />チャット画面を通して<br />物語を進めながら<br />実際に旅行を楽しんでいただける<br />アプリです<br /><br />なにかアプリ内でわからない<br />ことがあったら[?]を<br />押してください<br />`]}
                        typeSpeed={50}
                    />
                </div>
                <div className={classes.tutorialLinkBlock}>
                    <a onClick={() => history.push('/chat')}>チャット画面へ進む→</a>
                    {/* ※東京駅に到着し、係の人から指示があるまで押さないでください */}
                </div>
            </div>
        </div>
    )
}

export default Tutorial
