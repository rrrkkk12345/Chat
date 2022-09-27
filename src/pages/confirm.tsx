import React from 'react'
import { Typography, makeStyles, Grid, Box, Button, ListItemAvatar, Avatar, List } from '@material-ui/core'
import classes from '*.module.css'
const useStyles = makeStyles((theme) => ({
    textArea: {
        position: "absolute",
        width: "100%",
        // backgroundColor: "#EFEDE9",
        top: "10%",
        bottom: "25%",
        // overflow: "auto",
        textAlign: "center",
    },

}))
const Confirm: React.FC = () => {
    const classes = useStyles()
    return (
        <div className={classes.textArea}>
            <button>✆電話で問い合わせる</button>
            <div></div>
            <textarea name="msg" rows={20} cols={40}></textarea>
            <div></div>
            <button>送信</button>

        </div>
    )
}
export default Confirm