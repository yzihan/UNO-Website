import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import title from 'assets/images/title.svg';
import more from 'assets/images/more.svg';
import hako from 'assets/images/hako.svg';
import eyes from 'assets/images/eyes.svg';
import toMap from 'assets/images/to-map-alt.svg';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 414,
        boxSizing: 'border-box',
        position: 'relative',
        backgroundColor: '#ffffff',
        borderColor: '#435BC9',
        borderStyle: 'solid',
        borderWidth: 0,
        borderBottomWidth: 5,
        fontFamily: 'sans-serif',
        '@media(max-width: 500px)': {
            height: 344,
        },
    },
    title: {
        position: 'absolute',
        left: 16,
        top: 32,
        width: 333,
    },
    titleImage: {
        '@media(max-width: 500px)': {
            width: '100%',
        },
    },
    mapLink: {
        color: '#FFFFFF',
        fontSize: 16,
        width: 100,
    },
    mapButton: {
        backgroundColor: '#e62d49',
        border: 'none',
        marginTop: 37,
        padding: 0,
    },
    mapButtonImage: {
        height: 36,
    },
    face: {
        width: 215,
        height: 279,
        position: 'absolute',
        right: 45,
        bottom: 0,
    },
    eyes: {
        position: 'absolute',
        left: 0,
        top: 0,
    },
    more: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 422,
        textAlign: 'center',
        zIndex: 10,
        '@media(max-width: 500px)': {
            top: 352,
        },
    },
    moreArrow: {
        display: 'inline-block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '13px 22.5px 0',
        borderColor: 'transparent',
        borderTopColor: '#ffffff',
        marginTop: 5,
    }
});

// calculates the direction of the normal of the screen in form of descartes coordinates in the user space.
// The normal of the screen is (0, 0, 1) in the screen space, and the screen space is represented by
// euler angles (0, rb, rg) from the world space.
// The user space is represented by euler angles (0, sb, 0), and intuitively means the space from the user's
// head, however with the z axis reversed, that is, pointing to the back of the head.
// sb here is usually a constant value in degrees, representing the common angle between the phone and the ground.
const transformEuler = ({ beta: rb = 0, gamma: rg = 0 }, sb) => {
    if (rb > 90 || rb < -90) rg = -rg;
    // normal of screen in world space
    let nx = Math.sin(rg / 180 * Math.PI),
        ny = Math.cos(rg / 180 * Math.PI) * Math.sin(rb / 180 * Math.PI),
        nz = Math.cos(rg / 180 * Math.PI) * Math.cos(rb / 180 * Math.PI);
    let x = nx,
        y = ny * Math.cos(sb / 180 * Math.PI) + nz * Math.sin(sb / 180 * Math.PI),
        z = -ny * Math.sin(sb / 180 * Math.PI) + nz * Math.cos(sb / 180 * Math.PI);
    return { x, y, z };
};

// calculates the coordinates of the intersection point of a given ellipsoid and a given half-line.
// The ellipsoid is centered at the origin and aligns with the axes, and the half-line starts at (0, 0, 0), which
// direction is represented in descartes coordinates.
const transformEllipsoid = ({ x: x0, y: y0, z: z0 }, { a, b, c }) => {
    // the ellipsoid can be represented by x^2 / a^2 + y^2 / b^2 + z^2 / c^2 = 1, and the half-line can be
    // represented by (x - 0) / x0 = (y - 0) / y0 = (z - 0) / z0 = k, so combining these equations we get:
    // k^2 * (x0^2 / a^2 + y0^2 / b^2 + z0^2 / c^2) = 1, and we can get the intersection point simply from this.
    const k = Math.sqrt(1 / (x0 * x0 / a / a + y0 * y0 / b / b + z0 * z0 / c / c));
    return { x: k * x0, y: k * y0, z: k * z0 };
};

function MobileLanding({ onMoreClick }) {
    const classes = useStyles();
    const [rotation, setRotation] = useState({});
    const handleOrientation = useCallback(({ beta, gamma }) => setRotation({ beta: -beta, gamma }), []);
    useEffect(() => {
        window.addEventListener('deviceorientation', handleOrientation);
        return () => window.removeEventListener('deviceorientation', handleOrientation);
    }, [handleOrientation]);
    const normal = transformEuler(rotation, 45);
    const { x, y } = transformEllipsoid(normal, { a: 11.5, b: 22, c: 10 });
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <img src={title} alt="UNO" className={classes.titleImage}/>
                <Link to="/exhibition">
                    <button className={classes.mapButton}>
                        <img className={classes.mapButtonImage} src={toMap} alt="进入地图"/>
                    </button>
                </Link>
            </div>
            {/* <div className={classes.face}>
                <img src={hako} alt=""/>
                <img className={classes.eyes} src={eyes} style={{
                    transform: `translate(${-x.toFixed(2)}px, ${y.toFixed(2)}px)`,
                }} alt=""/>
            </div> */}
            <div className={classes.more} onClick={onMoreClick}>
                <img src={more} alt="查看更多"/><br/>
                <div className={classes.moreArrow}/>
            </div>
        </div>
    )
}

export default MobileLanding;
