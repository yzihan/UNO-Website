import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: '#000000',
    },
    container: {
        [theme.breakpoints.up('md')]: {
            width: 960,
            fontSize: 13,
            paddingLeft: 86.4, // 9%
            paddingRight: 86.4, // 9%
        },
        [theme.breakpoints.up('lg')]: {
            width: 1200,
            fontSize: 16,
            paddingLeft: 108, // 9%
            paddingRight: 108, // 9%
        },
        '@media(min-width: 1440px)': {
            width: 1440,
            fontSize: 18,
            paddingLeft: 129.6, // 9%
            paddingRight: 129.6, // 9%
        },
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        height: '12.5em',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '2em',
        boxSizing: 'border-box',

        color: '#FFFFFF',
        fontFamily: 'sans-serif',
    },
    column: {
        width: '12.5em',
    },
    text: {
        [theme.breakpoints.up('md')]: {
            fontSize: 10,
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: 12,
        },
        '@media(min-width: 1440px)': {
            fontSize: 14,
        },
        lineHeight: '1.5em',
    },
    subtitle: {
        marginBottom: '1em',
        [theme.breakpoints.up('md')]: {
            fontSize: 12,
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: 14,
        },
        '@media(min-width: 1440px)': {
            fontSize: 16,
        },
    },
    link: {
        textDecoration: 'none',
        color: '#FFFFFF',
        transition: 'color 100ms linear',
        '&:hover, &:active': {
            color: '#FFDC2A',
        },
    },
}));

function DesktopFooter() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.column}>
                    <div className={classes.subtitle}>版权所有</div>
                    <div className={classes.text}>
                        浙江大学工业设计<br/>
                        服务与创新设计课程-14组<br/>
                        <br/>
                        &copy; 2020 蔡愚 严子涵 李奕扬
                    </div>
                </div>
                <div className={classes.column}>
                    <div className={classes.subtitle}>友情链接</div>
                    <div className={classes.text}>
                        <a className={classes.link}
                           href="https://leihuo.163.com/"
                           target="_blank"
                           rel="noreferrer noopener"
                        >网易雷火</a><br/>
                        <a className={classes.link}
                           href="http://id.zju.edu.cn/"
                           target="_blank"
                           rel="noreferrer noopener"
                        >浙江大学工业设计</a>
                    </div>
                </div>
                <div className={classes.column}>
                    <div className={classes.subtitle}>相关产品</div>
                    <div className={classes.text}>
                        <a className={classes.link}
                           href="https://uno.163.com"
                           target="_blank"
                           rel="noreferrer noopener"
                        >网易《一起优诺》</a><br/>
                        <a className={classes.link}
                           href="https://uno.163.com"
                           target="_blank"
                           rel="noreferrer noopener"
                        >美泰 UNO</a>
                    </div>
                </div>
                <div className={classes.column}>
                    <div className={classes.subtitle}>关于我们</div>
                    <div className={classes.text}>
                        联系我们：<br/>
                        设计实现：李奕扬 蔡愚<br/>
                        技术实现：严子涵<br/>
                        友情感谢：tespent
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DesktopFooter;
