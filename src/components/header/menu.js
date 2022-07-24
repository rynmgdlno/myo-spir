import { useCallback, useState } from "react";

import { useScroll } from "../../hooks/useScroll";
import { menuTree } from "../../generative/menuTree";

import MenuItem from "./menuItem";

import styles from "./header.module.scss";

const Menu = ({ menuState, handleMenu, showFullMenu }) => {
  const isScrolled = useScroll(25);
  const [highlightState, setHighlightState] = useState({
    activeSubMenu: null,
    defPosition: null,
    defWidth: null,
    hoverActive: null,
    position: null,
    width: null
  });

  const {
    activeSubMenu,
    defPosition,
    defWidth,
    hoverActive,
    position,
    width
  } = highlightState;

  const { currentPage, isOpen } = menuState;
  const menuSlide = !isOpen ? `${styles.closed}` : `${styles.open}`;
  const newDefPosition = !isScrolled ? defPosition : defPosition - 25;
  const subMenuSlide = activeSubMenu !== null && `${styles.subMenuSlide}`;
  const selectorClass =
    // on homepage and not hovering:
    (currentPage === null) & !hoverActive
      ? {
          left: `${position}`,
          width: `${width}px`,
          opacity: 0
        }
      : // submenu open || hovering:
        activeSubMenu !== null || hoverActive
        ? {
            left: `${position}px`,
            width: `${width}px`,
            opacity: 1
          }
        : // not on homepage and not hovering:
          {
            left: `${newDefPosition}px`,
            width: `${defWidth}px`,
            opacity: 0.4
          };

  // state setter:
  const handleHighlight = useCallback((state, val) => {
    setHighlightState(prevState => ({
      ...prevState,
      [state]: val
    }));
  }, []);

  // sub menu handler:
  const toggleSubMenu = id => {
    if (id === activeSubMenu) {
      // if clicked on the button for the currently open menu,
      // close the menu
      handleHighlight("activeSubMenu", null);
      // else open the designated menu
    } else {
      handleHighlight("activeSubMenu", id);
    }
  };

  return (
    <div className={`${styles.menuContainer} ${menuSlide} ${subMenuSlide}`}>
      <div className={styles.menu}>
        {menuTree.map(entry =>
          <MenuItem
            entry={entry}
            handleHighlight={handleHighlight}
            handleMenu={handleMenu}
            highlightState={highlightState}
            isOpen={isOpen}
            key={entry.id}
            menuState={menuState}
            showFullMenu={showFullMenu}
            toggleSubMenu={toggleSubMenu}
          />
        )}
      </div>
      {showFullMenu &&
        <div className={`${styles.selector}`} style={selectorClass} />}
    </div>
  );
};

export default Menu;
