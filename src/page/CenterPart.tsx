import React from "react";
import { takeRandomUnit } from "../Logic/GenerateUnits";
import "./CenterPart.css";
import defense from "../../src/img/18-512.png";
export const CenterPart: React.FC = () => {
  const rederCell = (position: number): any => {
    let unit: any = takeRandomUnit();
    let value: number = 40;
   
    const activateButton = () => {};
    return (
      <div>
        <div className="cell">
          <div className="cell__unit-info">
            <img
              onClick={() => {
                activateButton();
              }}
              className="cell__unit-info__image"
              src={unit._imgPath}
              alt="img"
            />
            <div className="cell__unit-info__options">
              <div className="cell__unit-info__options__defense">
                <button onClick={() => {}}>
                  <img src={defense} width={40} alt="img" />
                </button>
              </div>
            </div>
          </div>
          <div className="cell__HP">
            <progress className="cell__HP__bar" value={value} max={unit._HP}>
              {value}
            </progress>
          </div>
        </div>
      </div>
    );
  };
  const renderField = (): any => {
    return (
      <div className="battleField">
        <div className="row">
          <div>{rederCell(1)}</div>
          <div>{rederCell(2)}</div>
          <div>{rederCell(3)}</div>
        </div>
        <div className="row">
          <div>{rederCell(4)}</div>
          <div>{rederCell(5)}</div>
          <div>{rederCell(6)}</div>
        </div>

        <div className="row border-button">
          <div>{rederCell(7)}</div>
          <div>{rederCell(8)}</div>
          <div>{rederCell(9)}</div>
        </div>
        <div className="row">
          <div>{rederCell(10)}</div>
          <div>{rederCell(11)}</div>
          <div>{rederCell(12)}</div>
        </div>
      </div>
    );
  };

  return <div className="centerPart">{renderField()}</div>;
};
