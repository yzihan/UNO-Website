/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react';
import { Route, Switch } from 'react-router';

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

import DesktopPage from './DesktopPage';
import DesktopHome from './DesktopHome';
import DesktopMap from './DesktopMap';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function DesktopApp() {
    return (
        <Switch>
            <Route path="/" exact component={DesktopHome}/>
            <Route path="/background" render={() => (
                <DesktopPage
                    image={player} height="112%" margin="0 0 -25px 0"
                    title="背景调研" content={background} titleImage={undefined}
                    // desc="待填写ing"
                    />
            )}/>
            <Route path="/creativity" render={() => (
                <DesktopPage
                    image={unoCard} height="192%" margin="0 -10px -128px 0"
                    title="创意迭代" content={creativity} titleImage={undefined} noOverflow
                    // desc="待填写ing"
                    />
            )}/>
            <Route path="/servicing" render={() => (
                <DesktopPage
                    image={containers} height="97%" margin="0 20px -3px 0"
                    title="服务流程设计" content={servicing} titleImage={undefined}
                    // desc="待填写ing"
                    />
            )}/>
            <Route path="/exhibition" component={DesktopMap}/>
            <Redirect to="/"/>
        </Switch>
    )
}

export default DesktopApp;
