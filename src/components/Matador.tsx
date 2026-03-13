import { useState, useEffect, useRef } from "react";
import applauseSound from '../assets/applause-509.wav';
import matadorImg from '../assets/matador.png';

type properties = { applause?: number, setMatarodPosition?(params: number): void, matadorPosition?: number };

declare global {
    interface DocumentEventMap {
        'bullRun': CustomEvent<{ position: number }>;
    }
}
const Matador = (props: properties) => {

    const [applause, setApplause] = useState(props.applause);

    const handleBull = ({ detail }: CustomEvent<{ position: number }>) => {
        if (detail.position === props.matadorPosition) {
            const currentMatadorPosition = props.matadorPosition;
            const newMatadorPosition = getRandomPosition(currentMatadorPosition || 0);
            props.setMatarodPosition?.(newMatadorPosition);
            console.log(`Matador is moving from ${currentMatadorPosition} to ${newMatadorPosition}`);
        }
    }

    useEffect(() => {
        if (props.applause === 3 && applause !== 3) {
            const oleAudio = new Audio(applauseSound);
            oleAudio.play().catch(e => console.log('audio is blocked'));
            setApplause(3);
        }
         else {
            if (props.applause !== 3 && applause !== props.applause) {
                setApplause(props.applause);
            }
        }

    }, [props.applause, applause]);

    useEffect(() => {
        document.addEventListener('bullRun', handleBull);
        return () => {
            document.removeEventListener('bullRun', handleBull);
        }
    }, []);

    return <div><img src={matadorImg} style={{ width: '150px', height: '200px' }} alt="matador"></img></div>;
}

function getRandomPosition(number: number) {
    let newPosition = Math.floor(Math.random() * 8);
    if (newPosition >= number) {
        newPosition += 1;
    }
    return newPosition;
}

export { Matador };