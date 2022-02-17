import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import machine from 'assets/images/machine.svg';
import player from 'assets/images/player.svg';
import unoCard from 'assets/images/uno-card.svg';
import containers from 'assets/images/containers.svg';
import check from 'assets/images/check.svg';
import DesktopEntry from './DesktopEntry';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: '#E62F2C',
        borderTop: '3px solid #435BC9',
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
        height: '31.7em',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '4.3em',
        boxSizing: 'border-box',
    },
    '@keyframes check': {
        from: {
            transform: 'translate(0, 20%)',
        },
        '50%': {
            transform: 'translate(0, -20%)',
        },
        to: {
            transform: 'translate(0, 20%)',
        },
    },
    check: {
        position: 'absolute',
        top: '21.7em',
        width: '7.5em',
        animation: '600ms ease infinite $check',
    },
}));

function DesktopEntries() {
    const classes = useStyles();
    const [hoverIndex, setHoverIndex] = useState(0);

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                {/* hand-adjusted!!! */}
                <DesktopEntry
                    index={0} setHoverIndex={setHoverIndex} text="01 背景调研" href="/background"
                    image={containers} height="55%" margin="0 -22% -8% 0"/>
                <DesktopEntry
                    index={1} setHoverIndex={setHoverIndex} text="02 创意迭代" href="/creativity"
                    image={unoCard} height="116%" margin="0 -12% -15% 0"/>
                <DesktopEntry
                    index={2} setHoverIndex={setHoverIndex} text={"03 服务流程\n设计"} href="/servicing"
                    image={player} height="115%" margin="0 27% -3% 0"/>
                <DesktopEntry
                    index={3} setHoverIndex={setHoverIndex} text="04 效果展示" href="/exhibition"
                    image={machine} height="118%" margin="0 51% -5% 0"/>
                <img className={classes.check} src={check} style={{
                    left: `${12.8 + hoverIndex * 21.7}%`,
                }} alt="Check here!"/>
            </div>
        </div>
    );
}

export default DesktopEntries;
