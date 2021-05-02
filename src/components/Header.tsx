import React, { useState } from "react";

import useBreakpoints from "../hooks/useBreakpoints";

import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Sun } from "../assets/icons/sun.svg";
import { ReactComponent as Moon } from "../assets/icons/moon.svg";

import { AppState, Theme, View } from "../types";
import { setTheme, setView } from "../redux/actionCreator";
import { connect, ConnectedProps } from "react-redux";

type Props = ConnectedProps<typeof connector>;

const Header: React.FC<Props> = (props) => {
  const [themeDropdown, toggleThemeDropdown] = useState(false);
  const { type } = useBreakpoints();

  const { setView, theme, setTheme } = props;

  function onThemeSelected(value: Theme) {
    setTheme(value);
    toggleThemeDropdown(false);
  }

  function toggleTheme() {
    if (theme === "light") setTheme("dark");
    if (theme === "dark") setTheme("light");
  }

  return (
    <div className="header">
      {themeDropdown && (
        <div
          className="overlay-invisible"
          onClick={() => toggleThemeDropdown(false)}
        ></div>
      )}
      <div className="navbar">
        <div onClick={() => setView("home")} className="navbar-logo-container">
          <Logo className="nav-logo" />
        </div>
        {type !== "xs" && (
          <ul className="nav-list">
            <li className="nav-item">
              <div onClick={() => setView("home")}>Home</div>
            </li>
            <li className="nav-item">
              <div onClick={() => setView("home")}>Sources</div>
            </li>
            <li className="nav-item dropdown-trigger">
              <a
                onClick={() =>
                  toggleThemeDropdown((themeDropdown) => !themeDropdown)
                }
              >
                Theme
              </a>
              {themeDropdown && (
                <div className="dropdown-target">
                  <div onClick={() => onThemeSelected("light")}>
                    <Sun />
                    <p>Light</p>
                  </div>
                  <hr></hr>
                  <div onClick={() => onThemeSelected("dark")}>
                    <Moon />
                    <p>Dark</p>
                  </div>
                </div>
              )}
            </li>
            <li className="nav-item">
              <div onClick={() => setView("home")}>About</div>
            </li>
          </ul>
        )}
        {type === "xs" && (
          <div id="themeToggler" onClick={toggleTheme}>
            {theme === "dark" && <Sun />}
            {theme === "light" && <Moon />}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    theme: state.theme,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setView: (view: View) => dispatch(setView(view)),
    setTheme: (theme: Theme) => dispatch(setTheme(theme)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Header);
