import React from "react";

type properties = { applause?: number, setMatarodPosition?(params: number): void, matadorPosition?: number };

class Matador extends React.Component {
  constructor(props: properties) {
// const Matador = (/*props: properties*/) => {
    // const [applause, setApplause] = useState(props.applause);
    // constructor(props){
        super(props);
        this.state = {
            applause: props.applause,
        }
    }
    render(): React.ReactNode {
        return <div><img src="../src/assets/matador.png" style={{ width: '150px', height: '200px' }} alt="matador"></img></div>;
    }
}

function getRandomPosition(number: number) {
    let newPosition = Math.floor(Math.random() * 8);
    if (newPosition >= number) {
        newPosition += 1;
    }
    return newPosition;
}

export { Matador };