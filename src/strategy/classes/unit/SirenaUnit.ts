import IUnitInfo from "../../interface/IUnitInfo";
import DefaultStrategy from "./Unit";
import HexerStrategy from "../unitStrategy/HexerStrategy";
import img from "../../../img/Naga_Siren_icon.png";
export default class SerenaUnitInfo extends DefaultStrategy
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
    super(new HexerStrategy());
    this._unitType = "paralyazer";
    this._HP = 80;
    this._damage = 0;
    this._initiative = 20;
    this._imgPath = img;
    this._id = id;
    this._maxHP = 80;
  }
}
