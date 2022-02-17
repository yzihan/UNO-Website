import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 107,
        borderColor: '#fff7ea',
        borderStyle: 'solid',
        borderWidth: 0,
        borderBottomWidth: 1.5,
        position: 'relative',
    },
    rootFirst: {
        borderTopWidth: 1.5,
    },
    text: {
        fontFamily: 'sans-serif',
        fontSize: 32,
        position: 'absolute',
        top: 37,
        color: '#fcf8f8',
    },
    text1: {
        left: 16,
    },
    text2: {
        right: 30,
    },
    image: {
        position: 'absolute',
        bottom: 0,
        height: '100%',
    },
    image1: {
        right: 0,
    },
    image2: {
        left: 0,
    },
});

function MobileEntry(props) {
    const { text, type, index, image, height, margin, href } = props;
    const classes = useStyles(props);
    return (
        <Link to={href}>
            <div className={classNames(classes.root, {[classes.rootFirst]: index === 1})}>
                <div className={classNames(classes.text, [classes.text1, classes.text2][type - 1])}>
                    0{index} {text}
                </div>
                <img
                    className={classNames(classes.image, [classes.image1, classes.image2][type - 1])}
                    style={{ margin, height }}
                    src={image}
                    alt=""
                />
            </div>
        </Link>
    )
}

export default MobileEntry;
