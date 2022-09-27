import React, { useState } from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import styles from "./header.module.css";
import { Menu, MenuItem } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import { ListItemAvatar, ListItemText, Avatar } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import useReactRouter from 'use-react-router';
const UserIcon = require('../assets/test.png');
const PhoneIcon = require('../assets/phone.png');
const HintIcon = require('../assets/hint.png');
const SettingIcon = require('../assets/setting.png');

const HeaderChat: React.FC<{ title: string }> = (props) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const headerHeight = '44px';
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
        headerChat: {
            background: "#EFEDE9",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            zIndex: 500,
            width: "100%",
        },
        navMenuContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: headerHeight,
            position: 'fixed',
            flexDirection: 'row',
            borderBottom: '1px solid #CBCBCB',
            zIndex: 100,
            backgroundColor: 'rgb(238, 237, 234)',
        },
        navMenuWrapper: {
            background: '#EFEDE9',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100vw',
            maxWidth: '390px',
            height: headerHeight,
            '& li:nth-of-type(2)': {
                position: 'absolute',
                width: 'auto',
                textAlign: 'center',
            },
            borderBottom: '1px solid #CBCBCB',
        },
        headerImageBlock: {
            '& .MuiAvatar-img': {
                width: 'auto',
                height: '20px',
            }
        },
        deHazeMenu: {
            position: 'relative',
            right: 'unset',
            top: 'unset',
            transform: 'unset',
            '& .MuiListItemAvatar-root': {
                minWidth: 'unset',
            },
            '& .MuiListItem-gutters': {
                paddingLeft: 'unset',
                paddingRight: 'unset',
            }
        },
        settingBlock: {
            '&.MuiListItem-gutters': {
                paddingLeft: 'unset',
            }
        },
        propsTitleStyle: {
            '& .MuiTypography-body1': {
                fontSize: '17px',
                fontWeight: 'bold',
            },
        },

    });
    const classes = useStyles();
    const { history } = useReactRouter();
    const options = [
        'None',
        'Atria',
        'Callisto',
        'Dione',
        'Ganymede',
        'Hangouts Call',
        'Luna',
        'Oberon',
        'Phobos',
        'Pyxis',
        'Sedna',
        'Titania',
        'Triton',
        'Umbriel',
      ];
    return (
      <div className={classes.navMenuContainer}>
          <div >
              <div className={`${classes.navMenuWrapper} ${classes.headerImageBlock}`}>
                  <div className={styles.formHeadTitle}>
                      {/* <a href="./">{props.title}</a> */}
                  </div>
                  <ListItem className={classes.settingBlock}>
                      <ListItemAvatar>
                          <Avatar alt="icon" src={SettingIcon} onClick={handleClick} />

                      </ListItemAvatar>
                  </ListItem>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            // maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    }}
                  >
                      {/* <MenuItem  onClick={()=>history.push("/setting")}>
                          情報画面
                      </MenuItem> */}
                      <MenuItem  onClick={()=>{
                          localStorage.removeItem('jwt')
                          localStorage.removeItem('scenarioHist')
                          window.location.reload()
                      }}>
                          ログアウト
                      </MenuItem>
                  </Menu>
                  <ListItem>
                      <ListItemText className={classes.propsTitleStyle}>{props.title}</ListItemText>
                  </ListItem>
                  <div className={classes.deHazeMenu}>
                      {/* <IconButton
                        aria-label="deHaze"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                        <DehazeIcon className={matches ? classes.setMenuSize : classes.defaultMenuSize} />
                    </IconButton> */}
                      <ListItem>
                          {/* <ListItemAvatar>
                              <Avatar alt="icon" src={PhoneIcon} onClick={() => history.push('/confirm')} />
                          </ListItemAvatar> */}
                          <ListItemAvatar>
                              <Avatar alt="icon" src={HintIcon} onClick={() => history.push('/faq')} />
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
      </div>

    )


}

export default HeaderChat
