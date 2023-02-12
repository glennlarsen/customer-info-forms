import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { stack as Menu } from "react-burger-menu";
import { confirmAlert } from "react-confirm-alert";
import AuthContext from "utils/AuthContext";
import burgerIcon from "images/burger-icon.png";

import Header from "components/Header";
import SideBarMenu from "components/common/SideBarMenu";

function Layout({
  children,
  showBackButton,
  backPage,
  showHowItWorks,
  title,
  info,
  showSideBar,
}) {
  const [auth, setAuth] = useContext(AuthContext);
  const [menuState, setMenuState] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuState(false);
  };

  const handleStateChange = (state) => {
    setMenuState(state.isOpen);
  };

  const logout = () => {
    closeMenu();
    confirmAlert({
      title: "Logout",
      message: "Are you sure you want to logout?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setAuth(null);
            navigate("/");
          },
        },
        {
          label: "No",
          onClick: () => null,
        },
      ],
    });
  };

  const goBack = () => {
    navigate(backPage ? `/${backPage}` : -1);
    closeMenu();
  };

  return (
    <div className="main-layout">
      {showSideBar === "none" ? null : (
        <Menu
          customBurgerIcon={<img src={burgerIcon} />}
          width={310}
          left
          isOpen={menuState}
          onStateChange={handleStateChange}
        >
          {
            <SideBarMenu
              info={info}
              showBackButton={showBackButton}
              showHowItWorks={showHowItWorks}
              goBack={goBack}
              logout={logout}
              auth={auth}
              closeMenu={closeMenu}
            />
          }
        </Menu>
      )}
      <nav className="desktop-nav">
        {
          <SideBarMenu
            info={info}
            showBackButton={showBackButton}
            showHowItWorks={showHowItWorks}
            showSideBar={showSideBar}
            goBack={goBack}
            logout={logout}
            auth={auth}
          />
        }
      </nav>
      {title ? <Header title={title} /> : null}
      {children}
    </div>
  );
}

export default Layout;
