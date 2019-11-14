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
  hexed: boolean;
  protected: boolean;
}
export const UnitUI: FunctionComponent<UnitUIProps> = props => {
  const [currentHP, setCurrentHP] = useState(props.currentUnit._HP);
  const hp = props.currentUnit.getHP();

  return (
    <React.Fragment>
      {props.underAtack ? (
        // <div  className="cell-atacked">
        <div
          className={props.isActive ? "cell-active" : "cell-atacked"}
          onClick={() => {
            props.onClick();
          }}
        >
          <div className="cell__unit-info">
            {props.isActive ? (
              <React.Fragment>
                <img
                  onClick={() => {
                    props.onDefenseClick();
                  }}
                  className="cell__unit-info__image"
                  src={props.currentUnit._imgPath}
                  alt="img"
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <img
                  className="cell__unit-info__image_without-defense"
                  src={props.currentUnit._imgPath}
                  alt="img"
                />
              </React.Fragment>
            )}
            <div className="cell__unit-info__options">
              <React.Fragment>
                <div className="cell__unit-info__options__defense">
                  {props.protected ? (
                    <div className="protected" style={{ color: "pink" }}>
                      <button
                        className="defense-button"
                        disabled={!props.isActive}
                      >
                        <img src={defense} width={40} alt="img" />
                      </button>
                    </div>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                </div>
              </React.Fragment>
              <div className="cell__HP">{props.HP}</div>
            </div>
          </div>
          {props.hexed ? (
            <div className="hexed" style={{ color: "pink" }}>
              hexed
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <React.Fragment>
          {props.isActive ? (
            <div className="cell-active">
              <div className="cell__unit-info">
                <img
                  onClick={() => {
                    props.onDefenseClick();
                  }}
                  className="cell__unit-info__image"
                  src={props.currentUnit._imgPath}
                  alt="img"
                />
                <div className="cell__unit-info__options">
                  <React.Fragment>
                    <div className="cell__unit-info__options__defense">
                      {props.protected ? (
                        <div className="protected" style={{ color: "pink" }}>
                          <button
                            className="defense-button"
                            disabled={!props.isActive}
                          >
                            <img src={defense} width={40} alt="img" />
                          </button>
                        </div>
                      ) : (
                        <React.Fragment></React.Fragment>
                      )}
                    </div>
                  </React.Fragment>
                  <div className="cell__HP">{props.HP}</div>
                </div>
              </div>
              {props.hexed ? (
                <div className="hexed" style={{ color: "pink" }}>
                  hexed
                </div>
              ) : (
                <div></div>
              )}
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
                  <React.Fragment>
                    <div className="cell__unit-info__options__defense">
                      {props.protected ? (
                        <div className="protected" style={{ color: "pink" }}>
                          <button
                            className="defense-button"
                            disabled={!props.isActive}
                          >
                            <img src={defense} width={40} alt="img" />
                          </button>
                        </div>
                      ) : (
                        <React.Fragment></React.Fragment>
                      )}
                    </div>
                  </React.Fragment>
                  <div className="cell__HP">{props.HP}</div>
                </div>
              </div>

              {props.hexed ? (
                <div className="hexed" style={{ color: "pink" }}>
                  hexed
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
