import { stretches } from "../stretches";
import { Stretch } from "../types";

export const getDefaultStretch = () => {
    return stretches[0];
}

export const buildStretchList = (numStretches: number) => {
    let allMuscles = Array.from(new Set(stretches.map((stretch) => stretch.body_parts).flat()));
    const tempStretchList: Stretch[] = [];
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
            const selectedStretch = stretchesForMuscle[index];
            if(tempStretchList.includes(selectedStretch) || (selectedStretch.has_sides && tempStretchList.length + 2 > numStretches)){
              numStretchesTried++;
              if(numStretchesTried === stretchesForMuscle.length){
                break;
              }
            } else {
              foundStretch = selectedStretch;
              if(!foundStretch.has_sides) {
                tempStretchList.push(foundStretch);
              } else {
                let foundStretchOther = {...foundStretch};
                foundStretch.name = `${foundStretch.name} (Left)`;
                tempStretchList.push(foundStretch);
                foundStretchOther.name = `${foundStretchOther.name} (Right)`;
                tempStretchList.push(foundStretchOther);
              }
            }
          }
        }
      }
    }
    return tempStretchList
  }

  const getRandomInt= (max: number) => {
    return Math.floor(Math.random() * max);
  }