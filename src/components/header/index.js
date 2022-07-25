import { useState } from "react";
import Hamburger from "hamburger-react";
import Link from "next/link";

import { useScroll } from "../../hooks/useScroll";
import { useWindowSize, mobileSizes } from "../../hooks/mediaHook";

import Logo from "../svg/logo";
import Menu from "./menu";

import styles from "./header.module.scss";

const Header = () => {
  // Menu UI state:
  const [menuState, setMenuState] = useState({
    currentPage: null,
    isOpen: false
  });
  const showFullMenu = !mobileSizes.includes(useWindowSize());
  const headerClass = showFullMenu
    ? `${styles.headerLarge}`
    : `${styles.headerMobile}`;
  const scrollClass = useScroll(25) && `${styles.scrolled}`;

  const handleMenu = (state, val) => {
    setMenuState(prevState => ({
      ...prevState,
      [state]: val
    }));
  };

  return (
    <div className={`${headerClass} ${scrollClass}`}>
      <div className={styles.headerWrapper}>
        <div className={styles.navWrapper}>
          <Link href="/">
            <a
              onClick={() => handleMenu("currentPage", null)}
              className={styles.homeLink}
            >
              <Logo className={styles.logo} />
            </a>
          </Link>
          {!showFullMenu &&
            <Hamburger
              toggled={menuState.isOpen}
              toggle={() => handleMenu("isOpen", !menuState.isOpen)}
              color="#000"
              size={28}
            />}
          <Menu
            menuState={menuState}
            handleMenu={handleMenu}
            showFullMenu={showFullMenu}
            setMenuState={setMenuState}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
