import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    footer: {
        width: '100%',
        height: 182,
        backgroundColor: '#000000',
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'sans-serif',
        position: 'relative',
        lineHeight: 1.5,
    },
    content: {
        position: 'absolute',
        left: 15,
        top: 0,
        '& a': {
            color: 'inherit',
            textDecoration: 'none',
        }
    },
    line: {
        width: 40,
        height: 0,
        borderTop: '1px solid #FFFFFF',
        margin: '11px 0',
    },
});

function MobileFooter() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.footer}>
                <div className={classes.content}>
                    <div className={classes.line}/>
                    <div>
                        <br/>
                        页面设计 / 李奕扬 蔡愚<br/>
                        技术实现 / 严子涵<br/>
                        友情感谢：tespent<br/>
                        <br/><br/><br/>
                        &copy;2020 蔡愚 严子涵 李奕扬
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MobileFooter;
