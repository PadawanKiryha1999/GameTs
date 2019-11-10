import IStrategy from "../../interface/IConcreteStrategy";
import Unit from "../unit/Unit";
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
    const unitPosition: number = unit._id;
    const getTargets = (
      allies: Array<Unit>,
      enemies: Array<Unit>,
      unitPosition: number
    ): Array<Unit> => {
      let alliesFirstLane: Array<Unit> = [];
      let alliesSecondLane: Array<Unit> = [];
      let enemiesSecondLane: Array<Unit> = [];
      let enemiesFirstLane: Array<Unit> = [];
      if (unitPosition <= 5) {
        alliesFirstLane = allies.slice(3, 6);
        alliesSecondLane = allies.slice(0, 3);
        enemiesSecondLane = enemies.slice(3, 6);
        enemiesFirstLane = enemies.slice(0, 3);
      } else {
        alliesFirstLane = allies.slice(0, 3);
        alliesSecondLane = allies.slice(3, 6);
        enemiesSecondLane = enemies.slice(0, 3);
        enemiesFirstLane = enemies.slice(3, 6);
      }

      console.log("2 линия союзников", alliesSecondLane);
      console.log("1 линя союзников", alliesFirstLane);
      console.log("2 линия врагов", enemiesSecondLane);
      console.log("1 линя врагов", enemiesFirstLane);

      let isUnitInSecondLine: boolean = false;

      for (let index = 0; index < 3; ++index) {
        if (alliesSecondLane[index]._id === unitPosition) {
          isUnitInSecondLine = true;
          break;
        }
      }

      const getTargetsForUnitFirstLine = (
        unitPosition: number,
        alliesFirstLane: Array<Unit>,
        enemiesFirstLane: Array<Unit>
      ): Array<Unit> => {
        for (let index = 0; index < 3; ++index) {
          if (alliesFirstLane[index]._id === unitPosition) {
            if (index === 0) {
              console.log("left");
              const copyEnemiesFirstLane: Array<Unit> = [...enemiesFirstLane];
              const aliveTarget: Array<Unit> = copyEnemiesFirstLane.filter(
                unit => unit._HP > 0
              );
              if (
                aliveTarget.length === 1 &&
                aliveTarget[0]._id === enemiesFirstLane[2]._id
              )
                return aliveTarget;
              copyEnemiesFirstLane.pop();
              console.log(copyEnemiesFirstLane);
              return copyEnemiesFirstLane;
            } else if (index === 1) {
              console.log("center");
              console.log(enemiesFirstLane);
              return enemiesFirstLane;
            } else if (index === 2) {
              console.log("right");
              const copyEnemiesFirstLane: Array<Unit> = [...enemiesFirstLane];
              const aliveTarget: Array<Unit> = copyEnemiesFirstLane.filter(
                unit => unit._HP > 0
              );
              if (
                aliveTarget.length === 1 &&
                aliveTarget[0]._id === enemiesFirstLane[0]._id
              )
                copyEnemiesFirstLane.shift();
              console.log(copyEnemiesFirstLane);
              return copyEnemiesFirstLane;
            }
          }
        }
        return enemies;
      };

      if (isUnitInSecondLine) {
        console.log("unit in second line");
        let alliesDeadFirstLaneUnits: number = 0;
        alliesFirstLane.forEach(unit => {
          if (unit._HP === 0) ++alliesDeadFirstLaneUnits;
        });
        let enemiesDeadFirstLaneUnits: number = 0;
        enemiesFirstLane.forEach(unit => {
          if (unit._HP === 0) ++enemiesDeadFirstLaneUnits;
        });
        console.log("умерло врагов", enemiesDeadFirstLaneUnits);
        console.log("умерло союзников", alliesDeadFirstLaneUnits);
        if (alliesDeadFirstLaneUnits === 3 && enemiesDeadFirstLaneUnits === 3) {
          console.log("умерли все союзники на 1 линии и все враги на 1 линии");
          return getTargetsForUnitFirstLine(
            unitPosition,
            alliesSecondLane,
            enemiesSecondLane
          );
        }
        if (alliesDeadFirstLaneUnits === 3) {
          console.log("умерли все союзники на 1 линии");
          return getTargetsForUnitFirstLine(
            unitPosition,
            alliesSecondLane,
            enemiesFirstLane
          );
        }
      } else {
        console.log("unit in first line");

        let alliesDeadFirstLaneUnits: number = 0;
        enemiesFirstLane.forEach(unit => {
          if (unit._HP === 0) ++alliesDeadFirstLaneUnits;
        });
        if (alliesDeadFirstLaneUnits === 3) {
          console.log("умерли все сщюзники на 1 линии");
          return getTargetsForUnitFirstLine(
            unitPosition,
            alliesSecondLane,
            enemiesSecondLane
          );
        } else {
          console.log("не умерли все сщюзники на 1 линии");
          return getTargetsForUnitFirstLine(
            unitPosition,
            alliesFirstLane,
            enemiesFirstLane
          );
        }
      }

      return [];
    };
    if (unitPosition > 5) {
      const targets: Array<Unit> = getTargets(
        battleField.slice(6, 12),
        battleField.slice(0, 6),
        unitPosition
      );
      return targets;
    } else {
      const targets: Array<Unit> = getTargets(
        battleField.slice(0, 6),
        battleField.slice(6, 12),
        unitPosition
      );
      return targets;
    }
  }
}
