import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import title from 'assets/images/title.svg';
import hako from 'assets/images/hako.svg';
import eyes from 'assets/images/eyes.svg';
import map from 'assets/images/map.svg';
import toMap from 'assets/images/to-map-alt.svg';
import mapContent from 'assets/images/map-content.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        [theme.breakpoints.up('md')]: {
            width: 960,
            fontSize: 13,
            // height: 440,
        },
        [theme.breakpoints.up('lg')]: {
            width: 1200,
            fontSize: 16,
            // height: 480,
        },
        '@media(min-width: 1440px)': {
            width: 1440,
            fontSize: 18,
            // height: 530,
        },
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
    },
    title: {
        position: 'absolute',
        left: '9%',
        top: 32,
        width: '27em',
    },
    mapButton: {
        position: 'absolute',
        top: 327,
        left: '9%',
        padding: 0,
        fontSize: '1.33em',
        backgroundColor: '#e62d49',
        border: 'none',
        cursor: 'pointer',
    },
    mapButtonImage: {
        height: '2em',
    },
    map: {
        position: 'absolute',
        right: '6.25%',
        bottom: 50,
        width: '46%',
    },
    mapContent: {
        position: 'absolute',
        right: '12%',
        bottom: 95,
        width: '34%',
        [theme.breakpoints.up('md')]: {
            height: 215,
        },
        [theme.breakpoints.up('lg')]: {
            height: 280,
        },
        '@media(min-width: 1440px)': {
            height: 330,
        },
        overflow: 'hidden',
    },
    mapContentImage: {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
    },
    // hako: {
    //     position: 'absolute',
    //     bottom: 'calc(-2.5px - 0.30em)',
    //     right: '2.3%',
    //     width: '16%',
    // },
    // eyes: {
    //     position: 'absolute',
    //     left: 0,
    //     top: 0,
    //     bottom: 0,
    // }
}));

const transformEllipsoid = ({ x: x0, y: y0, z: z0 }, { a, b, c }) => {
    const k = Math.sqrt(1 / (x0 * x0 / a / a + y0 * y0 / b / b + z0 * z0 / c / c));
    return { x: k * x0, y: k * y0, z: k * z0 };
};

function DesktopLanding() {
    const [{ x = 0, y = 0 }, setMouse] = useState({});
    const onMouseMove = useCallback(({ clientX: x, clientY: y }) => setMouse({ x, y }), [setMouse]);
    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    });

    const [{ ex = 0, ey = 0 }, setEyes] = useState({});
    const [eyesEl, setEyesEl] = useState(null);
    const measureEyes = useCallback(() => {
        if (!eyesEl) return;
        const [{ left, right, top, bottom }] = eyesEl.getClientRects();
        setEyes({
            ex: (left + right) / 2,
            ey: top * 0.56 + bottom * 0.44, // magic numbers, center of eyes is 41% from top of the image
        });
    }, [eyesEl]);
    useEffect(measureEyes, [eyesEl]);
    useEffect(() => {
        window.addEventListener('resize', measureEyes);
        return () => window.removeEventListener('resize', measureEyes);
    }, [measureEyes]);

    const { x: dx, y: dy } = transformEllipsoid({ x: x - ex, y: y - ey, z: 200 }, { a: 9.5, b: 20, c: 40 });

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <img src="/images/scaled_titley.png" style={{width: '100%'}} />
                {/* <img className={classes.title} src={title} alt="UNO"/>
                <Link to="/exhibition">
                    <button className={classes.mapButton}>
                        <img className={classes.mapButtonImage} src={toMap} alt="开始旅程"/>
                    </button>
                </Link> */}
                {/* <div className={classes.mapContent}>
                    <img className={classes.mapContentImage} src="/images/whatisthis.jpg" alt=""/>
                </div> */}
                {/* <Link to="/exhibition">
                    <img className={classes.map} src="/images/whatisthis.png" alt=""/>
                </Link> */}
                {/* <div className={classes.hako}>
                    <img src={hako} alt=""/>
                    <img
                        className={classes.eyes}
                        src={eyes}
                        ref={setEyesEl}
                        style={{ transform: `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)` }}
                        alt=""/>
                </div> */}
            </div>
        </div>
    );
}

export default DesktopLanding;
