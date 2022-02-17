import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import MobileLanding from './MobileLanding';
import MobileEntries from './MobileEntries';
import MobileFooter from './MobileFooter';

function MobileHome() {
    const [ref, setRef] = useState();
    const onMoreClick = useCallback(() => {
        if (!ref) return;
        ref.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, [ref]);
    return (
        <div>
            <Helmet title="UNO"/>
            <MobileLanding onMoreClick={onMoreClick}/>
            <MobileEntries entriesRef={setRef}/>
            <MobileFooter/>
        </div>
    );
}

export default MobileHome;
