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
  abstract _maxHP: number;

  private strategy: IStrategy;
  constructor(strategy: IStrategy) {
    this.strategy = strategy;
  }

  doHPreduce(incomingDamage: number, isProtected?: boolean) {
    let damage = incomingDamage;
    if (isProtected) {
      damage = incomingDamage * 0.5;
    }
    if (damage < 0) {
      const heal = damage * -1;
      console.log("heal ", heal);
      if (this._HP + heal >= this._maxHP) {
        console.log("bigger");
        this._HP = this._maxHP;
      } else {
        console.log("lover");
        this._HP = this._HP + heal;
      }
    }
    else if (this._HP > damage) {
      this._HP -= damage;
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

  doHPUIReduce(HPUI: number, incomingDamage: number, isProtected?: boolean) {
    console.log("Its HPReduce UI");
    console.log("Hp before atack", HPUI);
    let damage = incomingDamage;
    console.log("будет хил", damage, this._maxHP);
    if (isProtected) {
      damage = incomingDamage * 0.5;
    }
    if (damage < 0) {
      const heal = damage * -1;
      console.log("heal UI");
      if (HPUI + heal >= this._maxHP) {
        console.log("max HP hp UI", this._maxHP);
        HPUI = this._maxHP;
        console.log("HPUI heal + hp >");
      } else {
        HPUI = HPUI + heal;
        console.log("HPUI heal + hp <");
      }
    }
    else if (damage >= HPUI) {
      HPUI = 0;
    } else {
      HPUI -= damage;
    }
    console.log("Hp after atack", HPUI);
    return HPUI;
  }

  public doAction(
    atackingUnit: number,
    target: number,
    targets: number[],
    battleField: Array<Unit>,
    HP: number[],
    isProtected?: boolean[],
    support?: string
  ): number[] {
    return this.strategy.doAlgorithm(
      atackingUnit,
      target,
      targets,
      battleField,
      HP,
      isProtected,
      support
    );
  }
  public doSelect(battleField: Array<Unit>): Array<Unit> {
    return this.strategy.doTargetSelection(this, battleField);
  }
}
