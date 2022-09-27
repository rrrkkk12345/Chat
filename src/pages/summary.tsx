import React, { useEffect, useState } from 'react'
import useReactRouter from 'use-react-router';
import Header from './header';
import HeaderChat from './headerChat';
import { Typography, makeStyles, Grid, Box, Button, ListItemAvatar, Avatar, List } from '@material-ui/core'
import classes from '*.module.css'
const scenarioLeft = require('../assets/scenarioLeft.png');
const scenarioRight = require('../assets/scenarioRight.png');
const baseBackGroundColor = '#4575b4';
const useStyles = makeStyles((theme) => ({
    wingWrapper: {
        position: 'relative',
        height: '116px',
        width: '65px',
    },
    leftWing: {
        position: "absolute",
        left: "10px"
    },
    rightWing: {
        position: "absolute",
        right: "10px"
    },
    textProp: {
        color: "#B79433",
        fontSize: '0.5rem',
        '& p:last-child': {
            fontSize: '34px',
            fontWeight: 'bold',
        },
        // position: "absolute",
        fontFamily: 'Hira Min Pro',
        textAlign: "center",
        // letterSpacing: "6px",
        // lineHeight: "40px",

    },
    buttonProp: {
        left: "40%",
        top: "50%",
        color: "#4575B4",
        fontSize: 15,
        position: "absolute",
        fontFamily: 'Hira Min Pro',
        textAlign: "center",
        letterSpacing: "6px",
        lineHeight: "40px",
    },
    wingImageTitleBlock: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '70px',
    },
    imageTitleBlock: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: '1px solid #CBCBCB',
    },
    summaryContentsWrapper: {
        padding: '0 1rem 3rem',
    },
    summaryContentsBlock: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        margin: '30px 0 100px',
        flexDirection: 'column',
        alignItems: 'center',
    },
    summaryContents: {
        width: '100%',
        maxWidth: '350px',
        height: 'auto',
        padding: '20px 27px',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
    },
    rectangle: {
        width: '100%',
        // maxWidth: '350px',
        height: '102px',
        bottom: '0px',
        position: 'fixed',
        padding: '3px 0 40px',
        zIndex: 101,
        backgroundColor: 'rgb(238, 237, 234)',
    },
    toolbarButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    toolbarButtonWrapper: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: '102px',
        padding: '0.75rem 1.4375rem',
        '& .MuiButton-disableElevation': {
            width: '100%',
            maxWidth: '304px',
            height: '50px',
            backgroundColor: baseBackGroundColor,
            fontWeight: 'bold',
            fontSize: '17px',
            color: '#ffffff',
            borderRadius: 8,
        },
        boxShadow: '0px -8px 11px -4px rgba(0, 0, 0, 0.2)',
    },
}))
const Summary: React.FC = () => {
    const args = new URL(document.URL);
    const messageNum = args.searchParams.get('messageNum');
    console.log(messageNum)

    const [message, setMessage] = useState();
    const { history } = useReactRouter();
    const classes = useStyles();

    useEffect(() => {
        const jwt = JSON.parse(localStorage.getItem('jwt') as string)
        const { Authorization, Accesstoken } = jwt
        // const scenarioHist: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)

        const scenarioHistString: string | null = localStorage.getItem('scenarioHist')
        // const scenarioHist: string<{ nextSentenceId: string, personName: string, plane: string }> = localStorage.getItem('scenarioHist')
        // const { personName, plane } = scenarioHist

        console.log(scenarioHistString)
        if (scenarioHistString) {
            console.log("Localstorage")
            const scenarioHist: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(scenarioHistString)
            if (scenarioHist.length > 0) {
            }

        } else {
            console.log("DB")

            //id削除
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
                const localHistory = localStorage.setItem('scenarioHist', JSON.stringify(data.ScenarioHistory))
                const scenarioGet: Array<{ nextSentenceId: string, personName: string, plane: string }> = JSON.parse(localStorage.getItem('scenarioHist') as string)
                console.log(scenarioGet)
            })
        }
    }, [])

    return (
        <div>
            <HeaderChat title="" />

            {messageNum && messageNum === "1" ?
                <div className={classes.summaryContentsWrapper}>
                    <div className={classes.wingImageTitleBlock}>
                        <div className={classes.wingWrapper}>
                            <img className={classes.leftWing} src={scenarioLeft} />
                        </div>
                        <div className={classes.textProp}>
                            <p>あなたがたどったシナリオは</p>
                            <p>結婚<br />シナリオ</p>
                        </div>
                        <div className={classes.wingWrapper}>
                            <img className={classes.rightWing} src={scenarioRight} />
                        </div>
                    </div>
                    <div className={classes.summaryContentsBlock}>
                        <div className={classes.summaryContents}>
                            <p>
                                優花の抱いていた悪い想像とは真反対のハッピーエンドを迎えられました。優花の彼氏の目的は、なんとプロポーズをする前に、二人の思い出の地で結婚式場の下見をするというもの！　彼氏の、愛情あふれる小粋なはからいに、優花は安心を通り越して大感動。本人の言葉にもあるように、ひとりで考えているだけでは、つい悪いほうへと物事を考えがちになってしまい、肝心の真実は見えにくくなるのかもしれません。優花に目的を打ち明けたときの彼氏の心境は……想像するだけでも微笑ましくなりますね。
                    </p>
                        </div>
                    </div>
                    <div className={classes.toolbarButtonContainer}>
                        <div className={classes.rectangle}>
                            <div className={classes.toolbarButtonWrapper}>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    onClick={() => history.push("/welcome")}
                                >
                                    旅行終了
                        </Button>
                            </div>
                        </div>
                    </div>
                </div>
                : null
            }

            {messageNum && messageNum === "2" ?
                <div className={classes.summaryContentsWrapper}>
                    <div className={classes.wingImageTitleBlock}>
                        <div className={classes.wingWrapper}>
                            <img className={classes.leftWing} src={scenarioLeft} />
                        </div>
                        <div className={classes.textProp}>
                            <p>あなたがたどったシナリオは</p>
                            <p>記念日<br />シナリオ</p>
                        </div>
                        <div className={classes.wingWrapper}>
                            <img className={classes.rightWing} src={scenarioRight} />
                        </div>
                    </div>
                    <div className={classes.summaryContentsBlock}>
                        <div className={classes.summaryContents}>
                            <p>
                            優花とあなたを待っていたのは、彼氏の愛情ゆえのサプライズ記念日計画でした。サプライズを事前に知ってしまったときは、申し訳ない気持ちになりますが、相手が自分のことに時間も労力も使ってくれているわけなので、とても嬉しくもあるものです。お互いに気にかけあえる存在がいるというのは、幸せなことですね。プチハッピーエンドともいえるこの結末から、彼氏の優花への思いがよく伝わってきます。彼氏は次にどんな計画を立てるのでしょうか？　もしかしたら、またあなたにお声がかかるかも！
                    </p>
                        </div>
                    </div>
                    <div className={classes.toolbarButtonContainer}>
                        <div className={classes.rectangle}>
                            <div className={classes.toolbarButtonWrapper}>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    onClick={() => history.push("/welcome")}
                                >
                                    旅行終了
                        </Button>
                            </div>
                        </div>
                    </div>
                </div>
                : null
            }
            {messageNum && messageNum === "3" ?
                <div className={classes.summaryContentsWrapper}>
                    <div className={classes.wingImageTitleBlock}>
                        <div className={classes.wingWrapper}>
                            <img className={classes.leftWing} src={scenarioLeft} />
                        </div>
                        <div className={classes.textProp}>
                            <p>あなたがたどったシナリオは</p>
                            <p>大誤解<br />シナリオ</p>
                        </div>
                        <div className={classes.wingWrapper}>
                            <img className={classes.rightWing} src={scenarioRight} />
                        </div>
                    </div>
                    <div className={classes.summaryContentsBlock}>
                        <div className={classes.summaryContents}>
                            <p>
                            まさかまさかの兄妹の関係！　女性というだけで悪い方向へととらえて暴走してしまった優花は、顔から火が出るほど恥ずかしい思いをしたことでしょう。彼氏から真実を聞かされたときの優花の顔が目に浮かぶようですね。もっとも、誰でも思い込んでしまって、視野が狭くなるということはあるものです。いろんな可能性を考える余裕があれば、優花みたいに早とちりしてしまうことはないのでしょうが……。でも、それだけ思い詰めるのも、ある意味で愛情の証。優花のことを責めないであげてくださいね。
                    </p>
                        </div>
                    </div>
                    <div className={classes.toolbarButtonContainer}>
                        <div className={classes.rectangle}>
                            <div className={classes.toolbarButtonWrapper}>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    onClick={() => history.push("/welcome")}
                                >
                                    旅行終了
                        </Button>
                            </div>
                        </div>
                    </div>
                </div>
                : null
            }
            {messageNum && messageNum === "4" ?
                <div className={classes.summaryContentsWrapper}>
                    <div className={classes.wingImageTitleBlock}>
                        <div className={classes.wingWrapper}>
                            <img className={classes.leftWing} src={scenarioLeft} />
                        </div>
                        <div className={classes.textProp}>
                            <p>あなたがたどったシナリオは</p>
                            <p>二重追跡<br />シナリオ</p>
                        </div>
                        <div className={classes.wingWrapper}>
                            <img className={classes.rightWing} src={scenarioRight} />
                        </div>
                    </div>
                    <div className={classes.summaryContentsBlock}>
                        <div className={classes.summaryContents}>
                            <p>
                            優花とあなたの眼前で起こったのは、ちょっぴりミステリアスな二重の追跡物語。あなたが頼まれていたこととまったく同じことを、優花の彼氏も頼まれてやっていた……。あなたも彼氏も、いい意味でおせっかいを焼きあう形になりました。でも、大事な友人が困っていたら、つい手を貸してあげてしまう2人の優しさに、優花も優花の友達も惹かれているはずです。ハッピーエンドというよりは、思わずコケてしまいそうなオチでしたが、友情の証というものを見ることができたエピソードでした。
                    </p>
                        </div>
                    </div>
                    <div className={classes.toolbarButtonContainer}>
                        <div className={classes.rectangle}>
                            <div className={classes.toolbarButtonWrapper}>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    onClick={() => history.push("/welcome")}
                                >
                                    旅行終了
                        </Button>
                            </div>
                        </div>
                    </div>
                </div>
                : null
            }

        </div>

    )
}
export default Summary
