import { FunctionComponent } from "react";
import '../styles/settings.scss';

export interface SettingsProps {
    startStretching: Function,
    numberOfStretches: number,
    setNumberOfStretches: Function,
    timePerStretch: number, 
    setTimePerStretch: Function,
    timeBetweenStretches: number,
    setTimeBetweenStretches: Function
}

export const Settings: FunctionComponent<SettingsProps> = ({startStretching, numberOfStretches, setNumberOfStretches, timePerStretch, setTimePerStretch, timeBetweenStretches, setTimeBetweenStretches}) => {

    const totalStretchSeconds = numberOfStretches * (timePerStretch + timeBetweenStretches);
    const getTimeString = () => {
        if(totalStretchSeconds < 60) {
            return `${totalStretchSeconds} seconds`
        } else {
            const minutes = Math.floor(totalStretchSeconds / 60)
            const seconds = totalStretchSeconds % 60;
            let time_string = `${minutes} minutes`;
            if(seconds !== 0){
                time_string += ` & ${seconds} seconds`;
            }
            return time_string;
        }
    }

    return (
        <div className="settings-container">
            <h2 className="settings-title">Settings</h2>
            <div className="settings-options">
                <div className="settings-options__option">
                    <h3>Number of Stretches</h3>
                    <input type='number' value={numberOfStretches} onChange={(event) => setNumberOfStretches(event.target.value)}/>
                </div>
                <div className="settings-options__option">
                    <h3>Time Per Stretch</h3>
                    <input type='number' value={timePerStretch} onChange={(event) => setTimePerStretch(event.target.value)}/>
                </div>
                <div className="settings-options__option">
                    <h3>Time Between Stretches</h3>
                    <input type='number' value={timeBetweenStretches} onChange={(event) => setTimeBetweenStretches(event.target.value)}/>
                </div>
                <div className="settings-options__option">
                <h3>Total Time To Stretch</h3>
                <h3 className="settings-options__summary">{getTimeString()}</h3>
            </div>
            </div>
            <button onClick={() => startStretching()}>Start Stretching</button>
        </div>
    );
    
}