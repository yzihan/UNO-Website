import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const useClasses = makeStyles({
    root: {
        width: '12.5em',
        height: '15.1em',
        backgroundColor: '#fcf8f8',
        border: '3px solid #435BC9',
        position: 'relative',
        cursor: 'pointer',
    },
    imageContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '65%',
        pointerEvents: 'none',
    },
    image: {
        position: 'absolute',
        height: '100%',
        right: 0,
        bottom: 0,
    },
    // the following code is CRYPTIC and contains HACKS, read the comments below before trying to modify anything!!!!
    '@keyframes slide-out': {
        from: {
            transform: 'translate(0, 0)',
        },
        to: {
            transform: 'translate(100%, 0)',
        },
    },
    ribbon: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',

        '&::before': {
            content: '\'\'',
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#435BC9',
            transform: 'translate(-100%, 0)',
            transition: 'transform 400ms cubic-bezier(0.69, 0.01, 0.62, 0.96)',
        },
        '&$hover': {
            '&::before': {
                transform: 'translate(0, 0)',
            },
        },
        '&$hoverOut': {
            '&::before': {
                animation: '400ms cubic-bezier(0.69, 0.01, 0.62, 0.96) normal $slide-out',
            },
        },
    },
    hover: {},
    hoverOut: {},
    text: {
        position: 'absolute',
        left: '5.8%',
        top: '7%',
        fontSize: '1.8em',
        color: '#435BC9',
        fontFamily: 'sans-serif',
        pointerEvents: 'none',
        transition: 'color 150ms 50ms linear',
        textAlign: 'right',
        zIndex: 2,
        '&$hover': {
            color: '#FFFFFF',
            transition: 'color 150ms 250ms linear',
        },
        '&$hoverOut': {
            transition: 'color 150ms 200ms linear',
        },
    },
});

function DesktopEntry({ href, text, image, height, margin, index, setHoverIndex }) {
    // a complicate state machine is involved here and I believe it'd be better to rewrite this with useReduce().
    // The expected behavior is: When the mouse enters the entry, it enters hover-in state, which lasts for 400ms,
    // when it enters hovering state, until the mouse leaves the entry, when it enters hover-out state, which lasts
    // for another 400ms. The tricky part is that we don't want the entry to enter hover-out state if the mouse
    // exits  the entry too fast, i.e., in less than 400ms, when the entry should enter hover-in-reverse state and
    // the animation played originally in the hover-in state should be played in a reversed manner, at least,
    // perceptually.
    // As we don't want to get too much javascript involved in this process, we only update the flags *hovered*,
    // *hoverIn* and *hoverOut* and let CSS do the animation job. Flag *hovered* always tracks whether the mouse is
    // inside the area of the entry, and controls classes.hover, which is intuitively very like a ':hover' pseudo
    // class. When the mouse enters, flag *hoverIn* becomes true for 400ms and then false, and when the mouse leaves,
    // flag *hoverOut* becomes true for 400ms and then false. If the mouse leaves too early, *hoverIn* becomes false
    // immediately and *hoverOut* remains unchanged. Note that *hoverIn* will never be true when *hovered* is false,
    // while *hoverOut* will never be true when *hovered* is true. *hoverIn && hoverOut* will always be false.
    // Mapping the states to the actual CSS styles, the elements are supposed to have a transition style, and class
    // *hover* is supposed to change the corresponding attribute. Upon hovering, this attribute will transition to
    // the given value and stop there if the mouse did not leave in 400ms. Otherwise, the attribute will return to its
    // initial value, with the browser interpolating a smooth animation in between. Meanwhile, class *hoverOut* is
    // supposed to play a certain animation, which should override the transition between the 'hovered value' to the
    // original value, so the element could behave differently. Since class *hoverOut* is not applied if the mouse
    // leaves too fast, this shouldn't be a problem.
    // In order to provide a different transition curve in hover-in and hover-in-reverse states, a clever hack is used
    // to set the transition style differently in the *hover* class, which will apply in hover-in state but not
    // hover-in-reverse state. Note that class *hoverOut* can also be implemented using transitions.
    // Additionally, a *initialized* flag is used to detect the first useEffect() call and to avoid setting *hoverOut*
    // class at element mount, causing the unexpected hovering-out animation to be played. Note that useEffect() omits
    // dependency initialized ON PURPOSE since we don't want it be fired again after we set initialized to true.
    const [hovered, setHovered] = useState(false);
    const onMouseEnter = useCallback(() => {
        setHovered(true);
        setHoverIndex(index);
    }, [setHovered, setHoverIndex, index]);
    const onMouseLeave = useCallback(() => setHovered(false), [setHovered]);
    const [hoverIn, setHoverIn] = useState(false);
    const [hoverOut, setHoverOut] = useState(false);
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        if (!initialized) {
            setInitialized(true);
            return;
        }
        if (hovered) {
            setHoverOut(false);
            setHoverIn(true);
            const timeout = setTimeout(() => setHoverIn(false), 400);
            return () => clearTimeout(timeout);
        } else {
            if (hoverIn) {
                setHoverIn(false);
            } else {
                setHoverOut(true);
                const timeout = setTimeout(() => setHoverOut(false), 400);
                return () => clearTimeout(timeout);
            }
        }
    }, [hovered, setHoverIn, setHoverOut]); // eslint-disable-line react-hooks/exhaustive-deps

    const classes = useClasses();
    return (
        <Link to={href}>
            <div className={classes.root} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <div className={classNames(classes.ribbon, {
                    [classes.hoverOut]: hoverOut,
                    [classes.hover]: hovered,
                })} />
                <div className={classNames(classes.text, {
                    [classes.hoverOut]: hoverOut,
                    [classes.hover]: hovered,
                })}>{(m => (m.pop(), m))(text.split('\n').map((v) => [
                    v,
                    <br/>
                ]).flat())}</div>
                <div className={classes.imageContainer}>
                    <img src={image} className={classes.image} style={{ margin, height }} alt=""/>
                </div>
            </div>
        </Link>
    );
}

export default DesktopEntry;
