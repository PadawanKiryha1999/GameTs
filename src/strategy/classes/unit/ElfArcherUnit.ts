import IUnitInfo from "../../interface/IUnitInfo";
import DefaultStrategy from "./Unit";
import ArcherStrategy from "../unitStrategy/ArcherStrategy";
import img from "../../../img/Enchantress_icon.png";
export default class ElfArcherUnitInfo extends DefaultStrategy
  implements IUnitInfo {
  _unitType: string;
  _HP: number;
  _damage: number;
  _initiative: number;
  _actionType: void;
  _imgPath: any;
  _id: number ;
  _maxHP: number;

  constructor(id: number) {
    super(new ArcherStrategy());
    this._unitType = "range";
    this._HP = 90;
    this._damage = 40;
    this._initiative = 60;
    this._imgPath = img;
    this._id = id;
    this._maxHP = 90;
  }
}
