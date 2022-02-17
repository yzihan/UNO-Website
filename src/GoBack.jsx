import React from 'react';
import useRouter from 'use-react-router';

function GoBack({ children }) {
    const { history: { goBack } } = useRouter();
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    return <a onClick={goBack}>{children}</a>;
}

export default GoBack;
