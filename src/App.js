import './App.css';
import { useEffect, useState } from 'react';
import { stretches } from './stretches';

export default function App() {
  // Stretch Configurations
  const [numStretches, setNumStretches] = useState(5);
  const [timePerStretch, setTimePerStretch] = useState(10);
  const [timeBetweenStretch, setTimeBetweenStretch] = useState(5);

  // Stretch State
  const [isStretching, setIsStretching] = useState(false);
  const [currentStretch, setCurrentStretch] = useState(Object);
  const [currentStretchSideLeft, setCurrentStretchSideLeft] = useState(true);
  const [timeLeft, setTimeLeft] = useState(timePerStretch);
  const [isResting, setIsResting] = useState(false);
  const [numberOfStretchesCompleted, setNumberOfStretchesCompleted] = useState(0);

  const getRow = (stretch) => {
    return (
      <tr>
        <td>{stretch.name}</td>
        <td>{stretch.body_parts.join(', ')}</td>
        <td>{stretch.has_sides ? 'Yes' : 'No'}</td>
        <td><img width='50px' height='50px' src={stretch.image} alt={stretch.name}></img></td>
      </tr>
    )
  }

  const startStretching = () => {
    setIsStretching(true);
    setTimeLeft(timePerStretch);
    setCurrentStretch(stretches[getRandomInt()]);
    setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  }

  const getRandomInt = () => {
    return Math.floor(Math.random() * stretches.length);
  }

  useEffect(() => {
    if(!isStretching) {
      return;
    }
    if(timeLeft === 0){
      if(isResting) {
        setIsResting(false);
        setTimeLeft(timePerStretch);
      } else {
        setIsResting(true);
        setTimeLeft(timeBetweenStretch);
        const newNumCompleted = numberOfStretchesCompleted + 1;
        setNumberOfStretchesCompleted(newNumCompleted);
        if(newNumCompleted === numStretches){
          setIsStretching(false);
          return;
        } else {
          // queue up new stretch
          if(currentStretch.has_sides && currentStretchSideLeft) {
            setCurrentStretchSideLeft(false);
          } else {
            setCurrentStretchSideLeft(true);
            setCurrentStretch(stretches[getRandomInt()])
          }
        }
      }
    }
    setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  }, [timeLeft, currentStretchSideLeft, isResting, numStretches, numberOfStretchesCompleted, timeBetweenStretch, timePerStretch, isStretching, currentStretch.has_sides]);


  return (
    <div className="App">
      <div>
        <h1>Lets Stretch!</h1>
        <h1>Stretch Progress: {numberOfStretchesCompleted}/{numStretches}</h1>
      </div>
      { !isStretching ? (
        <div className="stretch__holder">
          <div className="stretch__options">
            Number of Stretches:
            <input value={numStretches} onChange={(event) => setNumStretches(parseInt(event.target.value))} type='number'></input>
            Time Per Stretch:
            <input value={timePerStretch} onChange={(event) => setTimePerStretch(parseInt(event.target.value))} type='number'></input>
            Time Between Stretches:
            <input value={timeBetweenStretch} onChange={(event) => setTimeBetweenStretch(parseInt(event.target.value))} type='number'></input>
            <h2>Stretch for {(((timePerStretch + timeBetweenStretch) * numStretches) / 60).toFixed(1)} minutes</h2>
            <button onClick={() => startStretching()}>Start Stretching</button>
          </div>
        </div>
        ) : null
      }
      {
        isStretching ? (
          <div className="stretch__holder">
            {!isResting ? (
              <div>
                <div className="stretch__header">
                  <h1>{currentStretch.name} {currentStretch.has_sides ? (currentStretchSideLeft ? '(L)' : '(R)') : ''}</h1>
                  <h1>{timeLeft} seconds left</h1>
                  <h1>{currentStretch.body_parts.join(', ')}</h1>
                </div>
                <img width='150px' height='150px' src={currentStretch.image} alt={currentStretch.name}></img>
              </div>
            ) : (
              <div>
                <div className="stretch__header">
                  <h1>Resting</h1>
                  <h1>{timeLeft} seconds left</h1>
                  <h1>Next Up: {currentStretch.name} {currentStretch.has_sides ? (currentStretchSideLeft ? '(L)' : '(R)') : ''}</h1>
                </div>
                <img width='150px' height='150px' src={currentStretch.image} alt={currentStretch.name}></img>
              </div>
            )}
          </div>
        ) : null
      }
      <h3>Total Stretches: {stretches.length}</h3>
      <table className="stretch__table">
        <thead>
          <tr>
            <td>
              Name
            </td>
            <td>
              Location
            </td>
            <td>
              Sides?
            </td>
          </tr>
        </thead>
        <tbody>
          {stretches.map((stretch) => {
            return getRow(stretch);
          })}
        </tbody>
      </table>
    </div>
  );
}
