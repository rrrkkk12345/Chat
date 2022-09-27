import React, { useState }  from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import styles from "./header.module.css";
import { Menu, MenuItem } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import DehazeIcon from '@material-ui/icons/Dehaze';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import { Typography, Grid, Box, Button, ListItemAvatar, Avatar, List } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import useReactRouter from 'use-react-router';
const UserIcon = require('../assets/test.png');

const Header: React.FC<{title:string}> = (props) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const useStyles = makeStyles({
        defaultMenuSize: {
            fontSize: "2.2rem",
        },
        setMenuSize: {
            fontSize: "2.6rem",
        },
        defaultItemSize: {
            fontSize: "1.2rem",
        },
        setItemSize: {
            fontSize: "1.4rem",
        },
    });
    const classes = useStyles();
    const { history } = useReactRouter();
    return (
        <div>
            <div className={styles.headerContainer}>
                <div className={styles.formHeadTitle}>
                    <a href="./">{props.title}</a>
                </div>
                <div className={styles.deHazeMenu}>
                    {/* <IconButton
                        aria-label="deHaze"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                        <DehazeIcon className={matches ? classes.setMenuSize : classes.defaultMenuSize} />
                    </IconButton> */}
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="icon" src={UserIcon} onClick={() => history.push('/contact')}/>
                        </ListItemAvatar>
                        <ListItemAvatar>
                            <Avatar alt="icon" src={UserIcon} />
                        </ListItemAvatar>
                    </ListItem>
                    {/* <Avatar>📞</Avatar>
                    <div></div>
                    <Avatar>📞</Avatar> */}
                    {/* <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                    </Menu> */}
                </div>
            </div>
        </div>
    )


}

export default Header