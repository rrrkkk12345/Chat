import React, { useEffect, useState, useRef } from 'react'
import {  makeStyles, ListItemAvatar, Avatar, List } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import userIcon from '../assets/avatar.png';
import jsonData from '../utils/db.json';

const Tap = require('../assets/tapIcon.png');

const headerHeight = '44px';
const ContentBodyHeight = `calc(100vh - ${headerHeight})`;
const selectButtonRadius = '18px';
const baseFontColor = '#4575b4';

const useStyles = makeStyles((theme) => ({
    chatDesignContainer: {
        display: "flex",
        position: "relative",
        width: "100%",
        height: ContentBodyHeight,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: headerHeight,
        paddingBottom: '156px',
    },
    chatDesign: {
        display: 'flex',
        justifyContent: 'center',
        position: "relative",
        width: "100%",
        backgroundColor: "#EFEDE9",
        paddingBottom: "291px",
        overflow: "auto",
        '& .MuiList-padding': {
            display: 'flex',
            justifyContent: 'center',
            padding: '0.5rem 1rem',
        }
    },
    chatDesignInner: {
        position: "relative",
        width: "100%",
        maxWidth: '390px',
        height: ContentBodyHeight,
    },
    buttonDesign: {
        bottom: "30%",
        position: "fixed",
        borderRadius: "50%",
        color: "white",
        fontFamily: 'メイリオ',
        width: 80,
        opacity:0.5
    },
    selectButton: {
        width: "100%",
        minHeight: '10%',
        justifyItems: 'center',
        textAlign: 'center',
        padding: '0.5rem 0',
        position: 'fixed',
        bottom: "10%",
        backgroundColor: '#EFEDE9',
        boxShadow: 'inset 0 -0.5px 0 0 rgba(0, 0, 0, 0.2)',
        '& .MuiButton-label': {
            color: baseFontColor,
        },
        '& .MuiButton-disableElevation': {
            width: '100%',
            maxWidth: '326px',
            height: '100%',
            minHeight: headerHeight,
            border: '1px solid #cdcdcd',
            backgroundColor: '#FFFFFF',
        },
        '& .MuiGrid-grid-xs-12:nth-of-type(1)': {
            '& button': {
                borderTopLeftRadius: selectButtonRadius,
                borderTopRightRadius: selectButtonRadius,
            },
        },
        '& .MuiGrid-grid-xs-12:nth-of-type(2)': {
            '& button': {
                borderBottomLeftRadius: selectButtonRadius,
                borderBottomRightRadius: selectButtonRadius,
            },
        },
    },
    otherWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        '& .MuiListItemAvatar-root': {
            minWidth: '40px',
        },
        '& .MuiAvatar-root': {
            width: '31px',
            height: '31px',
        }
    },
    other: {
        fontFamily: 'メイリオ',
        width: '100%',
        maxWidth: '25ch',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 17.5,
        borderColor: 'blue',
        padding: 10,
    },
    other_label: {
        fontSize: 15,
        marginBottom: '0%',
        marginLeft: '15%',
        marginTop: '0.5rem',
    },
    meWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    me: {
        fontFamily: 'メイリオ',
        border: '1px solid #bfc8d5',
        color: '#7088b1',
        borderRadius: 17.5,
        backgroundColor: '#e2e3e4',
        width: 'auto',
        maxWidth: '27ch',
        padding: 10,
    }

   
}))


const Chat: React.FC = () => {
    const classes = useStyles()
    const [scenarioCount, setScenarioCount] = useState<number>(0)
    const increment =() => setScenarioCount((prevCount) => prevCount +1)
    const ref = useRef<any>(null)
    

    useEffect(() => {
        scrollToBottomOfList()
    }, [scenarioCount])

    const scrollToBottomOfList = React.useCallback(() => {
        ref!.current!.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        })
    }, [ref])

    const processScenario = () => {


        const scenario = JSON.stringify(jsonData)
        console.log(scenario[0])
        increment()          
    }

    const pName = "other"

    return (
        <div>
            <div className={classes.chatDesignContainer}>
                <div className={classes.chatDesign}>
                    <div className={classes.chatDesignInner}>
                
                        {(() => {
                        const items = [];
                            for (let i = 0; i < scenarioCount; i++) {
                            if (jsonData[i].personName==="me") {
                                items.push(
                                    <div className={classes.meWrapper}>
                                        <List>
                                            <ListItem className={classes.me}>{jsonData[i].plane}</ListItem>
                                        </List>
                                    </div>                                
                                )                                
                            }else{
                                items.push(
                                    <div className={classes.otherWrapper}>
                                    
                                        <div className={classes.other_label}>{pName}</div>
    
                                        <List>
                                            <ListItemAvatar>
                                                <Avatar alt="icon" src={userIcon} />
                                            </ListItemAvatar>
                                            <ListItem className={classes.other}>{jsonData[i].plane}</ListItem>
                                        </List>
                                    </div>                                
                                )
                            }
                         
                            }
                             return <ul>{items}</ul>;
                        })()}
                        
                        <div id="bottom-of-list" ref={ref} />
                    </div>
                  
                  {scenarioCount< jsonData.length ? 
                    <img className={classes.buttonDesign} src={Tap} onClick={() => { processScenario() }} />
                  : <div></div>}
                    
                </div>
            </div>
        </div>
    )
}

export default Chat;
