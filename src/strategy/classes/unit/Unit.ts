import IStrategy from "../../interface/IConcreteStrategy";
import IUnit from "../../interface/IUnit";
export default abstract class Unit implements IUnit {
  abstract _unitType: string;
  abstract _HP: number;
  abstract _damage: number;
  abstract _initiative: number;
  abstract _actionType: void;
  abstract _imgPath: string;
  abstract _id: number;

  private strategy: IStrategy;
  constructor(strategy: IStrategy) {
    this.strategy = strategy;
  }


  doDefenseAction(incomingDamage: number, curentHP: number) {
    
    console.log("defense");
  }
  doHPreduce(incomingDamage: number) {
  
    if (this._HP > incomingDamage) {
      this._HP -= incomingDamage;
    } else {
      this._HP = 0;
    }

    return this._HP;
  }
  setAgentTarget() {
 
    console.log("lala");
  }
  showInfo() {
    console.log(this);
  }

  getHP() {
    return this._HP;
  }

  public doAction(
    atackingUnit: number,
    target: number,
    targets: number[],
    battleField: Array<Unit>,
    HP: number[]
  ): number[] {
    return this.strategy.doAlgorithm(
      atackingUnit,
      target,
      targets,
      battleField,
      HP
    );
  }
  public doSelect(battleField: Array<Unit>): Array<Unit> {
    return this.strategy.doTargetSelection(this, battleField);
  }
}
