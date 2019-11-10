import Unit from "../strategy/classes/unit/Unit";
export const generateQueue: any = (units: Array<Unit>, newTurn?: string) => {
  let copy: Array<Unit> = Object.assign([], units);
  if (newTurn) {
    console.log("its new turn");
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
