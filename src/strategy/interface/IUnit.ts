import IUnitInfo from "./IUnitInfo";
export default interface IUnit {
  _unitType: string;
  _HP: number;
  _damage: number;
  _initiative: number;
  _actionType: void;
  _imgPath: any;
  doDefenseAction(incomingDamage: number, curentHP: number): void;
  setAgentTarget(): any;
  doHPreduce(incomingDamage: number, curentHP: number): number;
  getHP(): void;
}
