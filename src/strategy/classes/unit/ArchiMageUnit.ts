import IUnitInfo from "../../interface/IUnitInfo";
import Unit from "./Unit";
import MageStrategy from "../unitStrategy/MageStrategy";
import img from "../../../img/Void_Spirit_icon.png";
export default class ArchiMageUnitInfo extends Unit implements IUnitInfo {
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
    this._HP = 90;
    this._damage = 40;
    this._initiative = 40;
    this._imgPath = img;
    this._id = id;
    this._maxHP = 90;
  }
}
