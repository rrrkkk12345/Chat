import React, { useEffect, useState, useRef } from 'react'
import { Typography, makeStyles, TextField, Grid, Box, Button, ListItemAvatar, Avatar, List } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import useReactRouter from 'use-react-router';
// import classes from '*.module.css';
import Header from './header';
import HeaderChat from './headerChat';
import GoogleMapAPI from '../utils/googleMapAPI';
import Footer from './footer';
import SelectInput from '@material-ui/core/Select/SelectInput';
import axios, { AxiosResponse } from 'axios';
import { Data, GoogleMap } from '@react-google-maps/api';
import userIcon from '../assets/avatarWomen.png';
import { Label } from '@material-ui/icons';
import jsonDataMale from '../utils/db2.json';
import jsonDataFemale from '../utils/db_f.json';
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import ForwardIcon from '@material-ui/icons/Forward';

const UserIcon = require('../assets/test.png');
const TabChatOn = require('../assets/TabChatOn.png');
const TabMapOff = require('../assets/TabMapOff.png');
const Tap = require('../assets/Tap.png');


const headerHeight = '44px';
const ContentBodyHeight = `calc(100vh - ${headerHeight})`;
const selectButtonRadius = '18px';
const baseFontColor = '#4575b4';
const textInputBgColor = '#fefffe';

const useStyles = makeStyles((theme) => ({
    chatDesignContainer: {
        display: "flex",
        position: "relative",
        width: "100%",
        // height: '100vh',
        // height: 'calc(100vh - 200px)',
        height: ContentBodyHeight,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: headerHeight,
        paddingBottom: '156px',
        // paddingBottom: isButton ? '156px' : 'calc(10% + 1rem)',
        // paddingBottom: 'calc(20% + 1rem)',
    },
    chatDesign: {
        display: 'flex',
        justifyContent: 'center',
        position: "relative",
        width: "100%",
        backgroundColor: "#EFEDE9",
        // top: "10%",
        // paddingTop: headerHeight,
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
        // backgroundColor: "blue",
        color: "white",
        // zIndex:100,
        // marginLeft: "40%",
        fontFamily: 'メイリオ',
        // cursor: "pointer",
    },
    selectButton: {
        width: "100%",
        minHeight: '10%',
        // height: '10%',
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
    narrator: {
        fontFamily: 'メイリオ',
        // fontSize: 20,
        display: 'flex',
        alignItems: 'flex-start',//縦
        textAlign: 'left',//横
        backgroundColor: '#efdcc9',
        color: "#994C00",
        borderRadius: 16,
        width: '100%',
        maxWidth: '390px',
        marginTop: 20,
        justifyContent: 'flex-start',
        // marginLeft: '15%',
        padding: '1rem',
        // position:'relative',
    },
    yukaWrapper: {
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
    yuka: {
        fontFamily: 'メイリオ',
        width: '100%',
        maxWidth: '25ch',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 17.5,
        borderColor: 'blue',
        padding: 10,
    },
    yuka_label: {
        fontSize: 15,
        marginBottom: '0%',
        marginLeft: '15%',
        marginTop: '0.5rem',
    },
    syujiinkoWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    syujiinko: {
        fontFamily: 'メイリオ',
        border: '1px solid #bfc8d5',
        color: '#7088b1',
        borderRadius: 17.5,
        backgroundColor: '#e2e3e4',
        width: 'auto',
        maxWidth: '27ch',
        padding: 10,
    },
    avatar: {
        // padding: 10,
        marginLeft: 50,
    },
    square: {
        width: "100%",
        height: "900px",
        // margin:'0',
        backgroundColor: "#eeedea",
    },
    bottomTab: {
        position: "fixed",
        bottom: "0",
        height: "10%",
        width: "100%",
        backgroundColor: "#eeedea",
        display: "flex",
        flexDirection: "row",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    bottomChat: {
        // border: "2px solid",
        // borderColor: "pink",
        flex: 1,
    },
    bottomMap: {
        // border: "2px solid",
        // borderColor: "pink",
        flex: 1,
    },
    mapLabel: {
        color: baseFontColor,
        fontWeight: 'bold',
        fontSize: '14px',
        letterSpacing: '-0.32px',
        textAlign: 'center',
        bottom: "13%",
        position: "fixed",
        borderRadius: "50%",
        // backgroundColor: "blue",
        // zIndex:100,
        // marginLeft: "40%",
        fontFamily: 'メイリオ',
        // cursor: "pointer",
    },
    sendButtonContainer: {
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        padding: '0 1rem',
    },
    sendButtonWrapper: {
        paddingLeft: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '390px',
        backgroundColor: textInputBgColor,
        border: '1px solid #c4c4c6',
        borderRadius: selectButtonRadius,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}))

type JsonData = {
    sentenceId: string
    nextSentenceId: string
    personName: string
    sentence: {
        plane: string,
        button: Array<{
            buttonLabel: string,
            nextSentenceId: string
        }>
    }
    reply: string
}
type LogData = {
    // id: string
    personName: string
    plane: string,

}


const currentSentenceIdInit: string = "0"
const genderInit: string = "0"
const spotIdInit: string = "A"
const spotNameInit: string = "大谷資料館"
const scenarioListInit = [
    {
        sentenceId: "0",
        nextSentenceId: "1",
        personName: "優花",
        sentence: {
            plane: "初期値消したい",
            button: [
                {
                    buttonLabel: "海外強度料理にしよう",
                    nextSentenceId: "21"
                },
                {
                    buttonLabel: "お蕎麦屋さんにしよう",
                    nextSentenceId: "22"
                }
            ],
        },
        reply: "true"
    }
]

const isButtonInit = false
const isReplyInit = false
const isBtnLabelInit_1 = ""
const isBtnLabelInit_2 = ""
const isBtnScenarioIdInit_1 = ""
const isBtnScenarioIdInit_2 = ""

const BottomTab: React.FC = () => {
    const { history } = useReactRouter();
    const classes = useStyles()
    return (

        <div className={classes.bottomTab}>
            <div className={classes.bottomChat}>

                <img src={TabChatOn} />
                <div>
                    チャット
                </div>
            </div>
            <div className={classes.bottomMap} onClick={() => history.push("/map")}>

                <img src={TabMapOff} />
                <div>
                    マップ
                </div>
            </div>
        </div>
    )
}

var btn1: string = ""
const Chat: React.FC = () => {

    const { history } = useReactRouter();
    const classes = useStyles()
    const [jsonData, setJsonData] = useState<JsonData[]>()
    const [scenarioList, setScenarioList] = useState<JsonData[]>()
    const [scenarioLog, setScenarioLog] = useState<LogData[]>()
    const [currentSentenceId, setCurrentSentenceId] = useState(currentSentenceIdInit);
    const [isButton, setIsButton] = useState(isButtonInit)
    const [isReply, setIsReply] = useState(isReplyInit)
    const [btnLabel_1, setBtnLabel_1] = useState(isBtnLabelInit_1)
    const [btnLabel_2, setBtnLabel_2] = useState(isBtnLabelInit_2)
    const [btnScenarioId_1, setBtnScenarioId_1] = useState(isBtnScenarioIdInit_1)
    const [btnScenarioId_2, setBtnScenarioId_2] = useState(isBtnScenarioIdInit_2)
    const [btnText, setBtnText] = useState("")
    const [gender, setGender] = useState("")
    const [reply, setReply] = useState("")
    const isFirstRender = useRef(false)


    const ref = useRef<any>(null)

    useEffect(() => {

        const jwt = JSON.parse(localStorage.getItem('jwt') as string)
        const { Authorization, Accesstoken } = jwt
        const scenarioHistString: string | null = localStorage.getItem('scenarioHist')
        // const scenarioHist: string<{ nextSentenceId: string, personName: string, plane: string }> = localStorage.getItem('scenarioHist')
        // const { personName, plane } = scenarioHist

        console.log(scenarioHistString)



        // console.log("3")
        if (scenarioHistString) {
            console.log("Localstorage")
            const scenarioHist: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(scenarioHistString)
            if (scenarioHist.length > 0) {

                setScenarioLog(scenarioHist)
                setCurrentSentenceId(scenarioHist.slice(-1)[0].nextSentenceId)
                scrollToBottomOfList()
            }
        } else {
            console.log("DB")

            //ログから会話履歴をもってくる

            fetch("https://jtb-prd.two-choices.jp/api/scenario/log/", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authorization,
                    'accesstoken': Accesstoken
                },
            }).then(res => res.json()).then(data => {



                if (data.scenarioHistory.length <= 0) {

                    localStorage.setItem('scenarioHist', JSON.stringify([]))
                    return
                }
                localStorage.setItem('scenarioHist', JSON.stringify(data.scenarioHistory))
                // const scenarioGet: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)
                console.log(data.scenarioHistory)

                // DBから最新のIDをとってくる
                // scenarioGet.slice(-1)[0]
                console.log("休みたい",data.scenarioHistory)
                setScenarioLog(data.scenarioHistory)
                setCurrentSentenceId(data.scenarioHistory.slice(-1)[0].nextSentenceId)
                scrollToBottomOfList()


            })
        }
    }, [])

    useEffect(() => {
        scrollToBottomOfList()
    }, [scenarioList])


    useEffect(() => {
        scrollToBottomOfList()
    }, [scenarioLog])


    const scrollToBottomOfList = React.useCallback(() => {
        ref!.current!.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        })
    }, [ref])

    const selectBtnText = (scenarioId: string, planeMessage: string) => {
        scenarioList && setScenarioList([...scenarioList, {
            sentenceId: "",
            nextSentenceId: scenarioId,
            personName: "主人公",
            sentence: {
                plane: planeMessage,
                button: [
                    {
                        buttonLabel: "",
                        nextSentenceId: ""
                    },
                    {
                        buttonLabel: "",
                        nextSentenceId: ""
                    }
                ]
            },
            reply: "false"
        }])
        setCurrentSentenceId(scenarioId)
        const jwt = JSON.parse(localStorage.getItem('jwt') as string)
        const { Authorization, Accesstoken } = jwt
        fetch("https://jtb-prd.two-choices.jp/api/scenario/log/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authorization,
                'accesstoken': Accesstoken
            },
            // body: JSON.stringify({ scenario: { personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId } })
            body: JSON.stringify({ scenario: { nextSentenceId: scenarioId, personName: "主人公", plane: planeMessage } })
        })
        const tmpArray = JSON.parse(localStorage.getItem('scenarioHist') as string)
        console.log("tmpArray:", tmpArray)
        tmpArray.push({ nextSentenceId: scenarioId, personName: "主人公", plane: planeMessage })
        // localStorage.setItem('scenarioHist', JSON.stringify({ personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId }))
        localStorage.setItem('scenarioHist', JSON.stringify(tmpArray))

        //性別
        // console.log("性別",currentSentenceId)
        if (currentSentenceId === "1") {
            fetch("https://jtb-prd.two-choices.jp/api/user/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authorization,
                    'accesstoken': Accesstoken
                },
                body: JSON.stringify({ gender: planeMessage })
            })
        }
    }


    const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReply(e.target.value)
    }

    const replyText = (id: string, planeMessage: string) => {

        scenarioList && setScenarioList([...scenarioList, {
            sentenceId: "",
            nextSentenceId: "",
            personName: "主人公",
            sentence: {
                plane: planeMessage,
                button: [
                    {
                        buttonLabel: "",
                        nextSentenceId: ""
                    },
                    {
                        buttonLabel: "",
                        nextSentenceId: ""
                    }
                ]
            },
            reply: ""
        }])
        setCurrentSentenceId(id)
        setIsReply(false)
        const jwt = JSON.parse(localStorage.getItem('jwt') as string)
        const { Authorization, Accesstoken } = jwt
        fetch("https://jtb-prd.two-choices.jp/api/scenario/log/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authorization,
                'accesstoken': Accesstoken
            },
            // body: JSON.stringify({ scenario: { personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId } })
            body: JSON.stringify({ scenario: { nextSentenceId: id, personName: "主人公", plane: planeMessage } })
        })
        const tmpArray = JSON.parse(localStorage.getItem('scenarioHist') as string)
        console.log("tmpArray:", tmpArray)
        // tmpArray.push({scenario: { nextSentenceId: id, personName: "主人公", plane: planeMessage } })
        // localStorage.setItem('scenarioHist', JSON.stringify({ personName: scenario.personName, plane: scenario.sentence.plane, nextSentenceId: scenario.nextSentenceId }))
        localStorage.setItem('scenarioHist', JSON.stringify(tmpArray))
        // }).then(res => res.json()).then(console.log)
        // scrollToBottomOfList()


        //名前
        if (currentSentenceId === "1") {
            fetch("https://jtb-prd.two-choices.jp/api/user/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authorization,
                    'accesstoken': Accesstoken
                },
                body: JSON.stringify({ name: planeMessage })
            })
        }
        //年齢
        if (currentSentenceId === "3") {
            fetch("https://jtb-prd.two-choices.jp/api/user/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authorization,
                    'accesstoken': Accesstoken
                },
                body: JSON.stringify({ birth: planeMessage })
            })
        }
    }
    const processScenario = async (btnId: string, btnLabel: string) => {
        // setCurrentSentenceId("0")
        // console.log(jsonDataTest)
        console.log("currentSentenceId",currentSentenceId)
        const jwt = JSON.parse(localStorage.getItem('jwt') as string)
        const { Authorization, Accesstoken } = jwt
        fetch("https://jtb-prd.two-choices.jp/api/user/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authorization,
                'accesstoken': Accesstoken
            },
        }).then(res => res.json()).then(data => {



            if (data.Item.gender === "") {
                console.log("1")

                return
            }
            if (data.Item.gender === undefined) {

                console.log("2")
                return
            }
            // const scenarioGet: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)

            // DBから最新のIDをとってくる
            // scenarioGet.slice(-1)[0]
            setGender(data.Item.gender)

        })
        console.log("gender", gender)
        if (!localStorage.getItem('scenarioHist')) return

        setIsButton(false)
        setIsReply(false)
        if (btnId != "") {
            return
        } else {



            
                jsonDataMale.map((scenario: any) => {
                    //次もってくる文章に合っているものを抽出
                    if (scenario.sentenceId === currentSentenceId) { //Filtterつかえる
                        //上書き
                        scenarioList ? setScenarioList([...scenarioList,
                        { ...scenario }
                        ]) :
                            //新規
                            setScenarioList([
                                { ...scenario }

                            ])
                        console.log("scenario.nextSentenceId", scenario.nextSentenceId)
                        console.log("scenario.sentence.button[0].buttonLabel", scenario.sentence.button[0].buttonLabel)
                        // 現在のnextSentenceIdに値が入っている場合
                        if (scenario.nextSentenceId != "") {
                            setCurrentSentenceId(scenario.nextSentenceId)
                        }
                        //現在のsentenceにボタンが入っている場合
                        if (scenario.sentence.button[0].buttonLabel != "") {
                            setIsButton(true)
                            setBtnScenarioId_1(scenario.sentence.button[0].nextSentenceId)
                            setBtnScenarioId_2(scenario.sentence.button[1].nextSentenceId)
                            setBtnLabel_1(scenario.sentence.button[0].buttonLabel)
                            setBtnLabel_2(scenario.sentence.button[1].buttonLabel)
                        }
                        //返信がテキストで必要な場合
                        if (scenario.reply === "true") {
                            setIsReply(true)
                        }
                        const jwt = JSON.parse(localStorage.getItem('jwt') as string)
                        const { Authorization, Accesstoken } = jwt

                        //今表示したものをDBに入れる
                        fetch("https://jtb-prd.two-choices.jp/api/scenario/log/", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': Authorization,
                                'accesstoken': Accesstoken
                            },
                            body: JSON.stringify({ scenario: { nextSentenceId: currentSentenceId, personName: scenario.personName, plane: scenario.sentence.plane } })
                        })
                        const tmpArray = JSON.parse(localStorage.getItem('scenarioHist') as string)
                        console.log("tmpArray:", tmpArray)
                        tmpArray.push({ nextSentenceId: scenario.nextSentenceId, personName: scenario.personName, plane: scenario.sentence.plane })
                        localStorage.setItem('scenarioHist', JSON.stringify(tmpArray))
                    }
                })
            





            if (currentSentenceId === "1001") {
                history.push(`/summary?messageNum=1`)

            }
            if (currentSentenceId === "1002") {
                history.push(`/summary?messageNum=2`)

            }
            if (currentSentenceId === "1003") {
                history.push(`/summary?messageNum=3`)

            }
            if (currentSentenceId === "1004") {
                history.push(`/summary?messageNum=4`)

            }
        }
    }

    return (
        <div>

            <HeaderChat title="" />

            <div className={classes.chatDesignContainer}>
                <div className={classes.chatDesign}>
                    <div className={classes.chatDesignInner}>
                        {scenarioLog && scenarioLog.map((scenario: any) => scenario.personName == "優花" ?
                            <div className={classes.yukaWrapper}>
                                <div className={classes.yuka_label}>優花</div>

                                <List>
                                    <ListItemAvatar>
                                        <Avatar alt="icon" src={userIcon} />
                                    </ListItemAvatar>
                                    <ListItem className={classes.yuka}>{scenario.plane}</ListItem>
                                </List>
                            </div>
                            : scenario.personName == "主人公" ?
                                <div className={classes.syujiinkoWrapper}>
                                    <List>
                                        <ListItem className={classes.syujiinko}>{scenario.plane}</ListItem>
                                    </List>
                                </div>
                                :
                                <div>
                                    <List>
                                        <ListItem className={classes.narrator}>{scenario.plane}</ListItem>
                                    </List>
                                </div>
                        )}
                        {scenarioList && scenarioList.map((scenario: any) => scenario.personName == "優花" ?
                            <div className={classes.yukaWrapper}>
                                <div className={classes.yuka_label}>優花</div>

                                <List>
                                    <ListItemAvatar>
                                        <Avatar alt="icon" src={userIcon} />
                                    </ListItemAvatar>
                                    <ListItem className={classes.yuka}>{scenario.sentence.plane}</ListItem>
                                </List>
                            </div>
                            : scenario.personName == "主人公" ?
                                <div className={classes.syujiinkoWrapper}>
                                    <List>
                                        <ListItem className={classes.syujiinko}>{scenario.sentence.plane}</ListItem>
                                    </List>
                                </div>
                                :
                                <div>
                                    <List>
                                        <ListItem className={classes.narrator}>{scenario.sentence.plane}</ListItem>
                                    </List>
                                </div>
                        )}




                        <div id="bottom-of-list" ref={ref} />
                    </div>
                    {isButton == true ?
                        <div className={classes.selectButton}>
                            <Grid container justify="center" alignItems="center" spacing={0}>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        disableElevation
                                        onClick={() => {
                                            selectBtnText(btnScenarioId_1, btnLabel_1)
                                            processScenario(btnScenarioId_1, btnLabel_1)
                                        }}
                                    >
                                        {btnLabel_1}
                                    </Button>

                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        disableElevation
                                        onClick={() => {
                                            selectBtnText(btnScenarioId_2, btnLabel_2)
                                            processScenario(btnScenarioId_2, btnLabel_2)
                                        }}
                                    >
                                        {btnLabel_2}
                                    </Button>

                                </Grid>
                            </Grid>
                            {/* <button onClick={() => {
                            selectBtnText(btnScenarioId_1, btnLabel_1)
                            processScenario(btnScenarioId_1, btnLabel_1)
                        }}>{btnLabel_1}</button>
                        <button onClick={() => {
                            selectBtnText(btnScenarioId_2, btnLabel_2)
                            processScenario(btnScenarioId_2, btnLabel_2)
                        }}>{btnLabel_2}</button> */}
                        </div>

                        // <button className={classes.buttonDesign} onClick={() => { processScenario("", "") }}>↑</button>
                        : isReply == true ?
                            <div className={classes.selectButton}>
                                <div className={classes.sendButtonContainer}>
                                    <div className={classes.sendButtonWrapper}>
                                        <InputBase
                                            className={classes.input}
                                            placeholder="入力してください"
                                            inputProps={{ 'aria-label': 'search google maps' }}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                handleReplyChange(e)}
                                        />
                                        <IconButton
                                            type="submit"
                                            className={classes.iconButton}
                                            aria-label="search"
                                            onClick={() => replyText(currentSentenceId, reply)}
                                        >
                                            <ForwardIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                {/*<Grid container justify="center" alignItems="center">*/}
                                {/*<Grid item xs={10} className={classes.sendButtonWrapper}>*/}
                                {/*<TextField id="standard-basic" label="入力してください" onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
                                {/*    handleReplyChange(e)*/}
                                {/*} />*/}
                                {/*</Grid>*/}
                                {/*<Grid item xs={3}>*/}
                                {/*    <div className={classes.sendButtonWrapper}>*/}
                                {/*        <Button*/}
                                {/*            variant="contained"*/}
                                {/*            disableElevation*/}
                                {/*            onClick={() => replyText(currentSentenceId, reply)}*/}
                                {/*        >*/}
                                {/*            送信*/}
                                {/*        </Button>*/}
                                {/*</Grid>*/}
                                {/*</Grid>*/}
                                {/* <input
                                id="replyText"
                                type="input"
                                name="reply"
                                placeholder="ここに入力して送信ボタンを押してください"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleReplyChange(e)
                                }
                            /> */}
                                {/* <button onClick={() => {
                                replyText(currentSentenceId, reply)
                                // processScenario(btnScenarioId_1, "0")
                            }}>送信</button> */}
                            </div>
                            : currentSentenceId === "5" ? //東京
                                <div className={classes.mapLabel}>
                                    目的地に到着したら下のマップページでチェックインしてシナリオを進めましょう
                                </div>

                            : currentSentenceId === "68" ?//大谷資料館
                                <div className={classes.mapLabel}>
                                    目的地に到着したら下のマップページでチェックインしてシナリオを進めましょう
                            </div>
                                : currentSentenceId === "125" ?//クーリ・ルージュ
                                    <div className={classes.mapLabel}>
                                        目的地に到着したら下のマップページでチェックインしてシナリオを進めましょう
                            </div>

                                    : currentSentenceId === "165" ?//若竹
                                        <div className={classes.mapLabel}>
                                            目的地に到着したら下のマップページでチェックインしてシナリオを進めましょう
                              </div>

                                        : currentSentenceId === "216" ?//二荒山神社これ
                                            <div className={classes.mapLabel}>
                                                目的地に到着したら下のマップページでチェックインしてシナリオを進めましょう
                              </div>

                                            : currentSentenceId === "308" ?//宇都宮タワー
                                                <div className={classes.mapLabel}>
                                                    目的地に到着したら下のマップページでチェックインしてシナリオを進めましょう
                              </div>

                                                : currentSentenceId === "410" ?//動物園
                                                    <div className={classes.mapLabel}>
                                                        目的地に到着したら下のマップページでチェックインしてシナリオを進めましょう
                              </div>

                                                    : currentSentenceId === "464" ?//クラッセ
                                                        <div className={classes.mapLabel}>
                                                            目的地に到着したら下のマップページでチェックインしてシナリオを進めましょう
                              </div>
                                                        : currentSentenceId === "546" ?//SELECT
                                                            <div className={classes.mapLabel}>
                                                                目的地に到着したら下のマップページでチェックインしてシナリオを進めましょう
                              </div>
                                                            : currentSentenceId === "625" ?//最上
                                                                <div className={classes.mapLabel}>
                                                                    目的地に到着したら下のマップページでチェックインしてシナリオを進めましょう
                              </div>
                                                                : currentSentenceId === "672" ?//森林公園
                                                                    <div className={classes.mapLabel}>
                                                                        目的地に到着したら下のマップページでチェックインしてシナリオを進めましょう
                              </div>
                                                                    : currentSentenceId === "730" ?//森林公園
                                                                        <div className={classes.mapLabel}>
                                                                            目的地に到着したら下のマップページでチェックインしてシナリオを進めましょう
                              </div>


                                                                        :
                                                                        <img className={classes.buttonDesign} src={Tap} onClick={() => { processScenario("", "") }} />
                        // <button className={classes.buttonDesign} onClick={() => { processScenario("", "") }}>↑</button>

                    }
                    <BottomTab />
                    {/* <Footer /> */}
                </div>
            </div>
        </div>
    )
}



export default Chat;
