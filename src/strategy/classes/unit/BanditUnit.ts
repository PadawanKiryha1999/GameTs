import IUnitInfo from "../../interface/IUnitInfo";
import DefaultStrategy from "./Unit";
import RangeStrategy from "../unitStrategy/ArcherStrategy";
import img from "../../../img/Mirana_icon.png";
export default class BanditUnitInfo extends DefaultStrategy
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
    super(new RangeStrategy());
    this._unitType = "range";
    this._HP = 45;
    this._damage = 30;
    this._initiative = 60;
    this._imgPath = img;
    this._id = id;
    this._maxHP = 45;
  }
}
