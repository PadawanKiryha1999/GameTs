import IUnitInfo from "../../interface/IUnitInfo";
import MeleeStrategy from "../unitStrategy/MeleeStrategy";
import DefaultStrategy from "./Unit";
import img from "../../../img/Skeleton_King_icon.png";

export default class SkeletonUnitInfo extends DefaultStrategy
  implements IUnitInfo {
  _unitType: string;
  _HP: number;
  _damage: number;
  _initiative: number;
  _actionType: void;
  _imgPath: any;
  _id: number;

  constructor(id: number) {
    super(new MeleeStrategy());
    this._unitType = "melee";
    this._HP = 100;
    this._damage = 25;
    this._initiative = 150;
    // this._initiative = 100;
    this._imgPath = img;
    this._id = id;
  }
}
