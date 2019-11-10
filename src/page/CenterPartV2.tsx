import React, {
  FunctionComponent,
  useEffect,
  useState,
  ReactElement
} from "react";
import { UnitsArray } from "../Logic/GenerateUnits";
// import Unit from "../strategy/classes/unit/Unit";
import "./CenterPart.css";
import defense from "../../src/img/18-512.png";
import Unit from "../strategy/classes/unit/Unit";
import { UnitUI } from "./UnitUI";
import { ReactComponent } from "*.svg";

interface CenterPartProps {
  units: Array<Unit>;
  onClick: any;
  HP: number;
}
export const CenterPartV2: FunctionComponent<CenterPartProps> = props => {
  // const unitsArrayUI: any = props.units.map((unit, index) => {
  //   if (index === 5) {
  //     return (
  //       <React.Fragment key={index}>
  //         <UnitUI
  //           currentUnit={unit}
  //           currentIndex={index}
  //           onClick={() => {
  //             props.onClick(index);
  //           }}
  //           HP={props.HP}
  //         />
  //         <div className="border" key={100}></div>
  //       </React.Fragment>
  //     );
  //   }
  //   return (
  //     <UnitUI
  //       HP={props.HP}
  //       key={index}
  //       currentUnit={unit}
  //       currentIndex={index}
  //       onClick={() => {
  //         props.onClick(index);
  //       }}
  //     />
  //   );
  // });

  // return <div className="battleField">{unitsArrayUI}</div>;
  return <div className="battleField"></div>;
};
