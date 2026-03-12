import { useState, useEffect, useRef } from "react";
import applauseSound from '../assets/03.mp3';
// import matadorImage from '../src/assets/matador.png'
// let globalMatadorPosition: number;
// let globalMatador: any;
// let someGlobalFunc;

type properties = { applause?: number, setMatarodPosition?(params: number): void, matadorPosition?: number };

declare global {
    interface DocumentEventMap {
        'bullRun': CustomEvent<{ position: number }>;
    }
}
const Matador = (props: properties) => {
    let isHaveToRender = false;
    const [applause, setApplause] = useState(props.applause);
    const rerenderCounter = useRef(0);
    rerenderCounter.current += 1;
    console.log(`number of rerender: ${rerenderCounter.current}`);

    const handleBull = ({ detail }: CustomEvent<{ position: number }>) => {
        // let ref = useRef();
        if (detail.position === props.matadorPosition) {
            const currentMatadorPosition = props.matadorPosition;
            const newMatadorPosition = getRandomPosition(currentMatadorPosition || 0);
            // let ref = useRef(newMatadorPosition);
            props.setMatarodPosition?.(newMatadorPosition);
            console.log(`Matador is moving from ${currentMatadorPosition} to ${newMatadorPosition} and ref is`);
            isHaveToRender = true;
        }
    }

    useEffect(() => {
        if (props.applause === 3 && applause !== 3) {
            console.log("ОПЛЕСКИ 3!");
            const oleAudio = new Audio(applauseSound);
            oleAudio.play().catch(e => console.log('audio is blocked'));
            setApplause(3);
        } else {
            if (props.applause !== 3 && applause !== props.applause) {
                console.log('це могли бути повторні ОПЛЕСКИ 3');
                setApplause(props.applause);
            }
        }

    }, [props.applause, applause]);

    useEffect(() => {
        document.addEventListener('bullRun', handleBull);
        isHaveToRender = true;
        return () => {
            document.removeEventListener('bullRun', handleBull);
        }
    }, []);
    isHaveToRender && console.log('матадор відрендерився')
    return <div><img src="../src/assets/matador.png" style={{ width: '150px', height: '200px' }} alt="matador"></img><p>Я ТУТ!</p></div>;
}

function getRandomPosition(number: number) {
    let newPosition = Math.floor(Math.random() * 8);
    if (newPosition >= number) {
        newPosition += 1;
    }
    return newPosition;
}

export { Matador };