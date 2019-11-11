import IStrategy from "../../interface/IConcreteStrategy";
import Unit from "../unit/Unit";
export default class HexerStrategy implements IStrategy {
  public doAlgorithm(
    atackingUnit: number,
    target: number,
    targets: number[],
    battleField: Array<Unit>,
    HP: number[],
    protection: undefined,
    support: string
  ):number[] {
    console.log("Hexer strategy");
    return HP
  }
  public doTargetSelection(unit: Unit, battleField: Array<Unit>): Array<Unit> {
    console.log(" Hexer target selection");

    const copyBattleField = [...battleField];
    if (unit._id < 6) return copyBattleField.splice(6, 12);
    else return copyBattleField.splice(0, 6);
  }
}
