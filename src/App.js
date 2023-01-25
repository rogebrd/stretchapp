import './App.css';
import { useEffect, useState } from 'react';
import { stretches } from './stretches';

export default function App() {
  // Stretch Configurations
  const [numStretches, setNumStretches] = useState(20);
  const [timePerStretch, setTimePerStretch] = useState(20);
  const [timeBetweenStretch, setTimeBetweenStretch] = useState(10);

  // Stretch State
  const [isStretching, setIsStretching] = useState(false);
  const [currentStretch, setCurrentStretch] = useState(Object);
  const [currentStretchSideLeft, setCurrentStretchSideLeft] = useState(true);
  const [timeLeft, setTimeLeft] = useState(timePerStretch);
  const [isResting, setIsResting] = useState(false);
  const [numberOfStretchesCompleted, setNumberOfStretchesCompleted] = useState(0);

  const [stretchList, setStretchList] = useState([]);

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

  const buildStretchList = () => {
    let allMuscles = Array.from(new Set(stretches.map((stretch) => stretch.body_parts).flat()));
    const tempStretchList = [];
    // TODO randomize order
    while(tempStretchList.length < numStretches){
      let firstPass = tempStretchList.length === 0;
      // Sort array to be random
      allMuscles = allMuscles.sort((a, b) => 0.5 - Math.random());
      for(let i = 0; i < allMuscles.length; i++) {
        if(tempStretchList.length < numStretches) {
          const muscle = allMuscles[i];
          if(firstPass && tempStretchList.map((stretch) => stretch.body_parts).flat().includes(muscle)){
            continue;
          }
          const stretchesForMuscle = stretches.filter((stretch) => stretch.body_parts.includes(muscle));
          let foundStretch = null;
          // get random exercise from list
          let numStretchesTried = 0;
          while(foundStretch === null){
            // try to add but don't if dup
            const index = getRandomInt(stretchesForMuscle.length);
            if(tempStretchList.includes(stretchesForMuscle[index])){
              numStretchesTried++;
              if(numStretchesTried === stretchesForMuscle.length){
                break;
              }
            }else {
              foundStretch = stretchesForMuscle[index];
              // update num stretches in list
            }
          }
          tempStretchList.push(foundStretch);
        }
      }
    }
    return tempStretchList
  }

  const startStretching = () => {
    const newStretchList = buildStretchList();
    setStretchList(newStretchList)
    setIsStretching(true);
    setIsResting(true);
    setTimeLeft(timeBetweenStretch);
    setCurrentStretch(newStretchList[0]);
    setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
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
        // only count second side as completion not the first
        let newNumCompleted = numberOfStretchesCompleted
        if((currentStretch.has_sides && !currentStretchSideLeft) || (!currentStretch.has_sides)) {
          newNumCompleted = numberOfStretchesCompleted + 1;
        }
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
            // use stretch list
            setCurrentStretch(stretchList[newNumCompleted])
          }
        }
      }
    }
    setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  }, [timeLeft, currentStretchSideLeft, isResting, numStretches, numberOfStretchesCompleted, timeBetweenStretch, timePerStretch, isStretching, currentStretch.has_sides, stretchList]);


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
