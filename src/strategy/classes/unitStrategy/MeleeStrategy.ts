import IStrategy from "../../interface/IConcreteStrategy";
import Unit from "../unit/Unit";
import { number } from "prop-types";
import IUnit from "../../interface/IUnit";
interface ITeamObject {
  ally: Array<Array<Unit>>;
  enemy: Array<Array<Unit>>;
}
const create2Array = (someArray: Array<Unit>): Array<Array<Unit>> => {
  const len = someArray.length;
  const lenDivTwo = len / 2;
  console.log("azaszza", lenDivTwo, len, 0, lenDivTwo);
  const array = [];
  // array.push(someArray.slice(3, 6), someArray.slice(0, 3));
  array.push(someArray.slice(lenDivTwo, len), someArray.slice(0, lenDivTwo));
  return array;
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
  const returnedObject = {
    ally: create2Array(simpleArray.ally),
    enemy: create2Array(simpleArray.enemy)
  };
  console.log();
  console.log(returnedObject);
  return returnedObject;
};
const getElemLane = (elem: number, array: Array<Array<Unit>>): number => {
  let i = -1;
  array.some((array, index) => {
    const a = array.some(element => element._id == elem);
    console.log("this is a", a);
    if (a) {
      i = index;
      return index;
    }
  });
  return i;
};
const funCanUnitAtack = (lane: number, a: Array<Array<Unit>>): boolean => {
  const allyesBeforeUnit = a.slice(0, lane);
  console.log("array allys before", allyesBeforeUnit);
  console.log("allys array", a);
  const canUnitAtack = allyesBeforeUnit.every(array =>
    array.every(element => element._HP == 0)
  );
  return canUnitAtack;
};
const linesForAtack = (enemyArray: Array<Array<Unit>>): Array<Unit> => {
  let string: Array<Unit> = [];
  enemyArray.some((array, index) => {
    // console.log("current string", array);
    // console.log("current string index", index);
    const a = array.some(unit => unit._HP > 0);
    console.log(a);
    if (a) {
      string = array;
      return string;
    }
  });
  return string;
};
const getAtackedTargets = (pos: number, array: Array<Unit>) => {
  const filterFunction = (array: Array<Unit>) => {
    const a = array.filter(unit => typeof unit != "undefined");
    return a;
  };
  let left = pos - 1;
  let right = pos + 1;
  let z = 0;
  let targets = [];
  targets.push(array[left], array[pos], array[right]);
  console.log(targets);
  targets = filterFunction(targets);
  console.log(targets);

  let haveTarget = targets.some(unit => unit._HP > 0);
  console.log(targets.some(unit => unit._HP > 0));
  while (!haveTarget) {
    --left;
    ++right;
    console.log("lalalalalalaal");
    targets.unshift(array[left]);
    console.log("after extention left ", targets);
    targets.push(array[right]);
    console.log("after extention right ", targets);

    targets = filterFunction(targets);
    console.log("after filter", targets);
    haveTarget = targets.some(unit => unit._HP > 0);
  }
  return targets.filter(unit => unit);
};

export default class MeleeStrategy implements IStrategy {
  public doAlgorithm(
    atackingUnit: number,
    target: number,
    targets: number[],
    battleField: Array<Unit>,
    HP: number[]
  ): number[] {
    const copyHP: number[] = [...HP];
    const { _damage } = battleField[atackingUnit];
    console.log("atackingUnit", atackingUnit);
    console.log("targets", targets);
    battleField.forEach((unit, index) => {
      if (targets.indexOf(unit._id) === -1) {
      } else {
        console.log("do hp reduce");
        unit.doHPreduce(_damage);
        if (_damage >= HP[index]) copyHP[index] = 0;
        else {
          console.log("HP before", HP[index]);
          copyHP[index] = HP[index] - _damage;
          console.log("Hp after", copyHP[index]);
        }
      }
    });

    console.log("its buttleField after deal damage", battleField);
    return copyHP;
  }

  public doTargetSelection(unit: Unit, battleField: Array<Unit>): Array<Unit> {
    // const ally = getAllyAndEnemyTeam(unit._id, battleField).ally;
    // const enemy = getAllyAndEnemyTeam(unit._id, battleField).enemy;

    const { ally, enemy } = getAllyAndEnemyTeam(unit._id, battleField);
    console.log("ally", ally);
    console.log("enemy", enemy);
    const unitLane = getElemLane(unit._id, ally);
    const unitPosition = ally[unitLane].indexOf(unit);
    console.log("unit lane", unitLane);
    console.log("unit position", unitPosition);
    const canUnitAtack = funCanUnitAtack(unitLane, ally);
    console.log("Can unit Atack?", canUnitAtack);
    if (canUnitAtack) {
      const arayTargets = linesForAtack(enemy);
      console.log("line for atack", arayTargets);
      const realTarget: Array<Unit> = getAtackedTargets(
        unitPosition,
        arayTargets
      );
      console.log("array targets", realTarget);
      return realTarget;
    }
    return [];
  }
}
