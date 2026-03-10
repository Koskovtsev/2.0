import { useState, useEffect } from "react";
import applauseSound from '../assets/03.mp3';
// import matadorImage from '../src/assets/matador.png'
let globalMatadorPosition: number;
let globalMatador: any;
let someGlobalFunc;

type properties = { applause?: number, setMatarodPosition?(params: number): void, matadorPosition?: number };

declare global {
    interface DocumentEventMap {
        'bullRun': CustomEvent<{ position: number }>;
    }
}
const Matador = (props: properties) => {
    let isHaveToRender = false;
    const [notGlobalMatador, notGlobalFunc] = useState(props.applause);

    const handleBull = ({ detail }: CustomEvent<{ position: number }>) => {
        if (detail.position === props.matadorPosition) {
            const currentMatadorPosition = props.matadorPosition;
            const newMatadorPosition = getRandomPosition(currentMatadorPosition || 0);
            props.setMatarodPosition?.(newMatadorPosition);
            console.log(`Matador is moving from ${currentMatadorPosition} to ${newMatadorPosition}`);
        }
    }

    useEffect(() => {
        if (props.applause === 3 && notGlobalMatador !== 3) {
            console.log("ОПЛЕСКИ 3!");
            const oleAudio = new Audio(applauseSound);
            oleAudio.play().catch(e => console.log('audio is blocked'));
        } else {
            if (props.applause === 3 && notGlobalMatador === 3) {
                console.log('це могли бути повторні ОПЛЕСКИ 3');
            }
        }
        notGlobalFunc(props.applause);

    }, [props.applause]);

    useEffect(() => {
        document.addEventListener('bullRun', handleBull);
        return () => {
            document.removeEventListener('bullRun', handleBull);
        }
    }, []);
    console.log('матадор відрендерився')

    return isHaveToRender ? <div><img src="../src/assets/matador.png" style={{ width: '150px', height: '200px' }} alt="matador"></img></div>
}

function getRandomPosition(number: number) {
    let newPosition = Math.floor(Math.random() * 8);
    if (newPosition >= number) {
        newPosition += 1;
    }
    return newPosition;
}

export { Matador };