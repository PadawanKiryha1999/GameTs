import IUnitInfo from "./IUnitInfo";
export default interface IUnit {
  _unitType: string;
  _HP: number;
  _damage: number;
  _initiative: number;
  _actionType: void;
  _imgPath: any;
  _maxHP:number
  setAgentTarget(): any;
  doHPreduce(incomingDamage: number, isProtected?: boolean): number;
  doHPUIReduce(HPUI: number, incomingDamage: number, isProtected: boolean):number;
  getHP(): void;
}
