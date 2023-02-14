import { FunctionComponent } from "react";
import "../styles/stretchPanel.scss";
import { Stretch } from "../types";

export interface StretchPanelProps {
    secondsLeft: number,
    stretch: Stretch,
    totalStretches: number,
    stretchesComplete: number,
    isBreak: boolean,
}


export const StretchPanel: FunctionComponent<StretchPanelProps> = ({secondsLeft, stretch, totalStretches, stretchesComplete, isBreak}) => {

    return (
        <div className="stretch-panel-container">
            <h1 className="stretch-panel__title">{secondsLeft} seconds left</h1>
            {
                !isBreak ? (
                    <>
                        <img width='150px' height='150px' src={stretch.image} alt={stretch.name}></img>
                        <span className="stretch-panel__footer">
                            <h2>{stretch.name}</h2>
                            <h2>{stretchesComplete} / {totalStretches} Stretches Complete</h2>
                        </span>
                    </>
                ) : (
                    <>
                        <h1 className="stretch-panel__break">
                            {
                                stretchesComplete === 0 ? 'Get Ready' : 'BREAK'
                            }
                        </h1>
                        <h3>Up Next: {stretch.name}</h3>
                        <span className="stretch-panel__footer">
                            <span></span>
                            <h2>{stretchesComplete} / {totalStretches} Stretches Complete</h2>
                        </span>
                    </>
                )
            }
        </div>
    );
}