import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import Hamburger from "hamburger-react";

import { useWindowSize, mobileSizes } from "../../hooks/mediaHook";
import Button from "../button";
import { menuTree } from "../../generative/menuTree";

import Twitter from "../svg/twitter";

import styles from "./header.module.scss";
// import menuTransition from './CSSTransitions.module.scss'

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);
  const device = useWindowSize();
  const showFullMenu = !mobileSizes.includes(device) ? true : false;
  const headerClass = showFullMenu
    ? `${styles.headerLarge}`
    : `${styles.headerMobile}`;

  return (
    <div className={headerClass}>
      <div className={styles.headerWrapper}>
        <Link href="/">
          <a>
            <Twitter className={styles.logo} />
          </a>
        </Link>
            <h1 className={styles.title}>Myo-Spir</h1>
        {!showFullMenu &&
          <Hamburger
            toggled={isOpen}
            toggle={setIsOpen}
            color="#000"
            size={24}
          />}
        <Menu menuTree={menuTree} isOpen={isOpen} setIsOpen={setIsOpen} showFullMenu={showFullMenu}/>
      </div>
    </div>
  );
};

export default Header;

const Menu = ({ isOpen, setIsOpen, menuTree, showFullMenu }) => {
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
            showFullMenu={showFullMenu}
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
  showFullMenu,
  toggleSubMenu
}) => {
  const dropDownRef = useRef(null);
  const isActive = id !== activeIndex ? false : true;

  // closes submenu on hamburger click (mobile only)
  useEffect(
    () => {
      if (!showFullMenu && !isOpen && activeIndex !== null) {
        toggleSubMenu(id);
      }
    },
    [showFullMenu, isOpen, activeIndex, toggleSubMenu, id]
  );

  return (
    <nav ref={dropDownRef} className={styles.menuEntry}>
      {children
        ? <Button
            className="menuItemButton"
            onClick={() => {
              toggleSubMenu(id);
              console.log(id)
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
            {children.map(child =>
              <Link key={child.id} href={`${child.link}`}>
                <a onClick={() => setIsOpen(null)}>
                  {child.name}
                </a>
              </Link>
            )}
            {!showFullMenu && <Button
              className="menuItemButton"
              onClick={() => {
                toggleSubMenu(id);
              }}
            >
              BACK
            </Button>}
          </nav>
        </div>}
    </nav>
  );
};
