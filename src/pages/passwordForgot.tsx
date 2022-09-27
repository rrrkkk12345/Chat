import React, { useState } from 'react';
import useReactRouter from 'use-react-router';
import { useDispatch } from "react-redux";
import pageActionModule, { usePageAction } from "../modules/pageActionModule";
import { login } from '../modules/api';
import { Typography, makeStyles, TextField, Grid, Box, Button } from '@material-ui/core'
import commonStyle from './accountCommon.module.css';
const Frame = require('../assets/decorativeframe2.png');

const useStyles = makeStyles({
  startText: {
    // borderBottom: "1px solid #4575B4",
    backgroundColor: "#EFEDE9",
    fontSize: "15px",
    color: "#4575B4",
    width: "60%",
    height: "5%",
    marginTop: "-70%",
    marginLeft: "20%",
    zIndex: 2,
    position: 'absolute',
    // letterSpacing: "6px",
    fontFamily: "メイリオ",
    textAlign: "center",
    // lineHeight: "50px",
    paddingBottom: "1px",
  },
  buttonDesign: {
    // borderBottom: "1px solid #4575B4",
    backgroundColor: "#EFEDE9",
    fontSize: "15px",
    color: "#4575B4",
    width: "60%",
    height: "5%",
    marginTop: "20%",
    marginLeft: "20%",
    zIndex: 2,
    position: 'absolute',
    // letterSpacing: "6px",
    fontFamily: "メイリオ",
    textAlign: "center",
    // lineHeight: "50px",
    paddingBottom: "1px",
  },
  toStart: {
    color: 'blue',
    zIndex: 2,
    borderBottom: '1px solid blue'
  },
  title: {
    textAlign: 'center',
    zIndex: 2,
    alignItems: 'top'
  },
  border: {
    marginLeft: 125,
    textAlign: 'center',
    border: '1px solid',
    borderColor: 'blue',
    zIndex: 2,
  },
  center_wrapper: {
    zIndex: 2,
    textAlign: 'center',
  },
  frameDesign: {
    zIndex: 500,
    width: "90%",
    height: "70%",
    display: 'flex',
    alignItems: 'top',//縦
    marginTop: "10%",
    justifyContent: 'center',
    marginLeft: '3%',
    padding: 10,
  }
})

const PasswordForgot: React.FC = () => {
  const classes = useStyles()
  const title = "選択式ミステリー旅行"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { history } = useReactRouter();
  const dispatch = useDispatch();
  const [securityCode, setSecurityCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const resetPassword = async (event: React.MouseEvent<HTMLElement>) => {
    if (email) {
      fetch("https://jtb-prd.two-choices.jp/api/reset/", {//非同期処理
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email })

      }).then(async (res: any) => {
        if (res.status === 200) {

          alert("入力されたメールアドレス宛に検証コードをお送りしました。このコードでパスワードを再設定してください")
          history.push('/passwordConfirm')
        } else {

          setErrorMessage('通信でエラーが発生しました')
        }

      })
        .catch(error => { if (error.statusCode >= 400) setErrorMessage('通信でエラーが発生しました') })//同期処理


    } else {
      setErrorMessage('メールアドレスを入力してください');
    }

  }

  return (
    <div className={commonStyle.accountFormInner}>
      <div className={commonStyle.accountFormMain}>
        <div className={commonStyle.accountFormWrapper}>
          <div className={commonStyle.accountFormCardContainer}>
            <h1 className={commonStyle.accountFormTitle}>
              パスワード変更
                </h1>
            {errorMessage ? <p className={commonStyle.accountFormError}>{errorMessage}</p> : null}
            <form className={commonStyle.accountForm}>
              <div className={commonStyle.accountFormContent}>

                <p>
                  <input
                    type="text"
                    name="email"
                    placeholder="メールアドレスを入力"
                    // value={newPassword}
                    onChange={e => setEmail(e.target.value)}
                  />
                </p>
              </div>
              {/* <p>※8文字以上。大文字・小文字英数字・記号を１つ以上</p> */}
            </form>
            <div>
              <button
                className={commonStyle.accountFormButton}
                onClick={e => resetPassword(e)}
              >送信する
                </button>

            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className={classes.center_wrapper}>
    //   {/* <p className={classes.title}>{title}</p> */}
    //   <h3>パスワードをお忘れの方はこちらにメールアドレスを入力し、送信ボタンを押してください</h3>
    //   {/* <div className={classes.buttonDesign}> */}
    //   <TextField
    //     id="standard-basic"
    //     label="メールアドレス"
    //     type="text"
    //     onChange={e => setEmail(e.target.value)}
    //   />
    //   <div></div>
    //   <div></div>
    //   <button
    //     onClick={(e) => resetPassword(e)}
    //   >
    //     送信
    //     </button>

    //   {/* </div> */}
    //   <div></div>
    //   <div className={classes.startText}> パスワードをお忘れの方はこちらにメールアドレスを入力し、送信ボタンを押してください</div>

    // </div>
  )
}


export default PasswordForgot;