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
import { inheritTrailingComments } from "@babel/types";

const useStateWithCallback = (initialState: any, callback: any) => {
  const [state, setState] = useState(initialState);

  useEffect(() => callback(state), [state, callback]);

  return [state, setState];
};

const App: React.FC = () => {
  const unitsHP: number[] = UnitsArray.map(unit => {
    return unit._HP;
  });
  const falseArray: boolean[] = Array(12).fill(false);
  const [isHexed, setHexed] = useStateWithCallback(
    falseArray,
    (newarray: boolean[]) => {
      console.table(newarray);
      console.table(isHexed);
      const a = newarray.every((el, index) => el === isHexed[index]);
      if (!a) {
        alert("asdasfdsgsag");
      }
      //
      // debugger;
    }
  );

  const getQueue: Array<Unit> = generateQueue(UnitsArray);
  const [queue, setQueue] = useState(getQueue);

  interface ITeamObject {
    ally: Array<Unit>;
    enemy: Array<Unit>;
  }
  const filterHP = (array: Array<Unit>): Array<Unit> => {
    const a: Array<Unit> = array.filter(unit => unit._HP > 0);
    return a;
  };

  const getAllyAndEnemyTeam = (
    unitId: number,
    battleField: Array<Unit>
  ): ITeamObject => {
    console.log("Its buttleField must be const", battleField);
    const len = battleField.length;
    const lenDivTwo = len / 2;
    const lenDivFour = len / 4;
    const sumOFLenDivTwoLenDivFour = lenDivTwo + lenDivFour;
    const copyBattleField = [...battleField];
    // const teamB0 = battleField.slice(6, 9);
    // const teamB1 = battleField.slice(9, 12);
    const teamB0 = battleField.slice(lenDivTwo, sumOFLenDivTwoLenDivFour);
    const teamB1 = battleField.slice(sumOFLenDivTwoLenDivFour, len);
    const teamB = teamB1.concat(teamB0);
    const teamA = battleField.slice(0, lenDivTwo);
    let simpleArray = {
      ally: teamA,
      enemy: teamB
    };
    console.log(teamB.some(elem => elem._id == unitId));
    if (teamB.some(elem => elem._id == unitId)) {
      simpleArray = {
        ally: teamB,
        enemy: teamA
      };
    }
    console.log(simpleArray);
    return simpleArray;
  };

  const generateNewRound = () => {
    setPtotect(falseArray);
    setQueue(generateQueue(UnitsArray, "new turn", isHexed));
    setHexed(Array(12).fill(false));
  };

  const skipTurn = () => {
    const nextQueue = [...queue];
    nextQueue.shift();
    setQueue(nextQueue);
    if (nextQueue.length === 0) {
      generateNewRound();
    }
  };

  useEffect(() => {
    console.log("очередь", queue);
    console.log("type of queue", typeof queue);
    console.log("unit id", queue[0]._id);
    console.log(" array of hexed", isHexed);
    console.log(" array of hexed", isHexed[queue[0]._id]);
    const unit = queue[0];
    const { ally, enemy } = getAllyAndEnemyTeam(unit._id, UnitsArray);
    const filteredAlly = filterHP(ally);
    const filteredEnemy = filterHP(enemy);

    if (filteredAlly.length === 0 || filteredEnemy.length === 0) {
      alert("Game over.Attacking team win! Start new Game");
      window.location.reload();
    }
    console.log("ally", ally);
    console.log("enemy", enemy);
    console.log(filteredAlly, filteredEnemy);
    if (unit._HP == 0 || isHexed[unit._id]) {
      skipTurn();
    }

    const targetsForAction: Array<Unit> = unit.doSelect(UnitsArray);
    const a: number[] = [];
    const idTargets: number[] = targetsForAction.map(unit => {
      a.push(unit._id);
      return unit._id;
    });
    setTarget(idTargets);
  }, [queue, isHexed]);
  const [isProtected, setPtotect] = useState(falseArray);
  const [target, setTarget] = useState();
  const [HP, setHP] = useState(unitsHP);

  const handleDefenseClick = (index: number): number => {
    const protectedState: Array<boolean> = [...isProtected];
    protectedState[index] = true;
    setPtotect(protectedState);
    skipTurn();
    console.log("after skip");

    return 1;
  };
  const handleClick = (index: number): number => {
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
    skipTurn();

    setHP(newHP);
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
              hexed={isHexed[index]}
              protected={isProtected[index]}
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
          hexed={isHexed[index]}
          protected={isProtected[index]}
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
