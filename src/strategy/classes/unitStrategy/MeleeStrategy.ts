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
    if (unit._id > 5) {
      let enemies: Array<Unit> = battleField.slice(0, 6);
      const allies: Array<Unit> = battleField.slice(6, 12);

      let alliesFirstLane: Array<Unit> = allies.slice(0, 3);
      const alliesSecondLane: Array<Unit> = allies.slice(3, 6);
      const enemiesSecondLane: Array<Unit> = enemies.slice(0, 3);
      const enemiesFirstLane: Array<Unit> = enemies.slice(3, 6);
      // const setTarget=(alliesFirstLane:Array<Unit>,unit:Unit,enemiesFirstLane:Array<Unit>):Array<Unit>=>{
      //   return enemies
      // }
      const isInFirstLane = false;
      for (let index = 0; index < 3; index++) {
        console.log("index first lane", index);
        if (alliesFirstLane[index]._id === unit._id) {
          if (index === 1) {
            console.log("in first lane center ");
            const copy: Array<Unit> = [...enemiesFirstLane];
            const targets: Array<Unit> = copy.filter(unit => unit._HP > 0);
            enemies = targets;
            break;
          } else if (index === 0) {
            console.log("in first lane left ");
            const copyEnemiesFirstLane: Array<Unit> = [...enemiesFirstLane];
            const aliveUnitCopyEnemiesFirstLane: Array<
              Unit
            > = copyEnemiesFirstLane.filter(unit => unit._HP > 0);
            if (
              aliveUnitCopyEnemiesFirstLane.length === 1 &&
              aliveUnitCopyEnemiesFirstLane[0]._id === 5
            ) {
              console.log("AAAAAAAAAAAAAA");
              enemies = aliveUnitCopyEnemiesFirstLane;
              break;
            }
            copyEnemiesFirstLane.pop();
            const targets: Array<Unit> = copyEnemiesFirstLane.filter(
              unit => unit._HP > 0
            );
            enemies = targets;
            break;
          } else {
            console.log("in first lane right ");
            const copyEnemiesFirstLane: Array<Unit> = [...enemiesFirstLane];
            const aliveUnitCopyEnemiesFirstLane: Array<
              Unit
            > = copyEnemiesFirstLane.filter(unit => unit._HP > 0);
            if (
              aliveUnitCopyEnemiesFirstLane.length === 1 &&
              aliveUnitCopyEnemiesFirstLane[0]._id === 3
            ) {
              console.log("bbbbbb");
              enemies = aliveUnitCopyEnemiesFirstLane;
              break;
            }

            copyEnemiesFirstLane.shift();
            const targets: Array<Unit> = copyEnemiesFirstLane.filter(
              unit => unit._HP > 0
            );
            enemies = targets;
            break;
          }
        }
      }
      for (let index = 0; index < 3; ++index) {
        if (alliesSecondLane[index]._id === unit._id) {
          enemies = [];
        }
      }
      let deathUnit: number = 0;
      alliesFirstLane.forEach(unit => {
        if (unit._HP === 0) ++deathUnit;
      });
      console.log("умершие юниты", deathUnit);
      if (deathUnit === 3) {
        console.log("all unit in first laine is died");
        console.log(alliesFirstLane);
        console.log(alliesSecondLane);
      }
      return enemies;
    } else {
      let enemies: Array<Unit> = battleField.slice(6, 12);
      const allies: Array<Unit> = battleField.slice(0, 6);

      const alliesSecondLane: Array<Unit> = allies.slice(0, 3);
      let alliesFirstLane: Array<Unit> = allies.slice(3, 6);
      const enemiesFirstLane: Array<Unit> = enemies.slice(0, 3);
      const enemiesSecondLane: Array<Unit> = enemies.slice(3, 6);

      for (let index = 0; index < 3; ++index) {
        console.log("index first lane", index);
        if (alliesFirstLane[index]._id === unit._id) {
          if (index === 1) {
            console.log("in first lane center ");
            enemies = enemiesFirstLane;
            break;
          } else if (index === 0) {
            console.log("in first lane left ");
            const copyEnemiesFirstLane: Array<Unit> = [...enemiesFirstLane];
            const aliveUnitCopyEnemiesFirstLane: Array<
              Unit
            > = copyEnemiesFirstLane.filter(unit => unit._HP > 0);
            if (
              aliveUnitCopyEnemiesFirstLane.length === 1 &&
              aliveUnitCopyEnemiesFirstLane[0]._id === 8
            ) {
              console.log("AAAAAAAAAAAAAA");
              enemies = aliveUnitCopyEnemiesFirstLane;
              break;
            }

            copyEnemiesFirstLane.pop();
            const targets: Array<Unit> = copyEnemiesFirstLane.filter(
              unit => unit._HP > 0
            );
            enemies = targets;
            break;
          } else {
            console.log("in first lane right ");

            console.log("in first lane right ");
            const copyEnemiesFirstLane: Array<Unit> = [...enemiesFirstLane];
            const aliveUnitCopyEnemiesFirstLane: Array<
              Unit
            > = copyEnemiesFirstLane.filter(unit => unit._HP > 0);
            if (
              aliveUnitCopyEnemiesFirstLane.length === 1 &&
              aliveUnitCopyEnemiesFirstLane[0]._id === 6
            ) {
              console.log("bbbbbb");
              enemies = aliveUnitCopyEnemiesFirstLane;
              break;
            }

            copyEnemiesFirstLane.shift();
            const targets: Array<Unit> = copyEnemiesFirstLane.filter(
              unit => unit._HP > 0
            );
            enemies = targets;
            break;
          }
        }
      }

      for (let index = 0; index < 3; ++index) {
        if (alliesSecondLane[index]._id === unit._id) {
          enemies = [];
        }
      }

      let deathUnit: number = 0;
      alliesFirstLane.forEach(unit => {
        if (unit._HP === 0) ++deathUnit;
      });
      console.log("умершие юниты", deathUnit);
      if (deathUnit === 3) {
        console.log("all unit in first laine is died");
        console.log(alliesFirstLane);
        console.log(alliesSecondLane);
      }
      return enemies;
    }
  }
}
