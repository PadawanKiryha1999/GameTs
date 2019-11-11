import IUnitInfo from "../../interface/IUnitInfo";
import DefaultStrategy from "./Unit";
import MageStrategy from "../unitStrategy/MageStrategy";
import img from "../../../img/Lich_icon.png";
export default class SkeletonMageUnitInfo extends DefaultStrategy
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
    super(new MageStrategy());
    this._unitType = "mage";
    this._HP = 50;
    this._damage = 20;
    this._initiative = 40;
    this._imgPath = img;
    this._id = id;
    this._maxHP = 50;
  }
}
