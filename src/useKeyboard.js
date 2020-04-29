import {useEffect, useRef, useCallback} from "react";

const mapToArray = data => Array.isArray(data) ? data : [data];

/**
 * @param config {( Array<{keys: Array<number>, handler: function}>|Array<{ keys: Array<Array<number>>, handler: function )}> }
 * @param target {Document | Element | Window}
*/
const useKeyboard = (config, target = document) => {
    const buffer = useRef([]).current;

    const isMatch = useCallback(keys => (
        keys.length === buffer.length &&
        mapToArray(keys).every((keyCode, index) => buffer.indexOf(keyCode) === index)
    ), []);

    useEffect(() => {
        const handleKeyDown = e => {
            if (!buffer.includes(e.keyCode)) buffer.push(e.keyCode);

            config
                .filter(({keys}) => Array.isArray(keys[0]) ? keys.some(isMatch) : isMatch(keys))
                .forEach(item => item.handler(e));
        };

        const handleKeyUp = e => {
            const index = buffer.indexOf(e.keyCode);
            if (~index) buffer.splice(index, 1);
        };

        target.addEventListener("keydown", handleKeyDown);
        target.addEventListener("keyup", handleKeyUp);

        return () => {
            target.removeEventListener("keydown", handleKeyDown);
            target.removeEventListener("keyup", handleKeyUp);
        };
    }, [config]);
};

export default useKeyboard;