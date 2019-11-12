import IUnitInfo from "../../interface/IUnitInfo";
import DefaultStrategy from "./Unit";
import MeleeStrategy from "../unitStrategy/MeleeStrategy";
import img from "../../../img/Centaur_Warrunner_icon.png";
export default class CentaurUnitInfo extends DefaultStrategy
  implements IUnitInfo {
  _unitType: string;
  _HP: number;
  _damage: number;
  _initiative: number;
  _actionType: void;
  _imgPath: any;
  _id: number;
  _maxHP: number;

  constructor(id: number) {
    super(new MeleeStrategy());
    this._unitType = "melee";
    this._HP = 150;
    this._damage = 50;
    this._initiative = 100;
    this._maxHP = 150;
    this._imgPath = img;
    this._id = id;
  }
}
