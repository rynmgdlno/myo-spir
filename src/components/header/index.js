import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import Hamburger from "hamburger-react";

import { useWindowSize } from "../../hooks/mediaHook";
import Button from "../button";
import { menuTree } from "../../generative/menuTree";

import styles from "./header.module.scss";
// import menuTransition from './CSSTransitions.module.scss'

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);
  // const device = useWindowSize();

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
    // <nav className={`${styles.menuContainer} ${menuClass}`}>
    <div className={`${styles.menu} ${menuClass}`}>
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
  );
};

const MenuItem = ({ activeIndex, id, link, name, children, toggleSubMenu }) => {
  const dropDownRef = useRef(null);
  const isActive = id !== activeIndex ? false : true;

  return (
    <nav ref={dropDownRef}>
      {children
        ? <Button
            className="menuButton"
            onClick={() => {
              toggleSubMenu(id);
            }}
          >
            {`${name} +`}
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
              ? `${styles.subMenu} ${styles.closed}`
              : `${styles.subMenu} ${styles.open}`
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
