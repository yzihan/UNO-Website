import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useRouter from 'use-react-router';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown/with-html';
import { useInView } from 'react-intersection-observer';
import { scroller as scroll } from 'react-scroll';

import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';

import classNames from 'classnames';
import menu from 'assets/images/menu.svg';
import { flattenChildren } from './util';
import GoBack from './GoBack';

const useStylesPageIcon = makeStyles({
    root: {
        position: 'absolute',
        right: -40,
        bottom: 0,
        height: 170,
    },
    image: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        height: '100%',
    }
});

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
        height: 32,
        paddingLeft: 10,
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
            width: 2,
            backgroundColor: '#3B365F',
        },

        '&$inView::before': {
            transform: 'scaleX(1)',
        },
    },
    inView: {},
    content: {
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 1,
        letterSpacing: -0.5,
        zIndex: 1,
    },
});

function Heading(props) {
    const { level, children, ...rest } = props;
    const classes = useStylesH1();
    const [ref, inView] = useInView();
    const [wasInView, setWasInView] = useState(false);
    useEffect(() => {
        if (inView) setWasInView(true);
    }, [inView]);
    const anchor = flattenChildren(children);

    if (level !== 1) return ReactMarkdown.renderers.heading(props);
    return (
        <h1 ref={ref} className={classNames(classes.root, { [classes.inView]: wasInView })} {...rest} id={anchor}>
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
    const { checked, children, ordered, tight, ...rest } = props;
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

const useStylesIMG = makeStyles({
    root: {
        width: '100%',
        marginTop: '-10px',
    },
});

function Image(props) {
    const classes = useStylesIMG();
    return (
        <img className={classes.root} {...props} />
    )
}

const useStylesArticle = makeStyles({
    root: {
        backgroundColor: '#FFF7EA',
        padding: '28px 24px',
        color: '#3B365F',
        fontSize: 15,
        lineHeight: 1.6,

        '& h2': {
            fontSize: 20,
            fontWeight: 500,
            margin: '32px 0 0',

            '& strong': {
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

        '& table': {
            width: 'calc(100% + 48px)',
            backgroundColor: '#FFFCF7',
            borderTop: '1px solid #b28a4b',
            borderBottom: '1px solid #b28a4b',
            margin: '16px -24px',
            padding: '12px 24px',
            // borderRadius: '6px',
            tableLayout: 'fixed',
        },

        // only two columns!!!
        '& thead th:nth-child(1)': {
            width: '50%',
        },
        '& thead th:nth-child(2)': {
            width: '50%',
        },
    },
});

function Article({ children }) {
    const classes = useStylesArticle();
    const renderers = useMemo(() => ({ heading: Heading, listItem: ListItem, image: Image }), []);
    return (
        <ReactMarkdown
            escapeHtml={false}
            className={classes.root}
            source={children}
            renderers={renderers}/>
    )
}

const useStylesBack = makeStyles({
    root: {
        border: 'none',
        display: 'block',

        width: 44,
        height: 44,
        left: 16,
        // with position: sticky, the element must be inside the normal flow, however since we don't want to create
        // any spacing between the header and the body, we simply make its margin box size zero.
        marginBottom: -44,

        // we want the back button to be inside the header, however with position: sticky the top and bottom styles
        // are treated as affiliated to the fixed mode, ans since the button has to be inside the normal flow, the
        // only way we can move it is by transform. Meanwhile, the top style as to be increased by 88 so that it
        // will be the correct 16 pixels under the viewport in its fixed mode.
        position: 'sticky',
        transform: 'translateY(-72px)',
        top: 88,

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

const useStylesEntry = makeStyles({
    entry: {
        flexGrow: 1,
        flexBasis: 0,
        borderBottom: '1px solid #435BC9',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 54,
        color: '#435BC9',
        letterSpacing: 2.5,
        '&:last-of-type': {
            borderBottom: 'none',
        },
    },
});

function Entry({ children, close }) {
    const classes = useStylesEntry();
    const { history } = useRouter();
    const anchor = flattenChildren(children);
    const onClick = useCallback(() => {
        history.replace({ hash: anchor });
        scroll.scrollTo(anchor, {
            smooth: 'easeInOutCubic',
            duration: distance => Math.max(350, Math.sqrt(distance) * 16),
            offset: -80,
        });
        close();
    }, [history, anchor, close]);
    return (
        <div className={classes.entry} onClick={onClick}>{children}</div>
    );
}

const useStylesHamburger = makeStyles({
    root: {
        position: 'fixed',
        right: 16,
        bottom: 48,
        width: 44,
        height: 44,
        borderRadius: '50%',
        backgroundColor: '#FFDC2A',
        zIndex: 100,
    },
    icon: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    overlay: {
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000',
        opacity: 0,
        transition: 'opacity 350ms 50ms linear',
        willChange: 'opacity',
        zIndex: 101,
        pointerEvents: 'none',
        '&$opened': {
            opacity: 0.5,
            pointerEvents: 'unset',
        },
        webkitTapHighlightColor: 'transparent',
    },
    menu: {
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        height: 350,
        backgroundColor: '#FFDC2A',
        zIndex: 102,
        transform: 'translateY(100%)',
        transition: 'transform 450ms cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform',
        '&$opened': {
            transform: 'translateY(0)',
        },

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    info: {
        fontSize: 14,
        lineHeight: 1,
        position: 'absolute',
        top: -40,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#FFFFFF',
        pointerEvents: 'none',
        userSelect: 'none',
        opacity: 0,
        transition: 'opacity 450ms linear',
        willChange: 'opacity',
        letterSpacing: 2.5,
        '&$opened': {
            opacity: 1,
        },
    },
    opened: {},
});

function Hamburger({ source }) {
    const classes = useStylesHamburger();
    const [opened, setOpened] = useState(false);
    const open = useCallback(() => setOpened(true), []);
    const close = useCallback(() => setOpened(false), []);
    const renderHeading = useCallback(({ level, children }) => level === 1 && (
        <Entry close={close}>{children}</Entry>
    ), [close]);

    return <>
        <div className={classes.root} onClick={open}>
            <img className={classes.icon} src={menu} alt="Menu Button"/>
        </div>
        <div className={classNames(classes.overlay, { [classes.opened]: opened })} onClick={close}/>
        <div className={classNames(classes.menu, { [classes.opened]: opened })}>
            <div className={classNames(classes.info, { [classes.opened]: opened })}>点击此处收起菜单</div>
            <ReactMarkdown
                source={source}
                disallowedTypes={['paragraph', 'list', 'table']}
                renderers={{ heading: renderHeading }}/>
        </div>
    </>;
}

const useStyleFooter = makeStyles({
    root: {
        height: 32,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#e62f2c',
        padding: '0 16px',
    },
    text: {
        fontSize: 12,
        color: '#FFFFFF',
    },
});

function Footer() {
    const classes = useStyleFooter();
    return (
        <div className={classes.root}>
            <Typography classes={{ root: classes.text }}>
                &copy;2020 蔡愚 严子涵 李奕扬
            </Typography>
        </div>
    )
}

const useStyles = makeStyles({
    headerContainer: {
        paddingBottom: 30,
        marginBottom: -30,
        overflow: 'hidden',
    },
    header: {
        height: 283,
        backgroundColor: '#e62f2c',
        position: 'relative',
        borderBottom: '2px solid #e62f2c',
        boxSizing: 'border-box',
    },
    noOverflow: {
        overflow: 'hidden',
    },
    title: {
        position: 'absolute',
        left: 16,
        top: 64,
        height: 48,
        color: 'white',
        fontSize: 48
    },
});

function MobilePage({ title, titleImage, content, image, height, margin, noOverflow }) {
    const classes = useStyles();
    return (
        <div>
            <Helmet title={`${title} - UNO`}/>
            <div className={classes.headerContainer}>
                <div className={classNames(classes.header, { [classes.noOverflow]: noOverflow })}>
                    <PageIcon image={image} height={height} margin={margin}/>
                    {/* <img src={titleImage} className={classes.title} alt={title}/> */}
                    <span className={classes.title}>{title}</span>
                </div>
            </div>
            <Back/>
            {/* <Hamburger source={content}/> */}
            <Article>{content}</Article>
            <Footer/>
        </div>
    )
}

export default MobilePage;
