import IUnitInfo from "../../interface/IUnitInfo";
import DefaultStrategy from "./Unit";
import HealerStrategy from "../unitStrategy/HealerStrategy";
import img from "../../../img/Nature's_Prophet_icon.png";
export default class MonkUnitInfo extends DefaultStrategy implements IUnitInfo {
  _unitType: string;
  _HP: number;
  _damage: number;
  _initiative: number;
  _actionType: void;
  _imgPath: any;
  _id: number;
  _maxHP: number;
  constructor(id: number) {
    super(new HealerStrategy());
    this._unitType = "healer";
    this._HP = 70;
    this._damage = 40;
    this._initiative = 20;
    this._imgPath = img;
    this._id = id;
    this._maxHP = 70;
  }
}
