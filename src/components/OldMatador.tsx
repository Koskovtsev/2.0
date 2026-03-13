import React from "react";
import matadorImg from '../assets/matador.png';
import sound1 from '../assets/01.wav';
import sound2 from '../assets/02.wav';
import sound3 from '../assets/03.mp3';
import sound4 from '../assets/04.mp3';
// type properties = { applause?: number, setMatarodPosition?(params: number): void, matadorPosition?: number };
type MyProps = {
    applause?: number,
    matadorPosition?: number,
    setMatarodPosition?(params: number): void,
    // count?: number,
    // countIncrement?: number,
};


type MyState = {
    // count: number| undefined,
    // countIncrement: number | undefined,
    applause: number | undefined,
    matadorPosition: number | undefined,
    // myAction: (val: number) => void,
    // setMatarodPosition?(params: number): void,
};
const sounds = [sound1, sound2, sound3, sound4];
const audioFiles = [
    new Audio(sound1),
    new Audio(sound2),
    new Audio(sound3),
    new Audio(sound4),
];
class Matador extends React.PureComponent<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            // count: props.count,
            // countIncrement: props.countIncrement,
            applause: props.applause,
            matadorPosition: props.matadorPosition,
            // setMatadorPos: myAction(),
        }
    }



    handleBull = ({ detail }: CustomEvent<{ position: number }>) => {
        if (detail.position === this.state.matadorPosition) {
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
        if (this.props.applause !== prevProps.applause && this.props.applause !== undefined) {
            const soundIndex = this.props.applause; // 0, 1, 2 або 3
            const audio = audioFiles[this.props.applause];
            console.log(`Грає звук для типу оплесків: ${soundIndex}`);
            audio.play().catch(e => console.log("Audio blocked"));

        }

        if (this.props.applause === 3 && this.state.applause !== 3) {
            // const oleAudio = new Audio(applauseSound);
            // console.log("applouse!!!(3) ");
            console.log("Оплески рівня 3! Оновлюємо стейт для рендеру.");
            // oleAudio.play().catch(e => console.log('audio is blocked'));
            this.setState({ applause: 3 })
            // setApplause(3);
        }
        else {
            // if (this.props.applause !== 3 && this.state.applause !== this.props.applause) {
            if (this.props.applause !== 3 && this.state.applause === 3) {
                this.setState({ applause: this.props.applause })
                // setApplause(this.props.applause);
            }
        }

    }
    componentWillUnmount(): void {
        document.removeEventListener('bullRun', this.handleBull);
    }

    render(): React.ReactNode {
        return <div><img src={matadorImg} style={{ width: '150px', height: '200px' }} alt="matador"></img></div>;
    }
}

function getRandomPosition(number: number) {
    let newPosition = Math.floor(Math.random() * 8);
    return newPosition >= number ? newPosition + 1 : newPosition;
}

export { Matador };