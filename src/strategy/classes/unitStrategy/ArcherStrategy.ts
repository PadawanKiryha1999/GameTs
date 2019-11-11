import IStrategy from "../../interface/IConcreteStrategy";
import Unit from "../unit/Unit";
export default class ArcherStrategy implements IStrategy {
  public doAlgorithm(
    atackingUnit: number,
    target: number,
    targets: number[],
    battleField: Array<Unit>,
    HP: number[],
    isProtected: boolean[]
  ): number[] {
    console.log("Archer strategy ");
    console.log("atacking unit", atackingUnit);
    console.log("chosen target", target);
    console.log("array of targets", targets);
    console.log("battlefield", battleField);
    console.log("HPs", HP);
    const copyHP: number[] = [...HP];
    let { _damage } = battleField[atackingUnit];

    battleField[target].doHPreduce(_damage, isProtected[target]);
    console.log("Before action", copyHP);
    copyHP[target] = battleField[target].doHPUIReduce(
      copyHP[target],
      _damage,
      isProtected[target]
    );
    console.log("After action", copyHP);
    return copyHP;
  }
  public doTargetSelection(unit: Unit, battleField: Array<Unit>): Array<Unit> {
    console.log(" Archer target selection");
    const copyBattleField = [...battleField];
    if (unit._id < 6) return copyBattleField.splice(6, 12);
    else return copyBattleField.splice(0, 6);
  }
}
