import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Draggable from 'react-draggable';
import Typography from '@material-ui/core/Typography/Typography';
import classNames from 'classnames';

import map from 'assets/images/map-content.svg';

import figures from './figures';
import { useWindowSize } from './util';
import GoBack from './GoBack';

const useStylesBack = makeStyles({
    root: {
        border: 'none',
        display: 'block',

        width: 44,
        height: 44,
        left: 16,
        top: 80,
        position: 'fixed',

        zIndex: 100, // high enough to be above virtually anything

        borderRadius: '50%',
        backgroundColor: '#FFDC2A',
        cursor: 'pointer',

        '&::after': { // arrow
            content: '\'\'',

            width: 14,
            height: 14,
            boxSizing: 'border-box',

            position: 'absolute',
            left: 'calc(50% + 2px)',
            top: '50%',
            marginTop: -7,
            marginLeft: -7,

            borderStyle: 'solid',
            borderColor: '#435BC9',
            borderWidth: '4px 0 0 4px',
            transform: 'rotate(-45deg)',
        }
    },
});

function Back() {
    const classes = useStylesBack();
    return (
        <GoBack>
            <button className={classes.root}/>
        </GoBack>
    );
}

const useStylesDialog = makeStyles({
    overlay: {
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000',
        opacity: 0,
        zIndex: 101,
        transition: 'opacity 250ms 50ms linear',
        willChange: 'opacity',
        pointerEvents: 'none',
        '&$opened': {
            opacity: 0.5,
            pointerEvents: 'unset',
        },
    },
    container: {
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 102,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        '&$opened': {
            pointerEvents: 'unset',
        },
    },
    dialog: {
        width: 265,
        border: '1.5px solid #435BC9',
        borderRadius: 4,
        padding: '8px 16px 40px',
        boxSizing: 'border-box',
        color: '#435BC9',
        backgroundColor: '#FFFFFF',

        opacity: 0,
        transform: 'translateY(70px)',
        willChange: 'transform, opacity',
        transition: 'opacity 250ms 50ms linear, transform 350ms cubic-bezier(0.4, 0, 0.2, 1)',
        '&$opened': {
            opacity: 1,
            transform: 'translateY(0)',
        },
    },
    title: {
        display: 'inline-block',
        fontSize: 24,
        lineHeight: '32px',
        borderBottom: '1px solid #435BC9',
        letterSpacing: 4,
        marginBottom: 6,
        fontWeight: 600,
    },
    image: {
        height: 151,
        width: '100%',
        display: 'block',
        objectFit: 'cover',
        margin: '10px 0',
        backgroundColor: '#979797',
    },
    desc: {
        marginTop: 10,
        fontSize: 16,
        lineHeight: '22px',
        height: 110,
    },
    opened: {},
});

function Dialog({ opened, close, name, desc, image }) {
    const classes = useStylesDialog();
    const stop = useCallback(e => e.stopPropagation(), []);
    return <>
        <div className={classNames(classes.overlay, { [classes.opened]: opened })}/>
        <div className={classNames(classes.container, { [classes.opened]: opened })} onClick={close}>
            <div className={classNames(classes.dialog, { [classes.opened]: opened })} onClick={stop}>
                <Typography component="div" classes={{ root: classes.title }} color="inherit">{name}</Typography>
                {image && <img className={classes.image} src={image} alt=""/>}
                <Typography component="div" classes={{ root: classes.desc }} color="inherit">{desc}</Typography>
            </div>
        </div>
    </>;
}

const useStylesFigure = makeStyles({
    figure: {
        display: 'block',
        position: 'absolute',
    },
});

function Figure({ figure: { x, y, desc, name, image, icon, width }, open }) {
    const classes = useStylesFigure();
    const onClick = useCallback(() => open({ desc, name, image }), [open, desc, name, image]);
    return (
        <img
            onClick={onClick}
            className={classes.figure}
            src={icon}
            style={{
                left: x * scale, top: y * scale, width: width * 1.6 * scale,
            }}
            alt={name}/>
    )
}

const scale = 0.8;

const width = 1440 * scale;
const height = 1050 * scale;

const useStyles = makeStyles({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
    },
    parent: {
        position: 'absolute',
        width: `calc(${width * 2}px - 100%)`,
        height: `calc(${height * 2}px - 100%)`,
        left: `calc(100% - ${width}px)`,
        top: `calc(100% - ${height}px)`,
    },
    root: {
        width: width,
        height: height,
    },
    map: {
        position: 'absolute',
        left: 82 * scale,
        top: 61 * scale,
        width: 1276 * scale,
    },
});

function MobileMap() {
    const classes = useStyles();
    const { width: winW, height: winH } = useWindowSize();
    const [dialogParams, setDialogParams] = useState({});
    const [opened, setOpened] = useState(false);
    const openDialog = useCallback((params) => {
        setDialogParams(params);
        setOpened(true);
    }, []);
    const closeDialog = useCallback(() => setOpened(false), []);
    return (
        <div className={classes.container}>
            <Back/>
            <div className={classes.parent}>
                <Draggable defaultPosition={{ x: width - winW, y: height - winH }} bounds="parent">
                    <div className={classes.root}>
                        <img className={classes.map} src={map} alt=""/>
                        {figures.map(figure => (
                            <Figure figure={figure} key={figure.key} open={openDialog}/>
                        ))}
                    </div>
                </Draggable>
            </div>
            <Dialog {...dialogParams} opened={opened} close={closeDialog}/>
        </div>
    )
}

export default MobileMap;
