import { useState, useEffect, useRef } from "react";
import { memo } from "react";
import matadorImg from '../assets/matador.png';
import sound1 from '../assets/01.wav';
import sound2 from '../assets/02.wav';
import sound3 from '../assets/03.mp3';
import sound4 from '../assets/04.mp3';

type properties = { applause?: number, setMatarodPosition?(params: number): void, matadorPosition?: number };

declare global {
    interface DocumentEventMap {
        'bullRun': CustomEvent<{ position: number }>;
    }
}
const audioFiles = [
    new Audio(sound1),
    new Audio(sound2),
    new Audio(sound3),
    new Audio(sound4),
];
const Matador = memo((props: properties) => {
    const [applause, setApplause] = useState(props.applause);

    const posRef = useRef(props.matadorPosition);

    posRef.current = props.matadorPosition;

    // const startTime = useRef(Date.now());
    // const renderCount = useRef(0);
    // const timePassed = ((Date.now() - startTime.current) / 1000).toFixed(2);
    // renderCount.current += 1;
    // console.log(`Матадор відрендерився ${renderCount.current} разів. Час життя: ${timePassed} сек.`);


    const handleBull = (event: DocumentEventMap['bullRun']) => {
        if (event.detail.position === posRef.current) {
            const currentMatadorPosition = posRef.current;
            const newMatadorPosition = getRandomPosition(currentMatadorPosition || 0);
            props.setMatarodPosition?.(newMatadorPosition);
            console.log(`Matador is moving from ${currentMatadorPosition} to ${newMatadorPosition}`);
        }
    }

    useEffect(() => {
        if (props.applause !== undefined) {
            const audio = audioFiles[props.applause];
            console.log(`applause #${props.applause}`);
            audio.play().catch(e => console.log('audio is blocked'));
        }
        if (props.applause === 3 && applause !== 3) {
            setApplause(3);
        }
    }, [props.applause]);

    useEffect(() => {
        document.addEventListener('bullRun', handleBull);
        return () => {
            document.removeEventListener('bullRun', handleBull);
        }
    }, []);

    return <div><img src={matadorImg} style={{ width: '150px', height: '200px' }} alt="matador"></img></div>;
},
    (prevProps, nextProps) => {
        if (prevProps.applause === 3 && nextProps.applause === 3) {
            return true;
        }
        if (nextProps.applause === 3 || prevProps.applause === 3 || prevProps.matadorPosition !== nextProps.matadorPosition) {
            return false;
        }
        return true;
    }
);

function getRandomPosition(number: number) {
    let newPosition = Math.floor(Math.random() * 8);
    if (newPosition >= number) {
        newPosition += 1;
    }
    return newPosition;
}

export { Matador };