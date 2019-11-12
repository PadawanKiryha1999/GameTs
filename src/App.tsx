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
import { array } from "prop-types";

const App: React.FC = () => {
  const unitsHP: number[] = UnitsArray.map(unit => {
    return unit._HP;
  });
  const falseArray: boolean[] = Array(12).fill(false);
  const [isHexed, setHexed] = useState(falseArray);
  const getQueue: Array<Unit> = generateQueue(UnitsArray);
  const [queue, setQueue] = useState(getQueue);

  useEffect(() => {
    console.log("очередь", queue);
    console.log("unit id", queue[0]._id);
    console.log(" array of hexed", isHexed);
    console.log(" array of hexed", isHexed[queue[0]._id]);
    if (queue.length <= 6) {
      const copyQueue: Array<Unit> = [...UnitsArray];

      const arrayofAliveUnit: Array<Unit> = copyQueue.filter(
        unit => unit._HP > 0
      );
      console.log("alive Unit");
      const copyArrayOfAliveUnit: Array<Unit> = [...arrayofAliveUnit];
      const sortTeamA: Array<Unit> = copyArrayOfAliveUnit.filter(
        unit => unit._id >= 6
      );
      const sortTeamB: Array<Unit> = copyArrayOfAliveUnit.filter(
        unit => unit._id < 6
      );
      console.log("команда A", sortTeamA);
      console.log("команда b", sortTeamB);
      if (sortTeamB.length === 0 || sortTeamA.length === 0) {
        let winTeam: string = "";
        if (sortTeamA.length > sortTeamB.length) winTeam = "Team Dire";
        else winTeam = "Team Radiant";
        alert(`Game over. ${winTeam} win.Start new game`);
        window.location.reload();
      }
    }
    if (queue.length === 0 || isHexed[queue[0]._id]) {
      console.log("i tipa tut");
      setPtotect(falseArray);

      setQueue(generateQueue(UnitsArray, "new turn", isHexed));
      setHexed(falseArray);
    }

    const unit = queue[0];
    if (queue.length === 1 && queue[0]._HP === 0) {
      console.log("i kak bi tut");
      setPtotect(falseArray);
      /////сбросить хексы
      setQueue(generateQueue(UnitsArray, "new turn", isHexed));
      setHexed(falseArray);
    } else if (isHexed[queue[0]._id]) {
      console.log("vot ono");
      const hexedUnits = [...isHexed];
      hexedUnits[unit._id] = true;
      setHexed(hexedUnits);
      setPtotect(falseArray);
      setQueue(generateQueue(UnitsArray, "new turn", isHexed));
      setHexed(falseArray);
    } else if (isHexed[unit._id]) {
      console.log("esli v hekse");
      const hexedUnits = [...isHexed];
      hexedUnits[unit._id] = true;
      setHexed(hexedUnits);
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
  const [isProtected, setPtotect] = useState(falseArray);
  const [target, setTarget] = useState();
  const [HP, setHP] = useState(unitsHP);

  const handleDefenseClick = (index: number): number => {
    const protectedState: Array<boolean> = [...isProtected];
    protectedState[index] = true;
    setPtotect(protectedState);
    const nextQueue = [...queue];
    nextQueue.shift();
    setQueue(nextQueue);
    if (nextQueue.length === 0 || queue.length === 0 || isHexed[queue[0]._id]) {
      console.log("i tipa tut");
      setPtotect(falseArray);
      /////сбросить хексы
      setQueue(generateQueue(UnitsArray, "new turn", isHexed));
      setHexed(falseArray);
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
      HP,
      isProtected
    );
    console.log("выбранный юнит", selectedUnit._id);
    console.log("выбранная цель", index);
    if (selectedUnit._unitType === "paralyazer") {
      console.log("its naga");
      const copyIsHexed = [...isHexed];
      console.log("до действия", copyIsHexed);
      copyIsHexed[index] = true;
      console.log("after действия", copyIsHexed);
      setHexed(copyIsHexed);
    }
    console.log(isHexed);
    console.log(newHP);
    setHP(newHP);
    const nextQueue = [...queue];
    nextQueue.shift();
    setQueue(nextQueue);
    // if (queue.length === 0) {
    //   console.log("new queue");
    //   setPtotect(falseArray);
    //   ///сбросить хексы
    //   setQueue(generateQueue(UnitsArray, "new turn"));
    //   setHexed(falseArray);
    // }
    // ниже рабочий
    if (nextQueue.length === 0 || queue.length === 0 || isHexed[queue[0]._id]) {
      console.log("i kak bi tut");
      setPtotect(falseArray);
      /////сбросить хексы
      console.log(isHexed);
      setQueue(generateQueue(UnitsArray, "new turn", isHexed));
      setHexed(falseArray);
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
