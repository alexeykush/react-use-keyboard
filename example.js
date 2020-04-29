import { useMemo, useCallback } from "react";

import useKeyboard, {KEYBOARD} from ".";

import React from 'react';

const Example = () => {
    const handler1 = useCallback(e => {
        console.log("comma");
    }, []);

    const handler2 = useCallback(e => {
        console.log("1 or 2");
    }, []);

    const handler3 = useCallback(e => {
        console.log("alt + enter");
    }, []);

    const handler4 = useCallback(e => {
        console.log("comma + enter or alt + subtract");
    }, []);

    const handler5 = useCallback(e => {
        console.log("ctrl + alt + enter");
    }, []);

    const config = useMemo(() => [
        {
            keys: [KEYBOARD.COMMA],
            handler: handler1
        },
        {
            keys: [[KEYBOARD.ONE], [KEYBOARD.TWO]],
            handler: handler2
        },
        {
            keys: [KEYBOARD.ALT, KEYBOARD.ENTER],
            handler: handler3
        },
        {
            keys: [[KEYBOARD.COMMA, KEYBOARD.ENTER], [KEYBOARD.ALT, KEYBOARD.SUBTRACT]],
            handler: handler4
        },
        {
            keys: [KEYBOARD.CTRL, KEYBOARD.ALT, KEYBOARD.ENTER],
            handler: handler5
        }
    ], [handler1, handler2, handler3, handler4, handler5]);

    // useKeyboard resets listeners on every config change, so it's better to wrap in useMemo
    useKeyboard(config);

    return null;
};

export default Example;