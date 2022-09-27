import React from 'react'
import ReactDOM from 'react-dom'
import useReactRouter from 'use-react-router';
import { NextButton } from '../components/atoms/buttons';
import customButton from '../components/atoms/customButton.module.css';
import { Typography, makeStyles, Grid, Box, Button } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
const Frame = require('../assets/decorativeframe.png');

const useStyles = makeStyles({
    startText: {
        color: '#4575B4',
        fontFamily: 'HiraMinPro-W6',
        fontSize: '17px',
        letterSpacing:'5px',
        position: 'absolute',
        // bottom: '85px',
        bottom: '12%',
        '& a': {
            textDecoration: 'underline',
            textUnderlinePosition: 'under',
            '& .MuiSvgIcon-root': {
                fontSize: '1rem',
            }
        }
    },
    frameDesign: {
        zIndex: 1,
        width: "90%",
        height: "85%",
        display: 'flex',
        alignItems: 'top',//縦
        marginTop: "10%",
        justifyContent: 'center',
        marginLeft: '3%',
        padding: 10,
    },

    topPageContainer: {
        // padding: '1rem',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.625rem',
    },

    topPageOutFrame: {
        display: 'flex',
        padding: '0.625rem',
        width: '100%',
        height: '100%',
        maxWidth: '350px',
        maxHeight: '724px',
        border: 'solid 2px #4575b4',
        borderRadius: 12,
    },

    topPageInnerFrame: {
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0.625rem',
        width: '100%',
        height: '100%',
        maxHeight: 'calc(100vh - 1.3rem)',
        border: 'solid 1px #4575b4',
        borderRadius: 5,
    },
    topPageTitle: {
        position: 'absolute',
        // top: '10.3125rem',
        top: '24%',
        fontFamily: 'HiraMinPro-W6',
        color: '#4575b4',
        fontSize: '17px',
        letterSpacing: '5px',
    },
    topPageSubTitle: {
        position: 'absolute',
        top: '42%',
        // marginTop: '6.625rem',
        fontFamily: 'HiraMinPro-W6',
        color: '#4575b4',
        fontSize: '15px',
        letterSpacing: '4.41px',
        textAlign: 'center',
    },
    topPagePresents: {
        fontFamily: 'HiraMinPro-W6',
        fontSize: '12px',
        letterSpacing: '3.53px',
    },
})

const WelcomePage: React.FC = () => {
    const classes = useStyles()
    const title = "リアルノベル"
    const companyTitle = "PERSOL"
    const subTitle = "PRESENTS"
    const { history } = useReactRouter();
    return (
        <div className={classes.topPageContainer}>
            {/* <button className={customButton.selectButton} onClick={() => history.push('/map')}>map</button> */}
            <div className={classes.topPageOutFrame}>
                <div className={classes.topPageInnerFrame}>
                    <div className={classes.topPageTitle}>
                        <p>{title}</p>
                    </div>
                    <div className={classes.topPageSubTitle}>
                        <p>{companyTitle}</p>
                        <p className={classes.topPagePresents}>{subTitle}</p>
                    </div>
                    {/*<img src={Frame} className={classes.frameDesign} />*/}
                    <div  className={classes.startText}>
                        <a onClick={() => history.push('/login')}>いますぐ始める<ArrowForwardIcon/></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage;
