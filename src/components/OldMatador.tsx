import React from "react";
import applauseSound from '../assets/preview.mp3';
import matadorImg from '../assets/matador.png';

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
        if (this.props.applause === 3 && this.state.applause !== 3) {
            const oleAudio = new Audio(applauseSound);
            console.log("applouse!!!(3) ");

            oleAudio.play().catch(e => console.log('audio is blocked'));
            this.setState({ applause: 3 })
            // setApplause(3);
        }
        else {
            if (this.props.applause !== 3 && this.state.applause !== this.props.applause) {
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