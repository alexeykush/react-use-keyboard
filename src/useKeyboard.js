import {useEffect} from "react";

import {KEYBOARD} from "./constants";

/**
 * @param config {( Array<{keys: Array<number>, handler: function}>|Array<{ keys: Array<Array<number>>, handler: function )}> }
*/
const useKeyboard = config => {
    useEffect(() => {
        const buffer = [];
        const handleKeyDown = e => {
            if (!buffer.includes(e.keyCode)) {
                buffer.push(e.keyCode);
            }

            const isMatch = keys => (
                keys.length === buffer.length &&
                keys.every((keyCode, index) => buffer.indexOf(keyCode) === index)
            );

            const existing = config.find( ({keys}) => Array.isArray(keys[0]) ? keys.some(isMatch) : isMatch(keys));
            if (existing) {
                existing.handler(e);
            }
        };
        const handleKeyUp = e => {
            const index = buffer.indexOf(e.keyCode);
            if (~index) {
                buffer.splice(index, 1);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);
};

export {KEYBOARD};

export default useKeyboard;