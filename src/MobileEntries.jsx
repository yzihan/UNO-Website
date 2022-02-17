import React from 'react';
import { makeStyles } from '@material-ui/styles';
import machine from 'assets/images/machine.svg';
import player from 'assets/images/player.svg';
import unoCard from 'assets/images/uno-card.svg';
import containers from 'assets/images/containers.svg';
import MobileEntry from './MobileEntry';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 640,
        backgroundColor: '#E62F2C',
        paddingTop: 86,
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
});

function MobileEntries({ entriesRef }) {
    const classes = useStyles();
    return (
        <div className={classes.root} ref={entriesRef}>
            <MobileEntry
                index={1} text="背景调研"
                type={1} href="/background"
                image={containers} height="70%" margin="0 0 -2px 0"/>
            <MobileEntry
                index={2} text="创意迭代"
                type={2} href="/creativity"
                image={unoCard} margin="0 0 -3px 0"/>
            <MobileEntry
                index={3} text="服务流程设计"
                type={1} href="/servicing"
                image={player} margin="0 0 -1px 0"/>
            <MobileEntry
                index={4} text="效果展示"
                type={2} href="/exhibition"
                image={machine} margin="0 0 -1px 0"/>
        </div>
    )
}

export default MobileEntries;
