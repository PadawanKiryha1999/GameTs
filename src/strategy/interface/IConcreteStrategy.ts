import Unit from "../classes/unit/Unit";

export default interface IStrategy {
  doAlgorithm(
    atackingUnit: number,
    target: number,
    targets: number[],
    battleField: Array<Unit>,
    HP: number[],
    protecion?: boolean[],
    support?:string
  ): number[];
  doTargetSelection(unit: Unit, battleField: Array<Unit>): Array<Unit>;
}
