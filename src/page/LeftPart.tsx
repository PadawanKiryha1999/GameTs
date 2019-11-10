import React, { FunctionComponent } from "react";
import Unit from "../strategy/classes/unit/Unit";
import { generateQueue } from "../Logic/Generatequeue";
import { QueueUI } from "./QueueUI";
import "./LeftPart.css";
interface LeftPartProps {
  units: Array<Unit>;
 
  HP: number;
}
export const LeftPart: FunctionComponent<LeftPartProps> = props => {
  const renderCell = () => {
    const unitsArrayUI: any = props.units.map((unit, index) => {
      return (
        <QueueUI
          HP={props.HP}
          key={index}
          currentUnit={unit}
          currentIndex={index}
          
        />
      );
    });

    return unitsArrayUI;
  };

  return <div className="left-part">{renderCell()}</div>;
};
