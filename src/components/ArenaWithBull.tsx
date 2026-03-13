import React, { useEffect, useRef, useState } from "react";
import Bull from "./Bull";

interface ArenaWithBullProps {
    matador: React.ReactElement;
}

const ArenaWithBull = ({ matador }: ArenaWithBullProps) => {
    const [applause, setApplause] = useState(0);
    const [screemJoy, setScreamJoy] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [matadorPosition, setMatarodPosition] = useState(4);
    const [bullPosition, setBullPosition] = useState(8);

    useEffect(() => {
        // ignore props until 3
        const applauseInterval = setInterval(() => {
            setApplause(Math.floor(Math.random() * 4))
        }, 1000);                                   // TODO: помінять назад на 1000

        // purpose Parent rerender 
        const screamInterval = setInterval(() => {
            setScreamJoy(Math.random())
        }, 800);
        // respond to custom Events
        const dispatchRunInterval = setInterval(() => {
            const position = Math.floor(Math.random() * 9)
            const BullRun = new CustomEvent('bullRun', {
                detail: {
                    position
                }
            })
            setTimeout(() => {
                setBullPosition(position)
            }, 1000)                             //TODO : помінять назад на 1000
            document.dispatchEvent(BullRun);
        }, 1500);                               // TODO : помінять назад на 1500
        // remove event listener on unmount
        const visibilityInterval = setInterval(() => {
            setIsVisible((oldIsVisible) => !oldIsVisible);
        }, 20000);                              // TODO: : помінять назад на 20000

        return () => {
            clearInterval(screamInterval);
            clearInterval(applauseInterval);
            clearInterval(dispatchRunInterval);
            clearInterval(visibilityInterval);
        }
    }, []);
    return <div className='duelWrapper'>
        <h1>Bullfighting Arena</h1>
        <div className='arena'>
            <div className={"duel"}>
                <div className="cell">
                    {matadorPosition === 0 && isVisible ? <div className='matador'>{React.cloneElement(matador, { applause, setMatarodPosition, matadorPosition })}</div> : null}
                    {bullPosition === 0 && <Bull />}
                </div>
                <div className="cell">
                    {matadorPosition === 1 && isVisible ? <div className='matador'>{React.cloneElement(matador, { applause, setMatarodPosition, matadorPosition })}</div> : null}
                    {bullPosition === 1 && <Bull />}
                </div>
                <div className="cell">
                    {matadorPosition === 2 && isVisible ? <div className='matador'>{React.cloneElement(matador, { applause, setMatarodPosition, matadorPosition })}</div> : null}
                    {bullPosition === 2 && <Bull />}
                </div>
                <div className="cell">
                    {matadorPosition === 3 && isVisible ? <div className='matador'>{React.cloneElement(matador, { applause, setMatarodPosition, matadorPosition })}</div> : null}
                    {bullPosition === 3 && <Bull />}
                </div>
                <div className="cell">
                    {matadorPosition === 4 && isVisible ? <div className='matador'>{React.cloneElement(matador, { applause, setMatarodPosition, matadorPosition })}</div> : null}
                    {bullPosition === 4 && <Bull />}
                </div>
                <div className="cell">
                    {matadorPosition === 5 && isVisible ? <div className='matador'>{React.cloneElement(matador, { applause, setMatarodPosition, matadorPosition })}</div> : null}
                    {bullPosition === 5 && <Bull />}
                </div>
                <div className="cell">
                    {matadorPosition === 6 && isVisible ? <div className='matador'>{React.cloneElement(matador, { applause, setMatarodPosition, matadorPosition })}</div> : null}
                    {bullPosition === 6 && <Bull />}
                </div>
                <div className="cell">
                    {matadorPosition === 7 && isVisible ? <div className='matador'>{React.cloneElement(matador, { applause, setMatarodPosition, matadorPosition })}</div> : null}
                    {bullPosition === 7 && <Bull />}
                </div>
                <div className="cell">
                    {matadorPosition === 8 && isVisible ? <div className='matador'>{React.cloneElement(matador, { applause, setMatarodPosition, matadorPosition })}</div> : null}
                    {bullPosition === 8 && <Bull />}
                </div>
            </div>
        </div>
    </div >
}

export default ArenaWithBull;


//  бык бежал, матарод уворачивался 