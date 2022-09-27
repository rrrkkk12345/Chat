import React, { useState } from 'react';
import useReactRouter from 'use-react-router';
import { useDispatch } from "react-redux";
import pageActionModule, { usePageAction } from "../modules/pageActionModule";
import { login } from '../modules/api';
import commonStyle from './accountCommon.module.css';
import { Typography, makeStyles, TextField, Grid, Box, Button } from '@material-ui/core'
const Frame = require('../assets/decorativeframe2.png');
const baseFontColor = '#4575b4';
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
  },
  loginButtonWrapper: {
    marginBottom: '1rem',
    position: 'relative',
    width: '100%',
    '& .MuiButton-disableElevation': {
      width: '100%',
      height: '50px',
      backgroundColor: baseFontColor,
      fontWeight: 'bold',
      fontSize: '17px',
      color: '#ffffff',
      borderRadius: 8,
    },
  },
})

const PasswordChange: React.FC = () => {
  const classes = useStyles()
  const title = "選択式ミステリー旅行"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [previousPassword, setPreviousPassword] = useState('');
  const [proposePassword, setProposePassword] = useState('');
  const { history } = useReactRouter();
  const dispatch = useDispatch();
  const [securityCode, setSecurityCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const jwt = JSON.parse(localStorage.getItem('jwt') as string)
  const { Authorization, Accesstoken } = jwt

  const passwordChange = async (event: React.MouseEvent<HTMLElement>) => {
    // console.log(localStorage.getItem('jwt'))
    if (previousPassword && proposePassword) {
      fetch("https://jtb-prd.two-choices.jp/api/change_password/", {//非同期処理
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Authorization,
          'accesstoken': Accesstoken
        },
        body: JSON.stringify({ previousPassword: previousPassword, proposePassword: proposePassword })

      }).then(async (res: any) => {
        if (res.status === 200) {
          // console.log(res.status, typeof res.status)
          window.alert("パスワード変更完了しました。次回ログイン時は新規パスワードをご利用ください。")
          history.push('/tutorial')
        } else {

          setErrorMessage('通信でエラーが発生しました')
        }

      })
        .catch(error => { if (error.statusCode >= 400) setErrorMessage('通信でエラーが発生しました') })//同期処理


    } else {
      setErrorMessage('新旧パスワードを入力してください');
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
                    type="password"
                    // name="oldPassword"
                    placeholder="旧パスワードを入力"
                    // value={oldPassword}
                    onChange={(e) => setPreviousPassword(e.target.value)}
                  />
                </p>

                <p>
                  <input
                    type="password"
                    // name="newPassword"
                    placeholder="新パスワードを入力"
                    // value={newPassword}
                    onChange={(e) => setProposePassword(e.target.value)}
                  />
                </p>
              </div>
              <p>※8文字以上。大文字・小文字英数字・記号を１つ以上</p>
            </form>
            <div className={classes.loginButtonWrapper}>
              <button
                className={commonStyle.accountFormButton}
                onClick={(e) => passwordChange(e)}
              >変更する
                </button>

            </div>
            {/* <span
                // className={`${commonStyle.accountFormButtonLink} ${hover? commonStyle.buttonLinkHover: ""}`}
                // onMouseEnter={() => setHover(true)}
                // onMouseLeave={() => setHover(false)}
                >
                  変更する
                    </span> */}
          </div>
        </div>
      </div>
    </div>
    // <div className={classes.center_wrapper}>
    //   {/* <p className={classes.title}>{title}</p> */}
    //   <p className={classes.title}>パスワードを変更してください</p>
    //   <div className={classes.buttonDesign}>
    //     {/* <input
    //       type="password"
    //       name="oldPassword"
    //       placeholder="旧パスワードを入力"
    //     // value={oldPassword}
    //     // onChange={e => setOldPassword(e.target.value)}
    //     /> */}
    //     <div></div>
    //     <form  noValidate autoComplete="off">
    //       <TextField 
    //       id="standard-basic" 
    //       label="旧パスワードを入力" 
    //       type="password"
    //       fullWidth
    //       onChange={e => setPreviousPassword(e.target.value)}
    //       />
    //       <div></div>
    //        <TextField 
    //       id="standard-basic" 
    //       label="新パスワードを入力（確認用）" 
    //       type="password"
    //       fullWidth
    //       onChange={e => setProposePassword(e.target.value)}
    //       />
    //     </form>
    //     {/* <input
    //       type="password"
    //       name="newPassword"
    //       placeholder="新パスワードを入力"
    //       // value={newPassword}
    //       onChange={e => setPreviousPassword(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       name="newPassworVerify"
    //       placeholder="新パスワードを入力（確認用）"
    //       // value={newPassworVerify}
    //       onChange={e => setProposePassword(e.target.value)}
    //     /> */}
    //     <div></div>
    //     <button
    //       onClick={(e) => passwordChange(e)}
    //     >
    //       送信
    //     </button>

    //   </div>
    //   <div></div>
    //   8文字以上。大文字・小文字英数字・記号を１つ以上
    //   <div className={classes.startText}> パスワードをお忘れの方はこちらにメールアドレスを入力し、送信ボタンを押してください</div>

    // </div>
  )
}


export default PasswordChange;