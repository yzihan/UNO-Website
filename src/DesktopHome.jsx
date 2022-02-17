import React from 'react';
import { Helmet } from 'react-helmet';
import DesktopLanding from './DesktopLanding';
import DesktopEntries from './DesktopEntries';
import DesktopFooter from './DesktopFooter';

function DesktopHome() {
    return (
        <div>
            <Helmet title="UNO"/>
            <DesktopLanding/>
            <DesktopEntries/>
            <DesktopFooter/>
        </div>
    );
}

export default DesktopHome;
