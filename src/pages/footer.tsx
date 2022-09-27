import React, { useState } from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import styles from "./footer.module.css";
import { Menu, MenuItem } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import DehazeIcon from '@material-ui/icons/Dehaze';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import { Typography, Grid, Box, Button, ListItemAvatar, ListItemText, Avatar, List } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import useReactRouter from 'use-react-router';
// import { Copyright } from '@material-ui/icons';
const UserIcon = require('../assets/test.png');
const PhoneIcon = require('../assets/phone.png');
const HintIcon = require('../assets/hint.png');
const SettingIcon = require('../assets/setting.png');

const Footer: React.FC = (props) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const useStyles = makeStyles({
        wrapper: {
            minHeight: '100vh',
            position: 'relative',
            // paddingBottom: '120px',
        },
        footer: {
            minHeight: '10%',
            justifyItems:'center',
            width: '100%',
            textAlign: 'center',
            padding: '30px 0',
            position: 'absolute',
            bottom: '0',
            backgroundColor: 'red',
        }
    });
    const classes = useStyles();
    const { history } = useReactRouter();
    return (
        <div>
            <div className={classes.footer}>
                <Copyright />
            </div>
        </div>
    )


}
const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            {/* <Link color="inherit" to="/"> */}
                 パーソルキャリア株式会社
            {/* </Link>{" "} */}
            {new Date().getFullYear()}
            {"."}

        </Typography>
    );
};
export default Footer