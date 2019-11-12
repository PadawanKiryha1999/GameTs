import React from "react";
import "./App.css";
// import { CenterPart } from "./page/CenterPart";
import { RightPart } from "./page/RightPart";
import { LeftPart } from "./page/LeftPart";
import { CenterPartV2 } from "./page/CenterPartV2";
import { UnitsArray } from "./Logic/GenerateUnits";
import Unit from "../src/strategy/classes/unit/Unit";
import { useState, useEffect } from "react";
import { QueueUI } from "../src/page/QueueUI";
import { UnitUI } from "../src/page/UnitUI";
import { generateQueue } from "../src/Logic/Generatequeue";
import ArcherStrategy from "./strategy/classes/unitStrategy/ArcherStrategy";
import { number } from "prop-types";

const App: React.FC = () => {
  const unitsHP: number[] = UnitsArray.map(unit => {
    return unit._HP;
  });
  const getQueue: Array<Unit> = generateQueue(UnitsArray);
  const [queue, setQueue] = useState(getQueue);

  useEffect(() => {
    const unit = queue[0];
    if (queue.length === 1 && queue[0]._HP === 0) {
      const nextQueue = [...queue];
      nextQueue.shift();
      setQueue(nextQueue);
    } else {
      if (unit._HP <= 0) {
        const nextQueue = [...queue];
        nextQueue.shift();
        setQueue(nextQueue);
      } else {
        const targetsForAction: Array<Unit> = unit.doSelect(UnitsArray);

        const a: number[] = [];
        const idTargets: number[] = targetsForAction.map(unit => {
          a.push(unit._id);
          return unit._id;
        });
        setTarget(idTargets);
      }
    }
  }, [queue]);
  const [target, setTarget] = useState();
  const [HP, setHP] = useState(unitsHP);

  const handleDefenseClick = (index: number): number => {
    const nextQueue = [...queue];
    nextQueue.shift();
    setQueue(nextQueue);
    if (nextQueue.length === 0) {
      console.log("new queue");
      setQueue(generateQueue(UnitsArray, "new turn"));
    }

    return 1;
  };
  const handleClick = (index: number): number => {
    // (index===0) ? console.log(index) : console.log(index);
    const selectedUnit: Unit = queue[0];
    const newHP: number[] = selectedUnit.doAction(
      selectedUnit._id,
      index,
      target,
      UnitsArray,
      HP
    );
    console.log(newHP);
    setHP(newHP);
    // const hps = [...HP];
    // hps[index] = HP[index] - UnitsArray[index].doHPreduce(1, 1);
    // setHP(hps);
    const nextQueue = [...queue];
    nextQueue.shift();
    setQueue(nextQueue);
    if (nextQueue.length === 0) {
      console.log("new queue");
      setQueue(generateQueue(UnitsArray, "new turn"));
    }

    return 1;
  };

  type props = {
    index: number;
  };

  const renderLeftPart = () => {
    const unitsArrayUI: any = queue.map((unit, index) => {
      return (
        <QueueUI
          HP={HP[unit._id]}
          key={index}
          currentUnit={unit}
          currentIndex={index}
        />
      );
    });

    return unitsArrayUI;
  };
  const isAtcaked: any = (index: number, unit: Unit) => {
    // if (target.indexof(index)) return true;
    // else return false;
    if (target === undefined) {
    } else {
      if (target.indexOf(index) === -1 || HP[index] <= 0) {
        return false;
      } else return true;
    }
  };

  const renderCenterPart = () => {
    const unitsArrayUI: any = UnitsArray.map((unit, index) => {
      if (index === 5) {
        return (
          <React.Fragment key={index}>
            <UnitUI
              HP={HP[index]}
              currentUnit={unit}
              currentIndex={index}
              underAtack={isAtcaked(index, unit)}
              isActive={queue[0]._id === index ? true : false}
              onClick={() => {
                handleClick(index);
              }}
              onDefenseClick={() => {
                handleDefenseClick(index);
              }}
            />
            <div className="border" key={100}></div>
          </React.Fragment>
        );
      }
      return (
        <UnitUI
          HP={HP[index]}
          key={index}
          currentUnit={unit}
          currentIndex={index}
          isActive={queue[0]._id === index ? true : false}
          underAtack={isAtcaked(index, unit)}
          onClick={() => {
            handleClick(index);
          }}
          onDefenseClick={() => {
            handleDefenseClick(index);
          }}
        />
      );
    });

    return <div className="battleField">{unitsArrayUI}</div>;
  };

  return (
    <div className="app">
      <div className="left-part">{renderLeftPart()}</div>

      <React.Fragment>{renderCenterPart()}</React.Fragment>
      <RightPart />
    </div>
  );
};

export default App;
