import { FunctionComponent } from "react";
import '../styles/settings.scss';

export interface SettingsProps {

}

export const Settings: FunctionComponent<SettingsProps> = () => {

    return (
        <div className="settings-container">
            <h2 className="settings-title">Settings</h2>
            <div className="settings-options">
                <div className="settings-options__option">
                    <h3>Number of Stretches</h3>
                    <input type='number' />
                </div>
                <div className="settings-options__option">
                    <h3>Time Per Stretch</h3>
                    <input type='number' />
                </div>
                <div className="settings-options__option">
                    <h3>Time Between Stretches</h3>
                    <input type='number' />
                </div>
                <div className="settings-options__option">
                <h3>Total Time To Stretch</h3>
                <h3 className="settings-options__summary">75 seconds</h3>
            </div>
            </div>
            <button>Start Stretching</button>
        </div>
    );
    
}