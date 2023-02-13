import { FunctionComponent, useEffect, useState } from "react";
import { Stretch } from "../types";
import { buildStretchList, getDefaultStretch } from "../utils/stretch";
import { Settings } from "./settings";
import { StretchPanel } from "./stretchPanel";
import { Title } from "./title";

export const StretchApp: FunctionComponent = () => {

    // App State
    const [isStretching, setIsStretching] = useState<boolean>(false);

    // Stretch Settings
    const [numberOfStretches, setNumberOfStretches] = useState<number>(20);
    const [timePerStretch, setTimePerStretch] = useState<number>(20);
    const [timeBetweenStretches, setTimeBetweenStretches] = useState<number>(10);

    // Stretching State
    const [isBreak, setIsBreak] = useState<boolean>(true);
    const [stretchList, setStretchList] = useState<Stretch[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [currentStretch, setCurrentStretch] = useState<Stretch>(getDefaultStretch());
    const [numberOfStretchesCompleted, setNumberOfStretchesCompleted] = useState<number>(0);

    const startStretching = () => {
        const newStretchList = buildStretchList(numberOfStretches);
        setStretchList(newStretchList)
        setIsStretching(true);
        setIsBreak(true);
        setTimeLeft(timeBetweenStretches);
        setCurrentStretch(newStretchList[0]);
        setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      }

    useEffect(() => {
        if(!isStretching) {
            return;
        }
        if(timeLeft === 0){
            if(isBreak) {
                setIsBreak(false);
                setTimeLeft(timePerStretch);
            } else {
                setIsBreak(true);
                setTimeLeft(timeBetweenStretches);
                let newNumCompleted = numberOfStretchesCompleted + 1;
                setNumberOfStretchesCompleted(newNumCompleted);
                if(newNumCompleted === numberOfStretches){
                    setIsStretching(false);
                    return;
                } else {
                    setCurrentStretch(stretchList[newNumCompleted])
                }
            }
        }
        setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }, [timeLeft, isBreak, numberOfStretches, numberOfStretchesCompleted, timeBetweenStretches, timePerStretch, isStretching, stretchList]);


    return (
        <>
            <Title />
            { !isStretching ? 
                ( <Settings 
                    startStretching={() => startStretching()}
                    numberOfStretches={numberOfStretches}
                    setNumberOfStretches={setNumberOfStretches}
                    timePerStretch={timePerStretch}
                    setTimePerStretch={setTimePerStretch}
                    timeBetweenStretches={timeBetweenStretches}
                    setTimeBetweenStretches={setTimeBetweenStretches}
                    /> ) :
                ( <StretchPanel 
                    secondsLeft={timeLeft}
                    stretch={currentStretch}
                    totalStretches={numberOfStretches}
                    stretchesComplete={numberOfStretchesCompleted}
                    isBreak={isBreak}
                /> )
            }
        </>
    );
}