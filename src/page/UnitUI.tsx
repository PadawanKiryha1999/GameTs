import React, { FunctionComponent, useEffect, useState } from "react";
import Unit from "../strategy/classes/unit/Unit";
import defense from "../../src/img/18-512.png";
import "./CenterPart.css";

interface UnitUIProps {
  currentIndex: number;
  currentUnit: Unit;
  onClick: any;
  HP: number;
  underAtack: boolean;
  onDefenseClick: any;
  isActive: boolean;
}
export const UnitUI: FunctionComponent<UnitUIProps> = props => {
  const [currentHP, setCurrentHP] = useState(props.currentUnit._HP);
  const hp = props.currentUnit.getHP();

  return (
    <React.Fragment>
      {props.underAtack ? (
        <div className="cell-atacked">
          <div className="cell__unit-info">
            <img
              onClick={() => {
                props.onClick();
              }}
              className="cell__unit-info__image"
              src={props.currentUnit._imgPath}
              alt="img"
            />
            <div className="cell__unit-info__options">
              <div className="cell__unit-info__options__defense">
                <button
                  disabled={!props.isActive}
                  onClick={() => {
                    props.onDefenseClick();
                  }}
                >
                  <img src={defense} width={40} alt="img" />
                </button>
              </div>
            </div>
          </div>
          <div className="cell__HP">
            {/* <progress
            className="cell__HP__bar"
            value={props.HP}
            // value={currentUnit.getHP()}
            max={props.currentUnit._HP}
          ></progress> */}
            {props.HP}
          </div>
          {props.isActive ? <div>Active</div> : <div></div>}
        </div>
      ) : (
        <div className="cell">
          <div className="cell__unit-info">
            <img
              onClick={() => {
                console.log(props.currentUnit);
              }}
              className="cell__unit-info__image"
              src={props.currentUnit._imgPath}
              alt="img"
            />
            <div className="cell__unit-info__options">
              <div className="cell__unit-info__options__defense">
                <button
                  disabled={!props.isActive}
                  onClick={() => {
                    props.onDefenseClick();
                  }}
                >
                  <img src={defense} width={40} alt="img" />
                </button>
              </div>
            </div>
          </div>
          <div className="cell__HP">
            {/* <progress
            className="cell__HP__bar"
            value={props.HP}
            // value={currentUnit.getHP()}
            max={props.currentUnit._HP}
          ></progress> */}
            {props.HP}
          </div>
          {props.isActive ? <div>Active</div> : <div></div>}
        </div>
      )}
    </React.Fragment>
  );
};
