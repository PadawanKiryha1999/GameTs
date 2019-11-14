import Unit from "../strategy/classes/unit/Unit";
export const generateQueue: any = (
  units: Array<Unit>,
  newTurn?: string,
  isHexed?: boolean[]
) => {
  let copy: Array<Unit> = Object.assign([], units);
  const copyFilteredHP = [...copy];
  let a: Array<Unit> = [...copyFilteredHP];
  if (newTurn) {
    console.log("its new round");
    if (isHexed) {
      console.log("is hexed from generate");

      a = copyFilteredHP.filter((unit, index) => isHexed[index] === false);
      console.log("Отфильтровано по хп  и инициативе и хексу", a);
    }
    const filteredHP: Array<Unit> = a.filter(unit => unit._HP > 0);
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
    console.log("принеятый массив хексов", isHexed);
    return filteredHP;
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
