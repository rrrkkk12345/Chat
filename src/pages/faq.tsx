import React, { useState } from 'react';
import useReactRouter from 'use-react-router';
import HeaderChat from './headerChat';
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const limitWidth = '390px';
const headerHeight = '44px';
const marginTopHeight = '30px';
const rowMinHeight = '63px';
const rowRadius = '8px';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    faqListContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: `calc(100vh - ${headerHeight})`,
    },
    faqListWrapper: {
      width: '100%',
      maxWidth: limitWidth,
      position: 'relative',
      marginTop: marginTopHeight,
      padding: '0 1rem',
      '& .MuiAccordionSummary-root': {
        minHeight: rowMinHeight,
      },
      '& .MuiAccordion-rounded:first-child': {
        borderTopLeftRadius: rowRadius,
        borderTopRightRadius: rowRadius,
        borderBottom: '1px solid #c1c1c1',
      },
      '& .MuiAccordion-rounded:last-child': {
        borderBottomLeftRadius: rowRadius,
        borderBottomRightRadius: rowRadius,
        borderBottom: 'unset',
      },
      '& .MuiAccordionSummary-content': {
        margin: '0',
        fontSize: '14px',
      },
      '& .MuiAccordion-root.Mui-expanded': {
        margin: '0',
      },
      '& .MuiAccordionSummary-expandIcon': {
        transform: 'rotate(-90deg)',
      },
      '& .MuiAccordionSummary-expandIcon.Mui-expanded': {
        transform: 'rotate(0deg)',
      },
      '& .MuiAccordionDetails-root p': {
        fontSize: '12px',
      },
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    headerChartBlock: {
      height: headerHeight,
      position: 'relative',
    },
  }),
);
const FAQ: React.FC = () => {
    const classes = useStyles();
    const { history } = useReactRouter();
    return (
        <div>
          <div className={classes.headerChartBlock}>
            <HeaderChat title="よくあるご質問" />
          </div>
          <div className={classes.faqListContainer}>
            <div className={classes.faqListWrapper}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>GPSがうまく機能しません。どうすればいいでしょうか。</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    何度かチェックインしても直らない場合はこちらのメールアドレスにご連絡ください。<br/>pca-travel-support@persol.co.jp
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>シナリオの進め方がわかりません。どうすればいいでしょうか。</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    チャット画面の真ん中にあるボタンをタップしてください。それでも進まない場合はブラウザの更新ボタンを押すかこちらにご連絡ください<br/>pca-travel-support@persol.co.jp
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>チェックインとはなんでしょうか。</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                  このアプリでは、GPSを用いて特定の場所付近にいるかどうかを判定し、シナリオを進めることを意味しています。<br/>pca-travel-support@persol.co.jp
                  </Typography>
                </AccordionDetails>
              </Accordion>

              
            </div>

          </div>
        </div>
    )
}

export default FAQ;
