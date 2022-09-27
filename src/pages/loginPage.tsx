import React, { useState } from 'react';
import useReactRouter from 'use-react-router';
import { makeStyles, Button, Theme, createStyles, TextField } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";

const baseFontColor = '#4575b4';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topPageContainer: {
      color: baseFontColor,
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        alignItems: 'baseline',
      },
      padding: '0.625rem',
    },

    topPageOutFrame: {
      display: 'flex',
      padding: '0.625rem',
      width: '100%',
      height: '100%',
      maxWidth: '350px',
      maxHeight: '475px',
      border: 'solid 2px #4575b4',
      borderRadius: 12,
    },

    topPageInnerFrame: {
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0.8125rem',
      width: '100%',
      height: '100%',
      maxHeight: 'calc(100vh - 1.3rem)',
      border: 'solid 1px #4575b4',
      borderRadius: 5,
    },

    topPageTitle: {
      marginTop: '1.6rem',
      fontFamily: 'HiraMinPro-W6',
      fontSize: '17px',
      letterSpacing: '5px',
    },

    topPageSubTitle: {
      margin: '0.8rem',
      fontFamily: 'HiraMinPro-W6',
      fontSize: '15px',
      letterSpacing: '4.41px',
      textAlign: 'center',
    },

    topPagePresents: {
      fontFamily: 'HiraMinPro-W6',
      fontSize: '12px',
      letterSpacing: '3.53px',
    },

    errorInfo: {
      color: baseFontColor,
      fontWeight: 'bold',
      fontSize: '14px',
      letterSpacing: '-0.32px',
      textAlign: 'center',
    },

    formInputWrapper: {
      position: 'relative',
      width: '100%',
      margin: '0.4rem',
      '& input[type="text"]': {
        width: '100%',
        padding: '0.3rem 0.8rem',
        transition: '0.3s',
        letterSpacing: '1px',
        color: `${baseFontColor} !important`,
        border: '1px solid #4575B4',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        backgroundColor: '#eeede9 !important',
        height: '44px',
      },

      '& input[type="password"]': {
        width: '100%',
        padding: '0.3rem 0.8rem',
        transition: '0.3s',
        letterSpacing: '1px',
        color: `${baseFontColor} !important`,
        border: '1px solid #4575B4',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        backgroundColor: '#eeede9 !important',
        height: '44px',
      },
    },

    formInputBox: {
      '& input[type="text"]:focus': {
        outline: 'none',
        boxShadow: '0 0 5px 1px rgb(118 158 247 / 50%)',
      }
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

    checkLabel: {
      margin: '0.5rem auto',
      '& .MuiFormControlLabel-root': {
        marginRight: '0.1rem',
        color: baseFontColor,
      },
      '& .MuiTypography-body1': {
        fontSize: '14px',
      },
      '& .MuiCheckbox-colorPrimary.Mui-checked': {
        color: baseFontColor,
      },
    },

    loginButtonDisable: {
      opacity: 0.5,
    },

    startText: {
      color: baseFontColor,
      fontSize: '14px',
      letterSpacing: '-0.32px',
      textAlign: 'center',
      '& a': {
        textDecoration: 'underline',
        textUnderlinePosition: 'under',
        cursor: 'pointer',
        '& .MuiSvgIcon-root': {
          fontSize: '1rem',
        }
      }
    },
  })
);

const LoginPage: React.FC = () => {
  const classes = useStyles()
  const title = "リアルノベル";
  const companyTitle = "PERSOL";
  const subTitle = "PRESENTS";
  const privacyText = "利用者の個人情報を本サービスために利用すること、および個人情報の取り扱いについて同意する";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { history } = useReactRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const userLogin = async (event: React.MouseEvent<HTMLElement>) => {

    if (isChecked === false) {
      setErrorMessage('チェックを入れてください');
      return
    }


    if (email && password) {
      fetch("https://jtb-prd.two-choices.jp/api/login", {//非同期処理
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: email, password: password })

      }).then(async (res: any) => {
        if (res.status < 400) {
          const result = await res.json()

          if (result.isChanged) {

            localStorage.setItem('jwt', JSON.stringify(result))
            history.push('/tutorial')
          } else {
            localStorage.setItem('jwt', JSON.stringify(result))
            history.push('/password-change')
          }

        } else {

          console.log(res)
          setErrorMessage('通信でエラーが発生しました')
        }

      })
        .catch(error => { if (error.status >= 400) setErrorMessage('通信でエラーが発生しました') })//同期処理


    } else {
      setErrorMessage('メールアドレス、パスワードを入力してください');
    }
  }

  return (

    <div className={classes.topPageContainer}>
       
      <div className={classes.topPageOutFrame}>
        <div className={classes.topPageInnerFrame}>

          <div className={classes.topPageTitle}>
            <p>{title}</p>
          </div>
          <div className={classes.topPageSubTitle}>
            <p>{companyTitle}</p>
            <p className={classes.topPagePresents}>{subTitle}</p>
          </div>
          <div className={classes.formInputWrapper}>
            <form className={classes.formInputBox}>
              <input
                type="text"
                name="email"
                placeholder="メールアドレスを入力"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="パスワードを入力"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </form>
          </div>
          <div className={classes.checkLabel}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label={privacyText}
            />
          </div>
          <div className={classes.loginButtonWrapper}>
            <Button className={!isChecked ? classes.loginButtonDisable : ''}
              variant="contained"
              disableElevation
              disabled={!isChecked}
              onClick={(e) => userLogin(e)}
            >
              ログイン
            </Button>
          </div>
          <div className={classes.errorInfo}>
            <p>{errorMessage}</p>
          </div>
          <div className={classes.startText}>
            <a onClick={() => history.push('/password-reset')}>パスワードを忘れた方はこちら</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
