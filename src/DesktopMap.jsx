import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';
import { Manager, Popper, Reference } from 'react-popper';
import { createPortal } from 'react-dom';

import {Helmet} from 'react-helmet';

import map from 'assets/images/map-content.svg';
import toHome from 'assets/images/to-home.svg';

import qrcode from 'assets/images/qrcode.svg';
import card from 'assets/images/card.svg';
import stamp from 'assets/images/stamp.svg';
import box2obj1hover from 'assets/images/box2obj1hover.svg';
import box2obj2hover from 'assets/images/box2obj2hover.svg';
import box2obj3hover from 'assets/images/box2obj3hover.svg';

import { useCombinedRefs, useHover, useWindowSize } from './util';

const useStyles = makeStyles({
    container: {
        // position: 'absolute',
        // top: 0,
        // bottom: 0,
        margin: 'auto',
        width: '100%',
        maxWidth: 1024,
        // height: '100%',
        // overflow: 'hidden',
        background: '#000000',
        fontFamily: 'Verdana,Microsoft YaHei,Helvetica,Arial,Tahoma,sans-serif'
    },
    button: {
        position: 'fixed',
        left: 32,
        top: 64,
        backgroundColor: '#000000',
        padding: 0,
        cursor: 'pointer',
        border: 'none',
        marginRight: 24,
    },
    buttonImage: {
        height: 48,
    },
    inner: {
        marginTop: 181,
        overflow: 'hidden',
    },
    footer: {
        padding: '20px',
        minHeight: 216,
        display: 'flex',
        // alignContent: 'center',
        justifyContent: 'space-between',
    },
    avatar: {
        width: 137,
    },
    normalFont: {
        fontSize: 14,
        color: '#ffffff',
        padding: 0,
        margin: 5,
    },
    userRank: {
        fontSize: 48,
        color: '#ffffff',
        padding: 0,
        margin: 5,
    },
    topBarContainer: {
        width: '100%',
        height: 0,
        textAlign: 'center',
    },
    topNavBar: {
        position: 'relative',
        width: 75,
        height: 100,
        top: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    pupil: {
        position: 'relative',
        background: '#ffffff',
        height: 16,
        width: 16,
        borderRadius: 8,
        display: 'block',
    },
    ticketTitle: {
        display: 'inline-block',
        height: 28,
        background: '#ffffff',
        margin: 20,
        marginTop: 0,
        marginRight: 10,
        verticalAlign: 'top',
    },
    ticketValue: {
        display: 'inline-block',
        width: 72,
        height: 100,
        fontSize: 72,
        color: '#ffffff',
    },
    miniMap: {
        position: 'fixed',
        right: 32,
        top: 36,
        padding: 0,
        border: 'none',
        marginLeft: 24,
        width: 160,
        height: 120,
    },
    navBox: {
        display: 'block',
        position: 'relative',
        cursor: 'pointer',
        ['&:hover']: {
            boxShadow: '0 0 10px #666666',
        }
    },
    navBoxContainer: {
        width: 0,
        height: 0,
    },
    navLabelContainer: {
        color: '#ffffff',
        fontSize: 24,
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        width: 400,
        transition: '0.4s',
    },
    navLabel: {
        display: 'inline-block',
        verticalAlign: 'top',
        opacity: 0.8,
        transition: '0.4s',
        cursor: 'pointer',
        position: 'relative',
        top: 0,
        width: 100,
        ['&:hover']: {
            opacity: 1,
        },
    },
    navHelper: {
        display: 'inline-block',
        color: '#565656',
        fontWeight: 'bold',
        fontFamily: 'initial',
        verticalAlign: 'top',
        position: 'relative',
        top: -3,
        pointerEvents: 'none',
    },
    pageContainer: {
        width: '33.3333333333%',
        display: 'inline-block',
        transition: '0.4s',
        height: '100%',
        position: 'absolute',
    },
    bgImage: {
        // width: '100%',
        // height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    bgImageFadingOut: {
        position: 'absolute',
        left: 0,
        top: 0,
        animation: 'doorfadeout 3s',
    },
    clickableObject: {
        // width: '100%',
        // height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        cursor: 'pointer',
        ['&:hover']: {
            boxShadow: '0 0 20px rgba(255,255,72,0.9)',
        },
    },
    clickableOverlay: {
        // width: '100%',
        // height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        cursor: 'pointer',
        opacity: 0,
        transition: '0.2s',
        ['&:hover']: {
            opacity: 1,
        },
    },
    dialogOverlay: {
        display: 'block',
        position: 'fixed',
        background: '#000000',
        opacity: 0.5,
        left: 0,
        bottom: 0,
        right: 0,
        top: 0,
        zIndex: 1001,
    },
    dialog: {
        border: 'none',
        borderRadius: 10,
        padding: 0,
        top: 30,
        width: 340,
        height: 340,
        textAlign: 'center',
        zIndex: 1002,
        ['&:after']: {
            position: 'absolute',
            bottom: 0,
            left: '20%',
            display: 'block',
            content: '""',
            background: '#000',
            width: '60%',
            height: '4px',
        },
    },
    dialogTitle: {
        display: 'flex',
        height: 50,
        lineHeight: '50px',
        fontSize: '18px',
        letterSpacing: 2,
        width: '60%',
        background: '#000000',
        color: '#ffffff',
        margin: '4px auto',
        justifyContent: 'space-between',
        padding: 4,
        ['&:before']: {
            height: 10,
            width: 10,
            borderRadius: 5,
            left: '8px',
            display: 'inline-block',
            content: '""',
            background: '#ffffff',
            float: 'left',
            margin: '20px 4px',
        },
        ['&:after']: {
            height: 10,
            width: 10,
            borderRadius: 5,
            left: '8px',
            display: 'inline-block',
            content: '""',
            background: '#ffffff',
            float: 'left',
            margin: '20px 4px',
        },
    },
    dialogButton: {
        color: '#ffffff',
        display: 'block',
        fontSize: 12,
        height: 36,
        lineHeight: '36px',
        borderRadius: 18,
        background: '#e62f2c',
        width: '30%',
        position: 'absolute',
        bottom: 33,
        left: '35%',
        cursor: 'pointer',
        letterSpacing: 2,
        ['&[data-primary]']: {
            background: '#000000',
        },
        ['&[data-disabled]']: {
            cursor: 'default',
            background: '#d8d8d8',
        },
        // transition: '0.1s',
    },
    dialogText: {
        margin: '30px auto 20px auto',
        display: 'block',
        ['&[data-hint]:after']: {
            display: 'block',
            color: '#d8d8d8',
            content: 'attr(data-hint)',
            fontSize: 10,
        },
    },
});

const transformEllipsoid = ({ x: x0, y: y0, z: z0 }, { a, b, c }) => {
    const k = Math.sqrt(1 / (x0 * x0 / a / a + y0 * y0 / b / b + z0 * z0 / c / c));
    return { x: k * x0, y: k * y0, z: k * z0 };
};

function Page1({classes, style, active, removeTicket, resetTicket}) {
    const [dialogOpen, setDialogOpen] = useState(0);
    const [selection, setSelection] = useState(null);
    const [ticketSelected, setTicketSelected] = useState(0);
    const tickets = [
        '/images/ticket_3.png',
        '/images/ticket_2.png',
        '/images/ticket_1.png',
    ];
    const images = [
        '/images/card1.png',
        '/images/card2.png',
        '/images/card3.png',
        '/images/card4.png',
    ];
    return (
        <div style={{opacity: active ? 1 : 0, ...style}} className={classes.pageContainer}>
            {/* <img className={classes.bgImage} src="/images/background.png" style={{height: '100%', pointerEvents: 'none'}}/> */}
            <img className={classes.bgImage} src="/images/bg1.png" style={{height: '145%', top: '-21%', left: '-10.5%'}}/>
            {/* <img className={classes.bgImage} src="/images/machine1.png" style={{height: '60%', left: '5%', top:'37%'}}/> */}
            <img className={classes.clickableOverlay} src="/images/machine1_hover.png" style={{height: '65.7%', left: '3.2%', top:'33.1%'}} onClick={() => {setSelection(null); setDialogOpen(1)}}/>
            {/* <img className={classes.bgImage} src="/images/machine2.png" style={{height: '85%', left: '79%', top:'17%'}}/> */}
            <img className={classes.clickableOverlay} src="/images/machine2_hover.png" style={{height: '75%', left: '81%', top:'19.4%'}} onClick={() => setDialogOpen(3)}/>
            {/* <img className={classes.bgImage} src="/images/machine3.png" style={{height: '55%', left: '32%', top:'44%'}}/> */}
            {/* <img className={classes.clickableOverlay} src="/images/machine3_hover.png" style={{height: '61.2%', left: '31.3%', top:'43.647%'}}/> */}
            {
                dialogOpen !== 0
                    ? <div className={classes.dialogOverlay} onClick={() => setDialogOpen(0)}/>
                    : null
            }
            {/* <img className={classes.bgImage} src="/images/light.png" style={{height: '70%', left: '28%', top: '5%', pointerEvents: 'none'}}/> */}
            {/* <img className={classes.bgImage} src="/images/layer1.png" style={{height: '100%', pointerEvents: 'none'}}/> */}
            <dialog className={classes.dialog} open={dialogOpen !== 0}>
                <span className={classes.dialogTitle}>
                    {dialogOpen === 3 ? '定制打印机' : '自动贩售机'}
                </span>

                <span className={classes.dialogText} data-hint={dialogOpen === 1 ? '（*由于技术限制，此处仅列举部分）' : undefined}>
                {
                    [
                        '请选择喜欢的UNO卡牌',
                        '恭喜获得！',
                        ['扫码关注公众号，上传图片', <br/>, '获得定制UNO卡牌（单张）'],
                    ][dialogOpen - 1]
                }
                </span>

                { dialogOpen !== 3 ? null : <img style={{width: 100, display: 'block', margin: '0 auto'}} src={qrcode}/> }
                { dialogOpen !== 1 ? null : (
                    <div style={{margin: '40px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}> 
                        <span style={{display: 'inline-block', transform: 'rotate(45deg)', border: '2px solid #d8d8d8', borderTop: 'none', borderRight: 'none', width: '10px', height: '10px'}}/>
                        {images.map((imgsrc, i) => 
                            <img src={imgsrc} style={{ height: 50, padding: 10, border: selection === i ? '1px solid #e62f2c' : '1px solid transparent', cursor: 'pointer', transition: '0.1s' }} onClick={() => setSelection(i)}/>
                        )}
                        <span style={{display: 'inline-block', transform: 'rotate(45deg)', border: '2px solid #d8d8d8', borderBottom: 'none', borderLeft: 'none', width: '10px', height: '10px'}}/>
                    </div>)
                }
                { dialogOpen !== 2 ? null : (
                    [<div style={{margin: '40px 20px 10px 20px', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}> 
                        <img src={images[selection]} style={{width: 50}}/>
                        +
                        <span style={{display: 'inline-flex', alignItems: 'center'}}>
                            <img src={tickets[ticketSelected]} style={{width: 50}}/>
                            *1
                        </span>
                    </div>,
                    <div style={{margin: '0 20px', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}> 
                        <span style={{width: 110, display: 'inline-block'}}>UNO卡牌&nbsp;</span>
                        <span style={{width: 60, display: 'inline-block'}}>&nbsp;</span>
                        <span style={{width: 110, display: 'inline-block'}}>
                            兑换券
                            <span style={{display: 'block', fontSize: 8}}>背面写有详细使用规则哦！</span>
                        </span>
                    </div>
                    ])
                }
                
                {
                    dialogOpen === 3 || dialogOpen === 2
                        ? <span className={classes.dialogButton} data-primary onClick={() => setDialogOpen(0)}>完成</span>
                        : selection === null
                            ? <span className={classes.dialogButton} data-disabled>确认购买</span>
                            : <span className={classes.dialogButton} onClick={() => {setTicketSelected(Math.floor(Math.random() * tickets.length));resetTicket(tickets[ticketSelected]);setDialogOpen(2)}}>确认购买</span>
                }
            </dialog>
        </div>
    )
}

function Page2({classes, style, active, resetTicket, ticket}) {
    const [dialogOpen, setDialogOpen] = useState(0);
    const [countdown, setCountdown] = useState(3);
    const [game, setGame] = useState(0);
    const Game = ['UNO友尽体验', 'STAY IN THE GREEN', 'UNO鬼牌血统大挑战'];
    console.log(ticket, game, ticket.indexOf(game));
    return (
        <div style={{opacity: active ? 1 : 0, ...style}} className={classes.pageContainer}>
            <img className={classes.bgImage} src="/images/bg2_real.png" style={{height: '145%', top: '-21%', left: '-10.5%'}}/>
            <img className={classes.clickableOverlay} src={box2obj2hover} style={{height: '83.3%', top: '11%', left: '24.75%'}} onClick={() => {setGame(1);setDialogOpen(1)}}/>
            <img className={classes.clickableOverlay} src={box2obj1hover} style={{height: '13.5%', top: '54%', left: '2.8%'}} onClick={() => {setGame(0);setDialogOpen(1)}}/>
            <img className={classes.clickableOverlay} src={box2obj3hover} style={{height: '37.6%', top: '65.5%', left: '60.5%'}} onClick={() => {setGame(2);setDialogOpen(1)}}/>
            <img className={active ? classes.bgImageFadingOut : classes.bgImage} src="/images/bg2.png" style={{height: '145%', top: '-21%', left: '-10.5%', opacity: 0, pointerEvents: 'none'}}/>
            {
                dialogOpen !== 0
                    ? <div className={classes.dialogOverlay} onClick={() => setDialogOpen(0)}/>
                    : null
            }
            
            <dialog className={classes.dialog} open={dialogOpen !== 0}>
                <span className={classes.dialogTitle}>
                    {dialogOpen === 1 ? '流程说明' : '体验环节'}
                </span>

                <span className={classes.dialogText} style={{marginTop: 15}}>
                {
                    [Game[game],<span style={{height: 6, display: 'block'}}/>,[
                        ticket.indexOf(game) === -1 ? (ticket.length > 0 ? ['准备好你的集章卡',<br/>,'开始体验吧！'] : ['请仔细阅读规则说明',<br/>,'并领取集章卡吧！']) : '你已拥有这枚印章了！',
                        ['就要开始喽！',<br/>,<br/>,countdown + '！',<br/>,<br/>,'（单次体验时间最长为3分钟）'],
                        '恭喜完成！',
                    ][dialogOpen - 1]]
                }
                </span>

                { dialogOpen !== 1 ? null : <img src={card} style={{width: 150}} /> }
                { dialogOpen !== 3 ? null : <img src={stamp} style={{width: 110}} /> }
                
                {
                    
                    <span className={classes.dialogButton} data-primary={dialogOpen === 3 || dialogOpen === 1} data-disabled={dialogOpen === 2 ? 'true' : undefined} onClick={() => {
                        if(dialogOpen === 1) {
                            if(ticket.indexOf(game) !== -1) {
                                setDialogOpen(0);
                                return;
                            }
                            resetTicket();
                            setDialogOpen(2);
                            setCountdown(3);
                            setTimeout(() => {
                                setCountdown(2)
                            }, 1000);
                            setTimeout(() => {
                                setCountdown(1)
                            }, 2000);
                            setTimeout(() => {
                                setDialogOpen(3);
                                resetTicket(game);
                            }, 3000);
                        } else if(dialogOpen === 3) {
                            setDialogOpen(0);
                        }
                    }}>{
                        ['完成','进行中……','领取印章'][dialogOpen - 1]
                    }</span>
                }
            </dialog>
        </div>
    )
}

function Page3({classes, style, active}) {
    return (
        <div style={{opacity: active ? 1 : 0, ...style}} className={classes.pageContainer}>
            <video className={classes.bgImage} controls style={{height: '100%', zIndex: 999, left: '5.5%'}}>
                <source src="/images/box3.mp4" type="video/mp4" />
            </video>
        </div>
    )
}

function DesktopMap() {
    const classes = useStyles();
    const { width: winW, height: winH } = useWindowSize();
    const [page, setPage] = React.useState(0);
    const [ticket1, setTicket1] = React.useState(2);
    const [ticket2, setTicket2] = React.useState(0);

    const [tickets, setTickets] = React.useState(['/images/ticket_3.png', '/images/ticket_2.png'/*, '/images/ticket_1.png'*/]);
    const [ticketB, setTicketB] = React.useState([]);

    const removeTicket = useCallback(() => {
        if(tickets.length > 0) {
            setTicket1(ticket1 - 1);
        }
        const k = [];
        for(let i = 1; i < tickets.length; i++) {
            k.push(tickets[i]);
        }
        setTickets(k);
    }, [tickets, ticket1]);

    const resetTicket = useCallback((ticket) => {
        setTicket1(ticket1 + 1);
        if(ticket !== undefined) {
            tickets.push(ticket)
        } else {
            tickets.push('/images/ticket_1.png');
        }
        setTickets(tickets);
    }, [tickets, ticket1]);

    const resetTicketB = useCallback((val) => {
        if(val !== undefined) {
            ticketB.push(val);
        } else {
            setTicket2(ticket2 + 1);
            ticketB.push(card)
        }
        setTicketB(ticketB);
    }, [ticketB, ticket2]);

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
            ey: top * 0.33 + bottom * 0.67, // magic numbers, center of eyes is 83% from top of the image
        });
    }, [eyesEl]);
    useEffect(measureEyes, [eyesEl]);
    useEffect(() => {
        window.addEventListener('resize', measureEyes);
        return () => window.removeEventListener('resize', measureEyes);
    }, [measureEyes]);

    const initial = (x === 0 && y === 0);
    const { x: dx, y: dy } = 
        initial
            ? {x : 0, y: 0}
            : transformEllipsoid({ x: x - ex, y: y - ey, z: 200 }, { a: 20, b: 9, c: 7.5 });
    
    const [pageEl, setPageEl] = useState(null);
    const [{ pageWidth = 0, pageHeight = 0 }, setPageSize] = useState({});
    const measurePage = useCallback(() => {
        if (!pageEl) return;
        const [{ left, right, top, bottom }] = pageEl.getClientRects();
        const wid = right - left;
        setPageSize({
            pageWidth: wid,
            pageHeight: wid * 480 / 1024,
        });
    }, [pageEl]);
    useEffect(measurePage, [pageEl]);
    useEffect(() => {
        window.addEventListener('resize', measurePage);
        return () => window.removeEventListener('resize', measurePage);
    }, [measurePage]);

    return (
        <div className={classes.container}>
            <Helmet>
                <style>{"body{background:#000000;overflow-x:hidden}.door{opacity:0}@keyframes doorfadeout{from{opacity:1}20%{opacity:1}to{opacity:0}}@keyframes doorfadel{from{opacity:1}40%{opacity:1;margin-left:0}to{opacity:0;margin-left:-600px}}@keyframes doorfader{from{opacity:1}40%{opacity:1;margin-left:0}to{opacity:0;margin-left:300px}}"}</style>
            </Helmet>
            <Link to="/">
                <button className={classes.button}>
                    <img src={toHome} className={classes.buttonImage} alt=""/>
                </button>
            </Link>
            <div className={classes.miniMap}>
                <div className={classes.navBoxContainer}>
                    <span className={classes.navBox} style={{
                        width: 50, height: 20, left: 70, top: 80,
                        transform: 'rotate(-12deg)',
                        background: page === 2 ? '#da3f3f' : '#868686'}} onClick={() => setPage(2)}></span>
                </div>
                <div className={classes.navBoxContainer}>
                    <span className={classes.normalFont} style={{
                        position: 'relative',
                        left: 85, top: 80,
                        pointerEvents: 'none'
                    }}>3</span>
                </div>
                <div className={classes.navBoxContainer}>
                    <span className={classes.navBox} style={{
                        width: 90, height: 40, left: 50, top: 5,
                        transform: 'rotate(8deg)',
                        background: page === 1 ? '#da3f3f' : '#868686'}} onClick={() => setPage(1)}></span>
                </div>
                <div className={classes.navBoxContainer}>
                    <span className={classes.normalFont} style={{
                        position: 'relative',
                        left: 85, top: 15,
                        pointerEvents: 'none'
                    }}>2</span>
                </div>
                <div className={classes.navBoxContainer}>
                    <span className={classes.navBox} style={{
                        width: 40, height: 80, left: 10, top: 10,
                        transform: 'rotate(10deg)',
                        background: page === 0 ? '#da3f3f' : '#868686'}} onClick={() => setPage(0)}></span>
                </div>
                <div className={classes.navBoxContainer}>
                    <span className={classes.normalFont} style={{
                        position: 'relative',
                        left: 20, top: 40,
                        pointerEvents: 'none'
                    }}>1</span>
                </div>
            </div>
            <div className={classes.topBarContainer}>
                <div className={classes.topNavBar}>
                    <p style={{width: 0, height: 0}}>
                        <span className={classes.pupil} style={{left: 30 + dx, top: 45 + dy}}></span>
                    </p>
                    <img style={{width: 75, height: 54}} ref={setEyesEl} src="/images/eye.png"/>
                    <div className={classes.navLabelContainer} style={{
                        left: -page * 150 - 12.5
                    }}>
                        <span className={classes.navLabel} style={{
                            top: page === 0 ? 10 : undefined,
                            opacity: page === 0 ? 1 : undefined,
                        }} onClick={() => setPage(0)}>
                            1<br/>
                            原料区
                        </span>
                        <span className={classes.navHelper}>...</span>
                        <span className={classes.navLabel} style={{
                            top: page === 1 ? 10 : undefined,
                            opacity: page === 1 ? 1 : undefined,
                        }} onClick={() => setPage(1)}>
                            2<br/>
                            加工区
                        </span>
                        <span className={classes.navHelper}>...</span>
                        <span className={classes.navLabel} style={{
                            top: page === 2 ? 10 : undefined,
                            opacity: page === 2 ? 1 : undefined,
                        }} onClick={() => setPage(2)}>
                            3<br/>
                            场馆概览
                        </span>
                    </div>
                </div>
            </div>
            <div className={classes.inner}>
                <div ref={setPageEl} style={{width: '100%', overflow: 'hidden', display: 'inline-block', height: pageHeight}}>
                    <div style={{width: '300%', position: 'relative', left: -page*100 + '%', transition: '0.4s', height: '100%'}}>
                        <Page1 classes={classes} active={page === 0} removeTicket={removeTicket} resetTicket={resetTicket}/>
                        <Page2 classes={classes} active={page === 1} style={{left:'33.333333%'}} resetTicket={resetTicketB} ticket={ticketB}/>
                        <Page3 classes={classes} active={page === 2} style={{left:'66.666667%'}}/>
                    </div>
                </div>
                <div style={{
                    background: 'linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,1))',
                    width: 140,
                    height: pageHeight + 8,
                    position: 'absolute',
                    marginTop: -pageHeight - 6,
                    color: '#ffffff',
                    cursor: (page > 0 ? 'pointer' : 'default'),
                }} onClick={() => page > 0 && setPage(page - 1)}>
                    <div style={{
                        position: 'absolute',
                        left: 40,
                        top: '50%',
                    }}>
                        <div style={{
                            width: 20,
                            height: 20,
                            border: '2px solid',
                            borderColor: (page > 0 ? '#ffffff' : '#b9b6b6'),
                            borderTop: 'none',
                            borderRight: 'none',
                            transform: 'rotate(45deg)',
                        }} />
                    </div>
                </div>
                <div style={{
                    background: 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1))',
                    width: 140,
                    height: pageHeight + 8,
                    position: 'absolute',
                    marginTop: -pageHeight - 6,
                    marginLeft: pageWidth-140,
                    color: '#ffffff',
                    cursor: (page < 2 ? 'pointer' : 'default'),
                }} onClick={() => page < 2 && setPage(page + 1)}>
                    <div style={{
                        position: 'absolute',
                        right: 40,
                        top: '50%',
                    }}>
                        <div style={{
                            width: 20,
                            height: 20,
                            border: '2px solid',
                            borderColor: (page < 2 ? '#ffffff' : '#b9b6b6'),
                            borderBottom: 'none',
                            borderLeft: 'none',
                            transform: 'rotate(45deg)',
                        }} />
                    </div>
                </div>
                <div style={{
                    width: pageWidth,
                    height: pageHeight + 8,
                    position: 'absolute',
                    marginTop: -pageHeight - 6,
                    pointerEvents: 'none',
                    animation: 'doorfadel 5s',
                }} className='door'>
                    <img style={{
                        // width: '100%',
                        height: '149%',
                        marginLeft: '-10%',
                        marginTop: '-10.9%',
                        // marginTop: '-4.3%',
                        // height: '125%',
                    }} src="/images/doorleft.png"/>
                </div>
                <div style={{
                    width: pageWidth,
                    height: pageHeight + 8,
                    position: 'absolute',
                    marginTop: -pageHeight - 6,
                    pointerEvents: 'none',
                    animation: 'doorfader 5s',
                }} className='door'>
                    <img style={{
                        // width: '100%',
                        height: '146%',
                        marginLeft: '-13%',
                        marginTop: '-10.9%',
                        // // marginTop: '-4.3%',
                        // // height: '125%',
                    }} src="/images/doorright.png"/>
                </div>
            </div>
            <div className={classes.footer}>
                <div style={{marginLeft: 40}}>
                    <img className={classes.avatar} src="/images/userAvatar.png"/>
                    <p className={classes.normalFont}>
                        用户编号
                    </p>
                    <p className={classes.userRank}>
                        #001
                    </p>
                </div>
                {/* <div className={classes.normalFont}>
                    *鼠标移到相应位置，就会触发该部分内容<br/>
                    假如点击的话 会跳出弹出信息
                </div> */}
                <div>
                    <div style={{
                        position: 'relative',
                        width: 0,
                        height: 0,
                        left: 20,
                        top: 80,
                        color: '#ffffff',
                    }}><div style={{width: 400}}>{
                        tickets.map((v) => (
                            <img style={{
                                position: 'relative',
                                display: 'inline-block',
                                marginLeft: -20,
                            }} src={v} />
                        ))
                    }</div></div>
                    <img className={classes.ticketTitle} src="/images/ticket1.png"/>
                    <span class={classes.ticketValue}>
                        {ticket1}
                    </span>
                    <div style={{
                        position: 'relative',
                        width: 0,
                        height: 0,
                        left: 20,
                        top: 80,
                        color: '#ffffff',
                        display: 'inline-block',
                    }}><div style={{width: 400}}>{
                        ticketB[0] && (
                            <img style={{
                                position: 'relative',
                                display: 'inline-block',
                                width: 60,
                                transform: 'translateY(-20px)',
                                marginLeft: -20,
                            }} src={ticketB[0]} />
                        )
                    }</div></div>
                    <img className={classes.ticketTitle} src="/images/ticket2.png"/>
                    <span class={classes.ticketValue}>
                        {ticket2}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DesktopMap;

