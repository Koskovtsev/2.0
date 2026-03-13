import React from "react";
import matadorImg from '../assets/matador.png';
import sound1 from '../assets/01.wav';
import sound2 from '../assets/02.wav';
import sound3 from '../assets/03.mp3';
import sound4 from '../assets/04.mp3';

type MyProps = {
    applause?: number,
    matadorPosition?: number,
    setMatarodPosition?(params: number): void,
};

type MyState = {
    applause: number | undefined,
    matadorPosition: number | undefined,
}

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
class Matador extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            applause: props.applause,
            matadorPosition: props.matadorPosition,
        }
    }

    // private renderCount: number = 0;
    // private startTime: number = Date.now();

    handleBull = (event: DocumentEventMap['bullRun']) => {
        if (event.detail.position === this.state.matadorPosition) {
            const currentMatadorPosition = this.props.matadorPosition;
            const newMatadorPosition = getRandomPosition(currentMatadorPosition || 0);
            this.props.setMatarodPosition?.(newMatadorPosition);
            console.log(`Matador is moving from ${currentMatadorPosition} to ${newMatadorPosition}`);
        }
    }

    componentDidMount() {
        document.addEventListener('bullRun', this.handleBull);
    }
    componentDidUpdate(prevProps: Readonly<MyProps>, prevState: Readonly<MyState>, snapshot?: any): void {
        if (this.props.applause !== undefined) {
            const soundIndex = this.props.applause;
            const audio = audioFiles[soundIndex];
            console.log(`applause #${soundIndex}`);
            audio.play().catch(e => console.log("Audio blocked"));

        }

        if (this.props.applause === 3 && this.state.applause !== 3) {
            console.log("Applause 3!");
            this.setState({ applause: 3 })
        }
    }
    componentWillUnmount(): void {
        document.removeEventListener('bullRun', this.handleBull);
    }

    shouldComponentUpdate(nextProps: MyProps) {
        if (this.props.applause === 3 && nextProps.applause === 3) {
            return false;
        }

        if (nextProps.applause === 3 || this.props.applause === 3 || this.props.matadorPosition !== nextProps.matadorPosition) {
            return true;
        }

        return false;
    }

    render(): React.ReactNode {

        // const timePassed = ((Date.now() - this.startTime) / 1000).toFixed(2);
        // this.renderCount += 1;
        // console.log(`Классовий матадор відрендерився ${this.renderCount} разів. Час життя: ${timePassed} сек.`);
        return <div><img src={matadorImg} style={{ width: '150px', height: '200px' }} alt="matador"></img></div>;
    }
}

function getRandomPosition(number: number) {
    let newPosition = Math.floor(Math.random() * 8);
    return newPosition >= number ? newPosition + 1 : newPosition;
}

export { Matador };