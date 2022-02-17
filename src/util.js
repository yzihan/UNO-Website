/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';

const flatten = (text, child) => typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
const flattenChildren = (children) => React.Children.toArray(children).reduce(flatten, '');

const useCombinedRefs = (...refs) => useCallback((element) => refs.forEach(ref => {
    if (!ref) return;
    if (typeof ref === 'function') return ref(element);
    else ref.current = element;
}), refs);

function useWindowSize() {
    const isClient = typeof window === 'object';

    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return false;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
}

const useHover = () => {
    const [hovered, setHovered] = useState(false);
    const onEnter = useCallback(() => {
        setHovered(true);
    }, [setHovered]);
    const onLeave = useCallback(() => {
        setHovered(false);
    }, [setHovered]);
    const [el, setEl] = useState();
    const setRef = useCallback((el) => {
        if (el) setEl(el);
    }, [setEl]);
    useEffect(() => {
        if (!el) return;
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
        return () => {
            el.removeEventListener('mouseenter', onEnter);
            el.removeEventListener('mouseleave', onLeave);
        };
    }, [el, onEnter, onLeave]);
    return [setRef, hovered];
};

export { flattenChildren, useCombinedRefs, useWindowSize, useHover };
