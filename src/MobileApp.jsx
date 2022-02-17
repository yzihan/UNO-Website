/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react';
import { Route, Switch } from 'react-router';
import { TransitionGroup } from 'react-transition-group';
import CSSTransition from 'react-transition-group/CSSTransition';
import useRouter from 'use-react-router';

import './transitions.css';
import player from 'assets/images/player.svg';
import unoCard from 'assets/images/uno-card.svg';
import containers from 'assets/images/containers.svg';
import backgroundImage from 'assets/images/background.svg';
import creativityImage from 'assets/images/creativity.svg';
import servicingImage from 'assets/images/servicing.svg';
import background from '!!raw-loader!docs/background.md';
import creativity from '!!raw-loader!docs/creativity.md';
import servicing from '!!raw-loader!docs/servicing.md';

import MobilePage from './MobilePage';
import MobileHome from './MobileHome';
import MobileMap from './MobileMap';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function MobileApp() {
    const { location: { pathname }, location, history: { action } } = useRouter();
    return (
        <TransitionGroup childFactory={child => React.cloneElement(
            child,
            { classNames: action === 'POP' ? 'pop' : 'push' },
        )}>
            <CSSTransition key={pathname} timeout={500} classNames="push" unmountOnExit>
                <Switch location={location}>
                    <Route path="/" exact component={MobileHome}/>
                    <Route path="/background" render={() => (
                        <MobilePage
                            image={containers} height="110%" margin="0 0 -16px 0"
                            title="背景调研" content={background} titleImage={undefined}/>
                    )}/>
                    <Route path="/creativity" render={() => (
                        <MobilePage
                            image={unoCard} height="240%" margin="0 48px -96px 0" noOverflow
                            title="创意迭代" content={creativity} titleImage={undefined}/>
                    )}/>
                    <Route path="/servicing" render={() => (
                        <MobilePage
                            image={player} height="97%" margin="0 20px -3px 0"
                            title="服务流程设计" content={servicing} titleImage={undefined}/>
                    )}/>
                    {/* <Route path="/exhibition" component={MobileMap}/> */}
                    <Route path="/exhibition" render={() => (
                        <MobilePage
                            image={unoCard} height="240%" margin="0 48px -96px 0" noOverflow
                            title="成果展示" content={"# 无法显示\n\n对不起，当前页面无法在手机等屏幕过小的设备上查看，请使用电脑访问或尝试增大你的屏幕宽度。"} titleImage={undefined}/>
                    )}/>
                    <Redirect to="/"/>
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default MobileApp;
