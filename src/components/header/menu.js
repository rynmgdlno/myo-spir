import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MenuItem from "./menuItem";

import styles from "./header.module.scss";

const Menu = ({
  isOpen,
  setIsOpen,
  menuTree,
  showFullMenu,
  scrolled,
  currentMenu,
  setCurrentMenu
}) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverActive, setHoverActive] = useState(false);
  const [defaultPosition, setDefaultPosition] = useState(null);
  const [defaultWidth, setDefaultWidth] = useState(null);
  const [menuToggle, setMenuToggle] = useState(null);
  const [position, setPosition] = useState(null);
  const [width, setWidth] = useState(null);
  const menuSlide = !isOpen ? `${styles.closed}` : `${styles.open}`;

  const selectorClass =
    currentMenu === null & !hoverActive 
      ? {
          left: `${position}`,
          width: `${width}px`,
          opacity: 0,
        }
      : activeIndex !== null || hoverActive
        ? {
            left: `${position}px`,
            width: `${width}px`,
            opacity: 1
          }
        : {
            left: `${defaultPosition}px`,
            width: `${defaultWidth}px`,
            opacity: 0.4,
          };

  const subMenuSlide = activeIndex !== null && `${styles.subMenuSlide}`;

  // sub menu handler:
  const toggleSubMenu = id => {
    if (id === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(id);
    }
  };

  return (
    <div className={`${styles.menuContainer} ${menuSlide} ${subMenuSlide}`}>
      <div className={styles.menu}>
        {menuTree.map(entry =>
          <MenuItem
            activeIndex={activeIndex}
            currentMenu={currentMenu}
            setCurrentMenu={setCurrentMenu}
            key={entry.id}
            setIsOpen={setIsOpen}
            id={entry.id}
            isOpen={isOpen}
            link={entry.link}
            name={entry.name}
            menuToggle={menuToggle}
            setActiveIndex={setActiveIndex}
            setMenuToggle={setMenuToggle}
            showFullMenu={showFullMenu}
            toggleSubMenu={toggleSubMenu}
            setWidth={setWidth}
            setPosition={setPosition}
            scrolled={scrolled}
            setHoverActive={setHoverActive}
            setDefaultPosition={setDefaultPosition}
            setDefaultWidth={setDefaultWidth}
          >
            {entry.children}
          </MenuItem>
        )}
      </div>
      {showFullMenu && <div className={`${styles.selector}`} style={selectorClass} />}
    </div>
  );
};

export default Menu;
