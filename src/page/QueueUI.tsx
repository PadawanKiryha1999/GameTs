import React, { FunctionComponent, useEffect, useState } from "react";
import Unit from "../strategy/classes/unit/Unit";
import defense from "../../src/img/18-512.png";
import "./LeftPart.css";

interface QueueUIProps {
  currentIndex: number;
  currentUnit: Unit;

  HP: number;
}
export const QueueUI: FunctionComponent<QueueUIProps> = props => {
  const [currentHP, setCurrentHP] = useState(props.currentUnit._HP);
  const hp = props.currentUnit.getHP();

  return (
    <React.Fragment>
      <div className="queue-cell">
        <div className="queue-cell__unit-info">
          <img
            onClick={() => {}}
            className="queue-cell__unit-info__image"
            src={props.currentUnit._imgPath}
            alt="img"
          />
          <div className="queue-cell__unit-info__options">
            <div className="queue-cell__unit-info__options__defense">
              {/* <button onClick={() => {}}>
                <img src={defense} width={30} alt="img" />
              </button> */}
            </div>
          </div>
        </div>
        <div className="queue-cell__HP">
          {/* <progress
            className="queue-cell__HP__bar"
            value={props.HP}
            // value={currentUnit.getHP()}
            max={props.currentUnit._HP}
          ></progress> */}
          {props.HP}
        </div>
      </div>
    </React.Fragment>
  );
};
