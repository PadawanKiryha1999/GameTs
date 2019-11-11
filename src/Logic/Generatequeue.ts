import Unit from "../strategy/classes/unit/Unit";
export const generateQueue: any = (
  units: Array<Unit>,
  newTurn?: string,
  isHexed?: boolean[]
) => {
  let copy: Array<Unit> = Object.assign([], units);
  if (newTurn) {
    console.log("its new round");
    const filteredHP: Array<Unit> = copy.filter(unit => unit._HP > 0);
    filteredHP.sort((a, b) => {
      if (a._initiative < b._initiative) {
        return 1;
      }
      if (a._initiative > b._initiative) {
        return -1;
      }
      return 0;
    });
    console.log("Отфильтровано по хп  и инициативе", filteredHP);
    console.log(isHexed);
    if (isHexed) {
      console.log("is hexed from generate");
      const copyFilteredHP = [...filteredHP];
      const filteredHPFilterUnHex: Array<Unit> = copyFilteredHP.filter(
        (unit, index) => isHexed[index] === false
      );
      console.log(
        "Отфильтровано по хп  и инициативе и хексу",
        filteredHPFilterUnHex
      );
      return filteredHPFilterUnHex;
    } else return filteredHP;
  }

  copy.sort((a, b) => {
    if (a._initiative < b._initiative) {
      return 1;
    }
    if (a._initiative > b._initiative) {
      return -1;
    }
    return 0;
  });
  return copy;
};
