import useKeyboard, {KEYBOARD} from "./index";

useKeyboard([
    {
        keys: [KEYBOARD.COMMA],
        handler: e => {
            console.log("comma");
        }
    },
    {
        keys: [[KEYBOARD.ONE], [KEYBOARD.TWO]],
        handler: e => {
            console.log("1 or 2");
        }
    },
    {
        keys: [[KEYBOARD.ALT, KEYBOARD.ENTER]],
        handler: e => {
            console.log("alt + enter");
        }
    },
    {
        keys: [[KEYBOARD.COMMA, KEYBOARD.ENTER], [KEYBOARD.ALT, KEYBOARD.SUBTRACT]],
        handler: e => {
            console.log("comma + enter or alt + subtract");
        }
    },
    {
        keys: [KEYBOARD.CTRL, KEYBOARD.ALT, KEYBOARD.ENTER],
        handler: e => {
            console.log("ctrl + alt + enter");
        }
    }
]);