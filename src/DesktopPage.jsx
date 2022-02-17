import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { useInView } from 'react-intersection-observer';
import useRouter from 'use-react-router';
import { scroller as scroll } from 'react-scroll';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';

import fence from 'assets/images/fence.svg';
import toc from 'assets/images/toc.svg';
import toMap from 'assets/images/to-map.svg';
import toHome from 'assets/images/to-home.svg';

import classNames from 'classnames';
import { flattenChildren, useCombinedRefs } from './util';
import DesktopFooter from './DesktopFooter';

const useStylesPageIcon = makeStyles(theme => ({
    root: {
        position: 'absolute',
        bottom: 0,
        height: 270,
        [theme.breakpoints.up('md')]: {
            right: '4%',
        },
        [theme.breakpoints.up('lg')]: {
            right: '8%',
        },
        '@media(min-width: 1440px)': {
            right: '11.5%',
        },
    },
    image: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        height: '100%',
    },
}));

function PageIcon({ image, height, margin }) {
    const classes = useStylesPageIcon();
    return (
        <div className={classes.root}>
            <img
                className={classes.image}
                style={{ margin, height }}
                src={image}
                alt=""
            />
        </div>
    );
}

const useStylesH1 = makeStyles({
    root: {
        height: 80,
        paddingLeft: 20,
        margin: '48px 0 24px',

        '&:first-of-type': {
            marginTop: 0,
        },

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',

        '&::before': {
            content: '\'\'',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '100%',
            backgroundColor: '#FFE500',
            transform: 'scaleX(0.8)',
            transformOrigin: 'left center',
            transition: 'transform 450ms ease',
            willChange: 'transform',
        },

        '&::after': {
            content: '\'\'',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 5,
            backgroundColor: '#3B365F',
        },

        '&$inView::before': {
            transform: 'scaleX(1)',
        },
    },
    inView: {},
    content: {
        fontWeight: 600,
        fontSize: 32,
        lineHeight: 1,
        letterSpacing: -0.7,
        zIndex: 1,
    },
});

function H1({ level, parentChildCount, index, setAnchor, children, ...rest }) {
    const classes = useStylesH1();
    const [inViewRef, inView] = useInView();
    const [wasInView, setWasInView] = useState(false);
    const anchor = flattenChildren(children);
    const anchorHash = `#${encodeURIComponent(anchor)}`;
    useEffect(() => {
        if (inView) setWasInView(true);
    }, [inView]);
    const [ref, setRef] = useState(null);
    useEffect(() => {
        if (!ref) return;
        setAnchor(index, ref, anchorHash);
    }, [setAnchor, index, ref, anchorHash]);
    const combinedRef = useCombinedRefs(setRef, inViewRef);

    return (
        <h1 ref={combinedRef} className={classNames(classes.root, { [classes.inView]: wasInView })} {...rest}
            id={anchor}>
            <Typography component="a" classes={{ root: classes.content }} color="inherit">
                {children}
            </Typography>
        </h1>
    );
}

const useStylesLI = makeStyles(theme => ({
    withCheck: {
        display: 'block',
        marginLeft: -48,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: '-8px 0',
    },
    checkbox: {
        '&$checked': {
            color: theme.palette.primary.main,
        },
    },
    checked: {},
}));

function ListItem(props) {
    // noinspection JSUnusedLocalSymbols
    const { index, parentChildCount, checked, children, ordered, tight, ...rest } = props;
    const classes = useStylesLI();

    if (checked === null) return ReactMarkdown.renderers.listItem(props);
    return (
        <li className={classes.withCheck} {...rest}>
            <div className={classes.container}>
                <Checkbox classes={{ root: classes.checkbox, checked: classes.checked }}/>
                <Typography component="span">{children}</Typography>
            </div>
        </li>
    );
}

function Hasher({ anchors }) {
    const { history: { replace }, location: { hash } } = useRouter();
    useEffect(() => {
        const listener = () => {
            const filtered = anchors
                .filter(obj => obj !== null);
            // index of first anchor which is below half the viewport, might be -1.
            const index = filtered
                .map(({ ref }) => ref.getBoundingClientRect())
                .findIndex(({ top }) => top > window.innerHeight / 2);
            // index of current anchor the page should be on, always positive
            const current = Math.max(0, (index === -1 ? filtered.length : index) - 1);
            if (!filtered[current]) return;
            const { anchor } = filtered[current];
            if (anchor !== hash) replace({ hash: anchor });
        };
        window.addEventListener('scroll', listener);
        return () => window.removeEventListener('scroll', listener);
    }, [replace, anchors, hash]);
    // noinspection JSConstructorReturnsPrimitive
    return null;
}

const useStylesIMG = makeStyles({
    root: {
        width: '100%',
        marginTop: '-9px',
    },
});

function Image(props) {
    const classes = useStylesIMG();
    console.log(classes);
    return (
        <img className={classes.root} {...props} />
    )
}

const useStylesArticle = makeStyles(theme => ({
    root: {
        backgroundColor: '#FFF7EA',
        padding: '72px 0',
    },
    content: {
        width: 700,
        [theme.breakpoints.down('md')]: {
            width: 620,
        },
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#3B365F',
        fontSize: 16,
        lineHeight: 1.75,

        '& h2': {
            fontSize: 24,
            fontWeight: 500,
            margin: '48px 0 16px',
            padding: '4px 0 4px 8px',
            lineHeight: 32 / 24,
            backgroundColor: '#D8D8D8',

            '& strong': {
                // fontWeight: 'unset',
                background: 'none',
            },
        },

        '& h3': {
            margin: '16px 0 8px',
            textAlign: 'center',

            '& strong': {
                background: 'none',
            },
        },

        '& p': {
            margin: 0,
        },

        '& strong': {
            fontWeight: 'unset',
            backgroundImage: 'linear-gradient(to bottom, #fff04f, #fff04f)',
            backgroundPosition: '0 0.5em',
            backgroundRepeat: 'repeat-x',
            backgroundSize: '2px 0.8em',
        },

        '& a[href]': {
            color: '#ED761F',
        },

        // only two columns!!!
        '& table': {
            width: '100%',
            backgroundColor: '#FFFCF7',
            border: '1px solid #b28a4b',
            margin: '16px 0',
            padding: '12px 24px',
            borderRadius: '6px',
            tableLayout: 'fixed',
        },

        '& thead th:nth-child(1)': {
            width: '50%',
        },
        '& thead th:nth-child(2)': {
            width: '50%',
        },
    },
}));

function Article({ children }) {
    const classes = useStylesArticle();
    const [anchors, setAnchors] = useState(new Array(1000).fill(null));
    const setAnchor = useCallback((index, ref, anchor) => {
        setAnchors((anchors) => {
            const newAnchors = [...anchors]; // clone
            // noinspection JSValidateTypes
            newAnchors[index] = { ref, anchor };
            return newAnchors;
        });
    }, []);
    const renderHeading = useCallback((props) => props.level === 1 ? (
        <H1 setAnchor={setAnchor} {...props}/>
    ) : ReactMarkdown.renderers.heading(props), [setAnchor]);
    const renderers = useMemo(() => ({
        heading: renderHeading,
        listItem: ListItem,
        image: Image,
    }), [renderHeading]);
    const md = useMemo(() => (
        <ReactMarkdown
            escapeHtml={false}
            className={classes.content}
            source={children}
            renderers={renderers}
            includeNodeIndex/>
    ), [classes, children, renderers]);
    return (
        <div className={classes.root}>
            <Hasher anchors={anchors}/>
            {md}
        </div>
    );
}

const useStylesEntry = makeStyles({
    entry: {
        fontSize: 16,
        lineHeight: 1,
        marginBottom: 14,
        color: '#ffffff',
        letterSpacing: 2.5,
        cursor: 'pointer',
        opacity: 0.6,
        transition: 'opacity 125ms linear',
        willChange: 'opacity',
        '&:hover, &:active': {
            opacity: 1,
        },
        '&$current': {
            opacity: 1,
        },
    },
    current: {},
});

function Entry({ children }) {
    const classes = useStylesEntry();
    const { location: { hash } } = useRouter();
    const anchor = flattenChildren(children);
    const anchorHash = `#${encodeURIComponent(anchor)}`;
    const onClick = useCallback(() => {
        scroll.scrollTo(anchor, {
            smooth: 'easeInOutCubic',
            duration: distance => Math.max(300, Math.sqrt(Math.abs(distance)) * 10),
            offset: -24,
        });
    }, [anchor]);
    return (
        <div className={classNames(classes.entry, { [classes.current]: hash === anchorHash })}
             onClick={onClick}>{children}</div>
    );
}

const useStylesToC = makeStyles(theme => ({
    container: {
        position: 'sticky',
        top: 0,
        height: 0,
        transform: 'translateY(240px)',
        [theme.breakpoints.down('md')]: {
            transform: 'translateY(160px)',
        },
    },
    root: {
        position: 'absolute',
        left: 'calc(50% + 412px)',
        [theme.breakpoints.down('md')]: {
            left: 'calc(50% + 342px)',
        },
        top: 0,
        width: 143,
        height: 329,
        backgroundColor: '#e62f2c',
        zIndex: 100,
    },
    entries: {
        position: 'absolute',
        left: 8,
        top: 55,
        height: 142,
        paddingLeft: 8,
        '&::before': {
            content: '\'\'',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            backgroundColor: '#ffffff',
        },
    },
    fence: {
        position: 'absolute',
        top: 8,
        left: 8,
        right: 8,
        width: 'calc(100% - 16px)',
    },
    toc: {
        position: 'absolute',
        width: '90%',
        left: '5%',
        bottom: 0,
        marginBottom: -21,
    },
}));

function ToC({ source }) {
    const classes = useStylesToC();
    const renderHeading = useCallback(({ level, children }) => level === 1 && (
        <Entry>{children}</Entry>
    ), []);
    const md = useMemo(() => (
        <ReactMarkdown
            className={classes.entries}
            source={source}
            disallowedTypes={['paragraph', 'list', 'table']}
            renderers={{ heading: renderHeading }}/>
    ), [classes, source, renderHeading]);

    return (
        <div className={classes.container}>
            <div className={classes.root}>
                {md}
                <img src={fence} className={classes.fence} alt=""/>
                <img src={toc} className={classes.toc} alt=""/>
            </div>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    headerContainer: {
        height: 346,
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#e62f2c',
        borderBottom: '2px solid #435BC9',
        boxSizing: 'border-box',
    },
    header: {
        position: 'relative',
        height: '100%',
        [theme.breakpoints.up('md')]: {
            width: 960,
        },
        [theme.breakpoints.up('lg')]: {
            width: 1200,
        },
        '@media(min-width: 1440px)': {
            width: 1440,
        },
        display: 'inline-block',
    },
    title: {
        position: 'absolute',
        left: '17.5%',
        top: 72,
        height: 64,
        [theme.breakpoints.up('md')]: {
            left: '10%',
        },
        [theme.breakpoints.up('lg')]: {
            left: '14%',
        },
        '@media(min-width: 1440px)': {
            left: '17.5%',
        },
        color: 'white',
        fontSize: 48,
    },
    desc: {
        fontSize: 16,
        lineHeight: 1.25,
        position: 'absolute',
        top: 147,
        width: 420,
        letterSpacing: 7.5,
        textAlign: 'left',
        color: '#FFFFFF',
        [theme.breakpoints.up('md')]: {
            left: '10%',
        },
        [theme.breakpoints.up('lg')]: {
            left: '14%',
        },
        '@media(min-width: 1440px)': {
            left: '17.5%',
        },
    },
    buttons: {
        position: 'absolute',
        top: 250,
        [theme.breakpoints.up('md')]: {
            left: '10%',
        },
        [theme.breakpoints.up('lg')]: {
            left: '14%',
        },
        '@media(min-width: 1440px)': {
            left: '17.5%',
        },
    },
    button: {
        backgroundColor: '#000000',
        padding: 0,
        cursor: 'pointer',
        border: 'none',
        marginRight: 24,
    },
    buttonImage: {
        height: 48,
    },
    home: {
        position: 'fixed',
        left: 0,
        paddingLeft: 48,
        top: 24,
        transform: 'translateX(0)',
        transition: 'transform 500ms ease',
        '&$hidden': {
            transform: 'translateX(-100%)',
        },
        [theme.breakpoints.down('md')]: {
            paddingLeft: 16,
        }
    },
    noOverflow: {
        overflow: 'hidden',
    },
    hidden: {},
}));

const useScroll = () => {
    const [scroll, setScroll] = useState(window.scrollY);
    const onScroll = useCallback(() => setScroll(window.scrollY), [setScroll]);
    useEffect(() => {
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);
    return scroll;
};

function DesktopPage({ title, titleImage, content, image, height, margin, desc, noOverflow }) {
    const classes = useStyles();
    const scroll = useScroll();
    return (
        <div>
            <Helmet title={`${title} - UNO`}/>
            <div className={classes.headerContainer}>
                <div className={classNames(classes.header, { [classes.noOverflow]: noOverflow })}>
                    <PageIcon image={image} height={height} margin={margin}/>
                    {/* <img className={classes.title} src={titleImage} alt={title}/> */}
                    <span className={classes.title}>{title}</span>
                    <Typography classes={{ root: classes.desc }}>{desc}</Typography>
                    <div className={classes.buttons}>
                        <Link to="/">
                            <button className={classes.button}>
                                <img src={toHome} className={classes.buttonImage} alt=""/>
                            </button>
                        </Link>
                        {/* <Link to="/map">
                            <button className={classes.button}>
                                <img src={toMap} className={classes.buttonImage} alt=""/>
                            </button>
                        </Link> */}
                    </div>
                </div>
            </div>
            {/* <ToC source={content}/> */}
            <Article>{content}</Article>
            <div className={classNames(classes.home, { [classes.hidden]: scroll < 360 })}>
                <Link to="/">
                    <button className={classes.button}>
                        <img src={toHome} className={classes.buttonImage} alt=""/>
                    </button>
                </Link>
            </div>
            <DesktopFooter/>
        </div>
    );
}

export default DesktopPage;
