import ArchiMage from "../strategy/classes/unit/ArchiMageUnit";
import Bandit from "../strategy/classes/unit/BanditUnit";
import Centaur from "../strategy/classes/unit/CentaurUnit";
import ElfArcher from "../strategy/classes/unit/ElfArcherUnit";
import Monk from "../strategy/classes/unit/MonkUnit";
import Sirena from "../strategy/classes/unit/SirenaUnit";
import SkeletonMage from "../strategy/classes/unit/SkeletonMageUnit";
import Skeleton from "../strategy/classes/unit/SkeletonUnit";
import Unit from "../strategy/classes/unit/Unit";

const allUnits: object[] = [
  ArchiMage,
  Bandit,
  Centaur,
  ElfArcher,
  Monk,
  Sirena,
  Skeleton,
  SkeletonMage
];
// export const randomIndex: number = Math.floor(Math.random() * 8);
// export const randomUnit: object = allUnits[randomIndex];
export const takeRandomUnit: any = () => {
  let randomIndex: number = Math.floor(Math.random() * 8);
  let randomUnit: any = allUnits[randomIndex];
  let unit = new randomUnit();
  return unit;
};
export const UnitsArrayGenerate: any = () => {
  const units: Array<Unit> = [];
  const generateRandomUnit: any = (index: number) => {
    let randomIndex: number = Math.floor(Math.random() * 8);
    let randomUnit: any = allUnits[randomIndex];
    let unit: object = new randomUnit(index);
    return unit;
  };
  for (let i: number = 0; i < 12; ++i) {
    units.push(generateRandomUnit(i));
  }
  return units;
};

export const UnitsArray: Array<Unit> = UnitsArrayGenerate();
