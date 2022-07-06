import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import Hamburger from "hamburger-react";

import { useWindowSize } from "../../hooks/mediaHook";
import Button from "../button";
import { menuTree } from "../../generative/menuTree";

import styles from "./header.module.scss";

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);
  const device = useWindowSize();

  return (
    <div className={styles.header}>
      <p>Myo-Spir</p>
      <Hamburger toggled={isOpen} toggle={setIsOpen} color="#000" size={24} />
      <Menu menuTree={menuTree} isOpen={isOpen} />
    </div>
  );
};

export default Header;

const Menu = ({ isOpen, menuTree }) => {
  const [menuToggle, setMenuToggle] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const menuClass = !isOpen ? `${styles.closed}` : `${styles.open}`;

  const toggleSubMenu = id => {
    if (id === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(id);
    }
  };

  return (
    <nav className={`${styles.menuContainer} ${menuClass}`}>
      <div className={styles.menu}>
        {menuTree.map(entry =>
          <MenuItem
            activeIndex={activeIndex}
            key={entry.id}
            id={entry.id}
            link={entry.link}
            name={entry.name}
            menuToggle={menuToggle}
            setMenuToggle={setMenuToggle}
            toggleSubMenu={toggleSubMenu}
          >
            {entry.children}
          </MenuItem>
        )}
      </div>
    </nav>
  );
};

const MenuItem = ({
  activeIndex,
  id,
  isMobile,
  link,
  name,
  children,
  menuToggle,
  setMenuToggle,
  toggleSubMenu
}) => {
  const dropDownRef = useRef(null);
  const [itemHeight, setItemHeight] = useState(25);
  const openHeight = children ? (children.length * 2) * itemHeight : itemHeight;
  const isActive = id !== activeIndex ? false : true;

  const open = {
    height: openHeight,
  };

  const closed = {
    height: itemHeight,
    // opacity: activeIndex !== null && .3,
    // pointerEvents:  activeIndex !== null && !children && "none",
    // cursor: activeIndex != null && "crosshair"
  };

  // useEffect(
  //   () => {
  //     const pageClick = e => {
  //       if (
  //         dropDownRef.current !== null &&
  //         !dropDownRef.current.contains(e.target)
  //       ) {
  //         setIsOpen(false);
  //       }
  //       if (isOpen) {
  //         window.addEventListener("click", pageClick);
  //       }
  //     };
  //     return () => {
  //       window.removeEventListener("click", pageClick);
  //     };
  //   },
  //   []
  // );

  return (
    <nav style={isActive ? open : closed} ref={dropDownRef}>
      {children
        ? <Button
            className="menuButton"
            onClick={() => {
              toggleSubMenu(id);
            }}
          >
            {isActive ? `${name} -` : `${name} +`}
          </Button>
        : <Link href={`${link}`}>
            <a>
              {name}
            </a>
          </Link>}
      {children &&
        <nav
          className={
            id !== activeIndex
              ? `${styles.submenuClosed}`
              : `${styles.submenuOpen}`
          }
        >
          {children.map(child =>
            <Link key={child.id} href={`${child.link}`}>
              <a>
                {child.name}
              </a>
            </Link>
          )}
        </nav>}
    </nav>
  );
};
