import Unit from "../unit/Unit";
import IStrategy from "../../interface/IConcreteStrategy";
export default class MageStrategy implements IStrategy {
  public doAlgorithm(
    atackingUnit: number,
    target: number,
    targets: number[],
    battleField: Array<Unit>,
    HP: number[],
    isProtected: boolean[]
  ): number[] {
    const copyHP: number[] = [...HP];
    const { _damage } = battleField[atackingUnit];
    console.log("atackingUnit", atackingUnit);
    console.log("targets", targets);
    battleField.forEach((unit, index) => {
      if (targets.indexOf(unit._id) === -1) {
      } else {
        unit.doHPreduce(_damage, isProtected[index]);
        console.log("Before action", copyHP);
        copyHP[index] = unit.doHPUIReduce(
          copyHP[index],
          _damage,
          isProtected[index]
        );
        console.log("After action", copyHP);
      }
    });

    console.log(battleField);
    return copyHP;
  }
  public doTargetSelection(unit: Unit, battleField: Array<Unit>): Array<Unit> {
    console.log(" Mage target selection");

    const copyBattleField = [...battleField];
    if (unit._id < 6) return copyBattleField.splice(6, 12);
    else return copyBattleField.splice(0, 6);
  }
}
