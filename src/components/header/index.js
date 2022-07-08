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
      <Menu menuTree={menuTree} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Header;

const Menu = ({ isOpen, setIsOpen, menuTree }) => {
  const [menuToggle, setMenuToggle] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const menuSlide = !isOpen ? `${styles.closed}` : `${styles.open}`;
  const subMenuSlide = activeIndex !== null && `${styles.subMenuSlide}`;

  const toggleSubMenu = id => {
    if (id === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(id);
    }
  };

  return (
    // <nav className={`${styles.menuContainer} ${menuClass}`}>
    <div className={`${styles.menuContainer} ${menuSlide} ${subMenuSlide}`}>
      <div className={styles.menu}>
        {menuTree.map(entry =>
          <MenuItem
            activeIndex={activeIndex}
            key={entry.id}
            setIsOpen={setIsOpen}
            id={entry.id}
            isOpen={isOpen}
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
    </div>
  );
};

const MenuItem = ({
  activeIndex,
  id,
  isOpen,
  setIsOpen,
  link,
  name,
  children,
  toggleSubMenu
}) => {
  const dropDownRef = useRef(null);
  const isActive = id !== activeIndex ? false : true;

  useEffect(
    () => {
      if (!isOpen && activeIndex !== null) {
        toggleSubMenu(id);
      }
    },
    [isOpen, activeIndex, toggleSubMenu, id]
  );

  const onTest = () => {
    console.log('test')
  }

  return (
    <nav ref={dropDownRef} className={styles.menuEntry}>
      {children
        ? <Button
            className="menuItemButton"
            onClick={() => {
              toggleSubMenu(id);
            }}
          >
            {`${name}`}
          </Button>
        : <Link href={`${link}`}>
            <a onClick={() => setIsOpen(null)}>
              {name}
            </a>
          </Link>}
      {children &&
        <div
          className={
            id !== activeIndex
              ? `${styles.subMenuContainer} ${styles.closed}`
              : `${styles.subMenuContainer} ${styles.open}`
          }
        >
          <nav>
            <h4>
              {name}
            </h4>
            {children.map(child =>
              <Link key={child.id} href={`${child.link}`}>
                <a onClick={() => setIsOpen(null)}>
                  {child.name}
                </a>
              </Link>
            )}
            <Button
              className="menuItemButton"
              onClick={() => {
                toggleSubMenu(id);
              }}
            >
              BACK
            </Button>
          </nav>
        </div>}
    </nav>
  );
};
