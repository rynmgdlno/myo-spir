import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";

import Button from "../button";
import BackArrow from "../svg/back";

import styles from "./header.module.scss";

const MenuItem = ({
  entry,
  handleHighlight,
  handleMenu,
  highlightState,
  menuState,
  showFullMenu,
  toggleSubMenu
}) => {
  const dropDownRef = useRef(null);
  const { id, name, link, subMenu } = entry;
  const { activeSubMenu } = highlightState;
  const { currentPage, isOpen } = menuState;

  // setting menu selector highlight coordinates:
  const el = dropDownRef.current;
  const handleMouse = useCallback(
    () => {
      const rect = el.getBoundingClientRect();
      handleHighlight("width", el.offsetWidth);
      handleHighlight("position", rect.left);
    },
    [el, handleHighlight]
  );
  
  // setting coords on hover
  useEffect(
    () => {
      const el = dropDownRef.current;
      el.addEventListener("mouseover", handleMouse);
      return () => {
        el.removeEventListener("mouseover", handleMouse);
      };
    },
    [dropDownRef, handleMouse, id, el]
  );

  // setting "default" coords to stick highlight to current page's button
  useEffect(
    () => {
      if (currentPage === id) {
        handleHighlight("defPosition", el.getBoundingClientRect().left);
        handleHighlight("defWidth", el.offsetWidth);
      }
    },
    [currentPage, id, handleHighlight, el]
  );

  // closes submenu on hamburger click (mobile only)
  useEffect(
    () => {
      if (!showFullMenu && !isOpen && activeSubMenu !== null) {
        toggleSubMenu(id);
      }
    },
    [showFullMenu, isOpen, activeSubMenu, toggleSubMenu, id]
  );

  // closes submenu on outside click:
  useEffect(
    () => {
      const outsideMenu = e => {
        if (
          dropDownRef.current !== null &&
          !dropDownRef.current.contains(e.target)
        ) {
          handleHighlight("activeSubMenu", null);
        }
      };
      if (id === activeSubMenu) {
        window.addEventListener("click", outsideMenu);
      }
      return () => {
        window.removeEventListener("click", outsideMenu);
      };
    },
    [activeSubMenu, id, handleHighlight]
  );

  return (
    <nav
      ref={dropDownRef}
      className={styles.menuEntry}
      onMouseEnter={() => handleHighlight("hoverActive", true)}
      onMouseLeave={() => handleHighlight("hoverActive", false)}
    >
      {subMenu !== null 
        ? <Button
            className="menuItemButton"
            onClick={() => {
              toggleSubMenu(id);
            }}
          >
            {`${name}`}
          </Button>
        : <Link href={`${link}`}>
            <a
              onClick={() => {
                handleMenu("isOpen", null);
                handleMenu("currentPage", id);
              }}
            >
              {name}
            </a>
          </Link>}
      {subMenu &&
        <div
          className={
            id !== activeSubMenu
              ? `${styles.subMenuContainer} ${styles.closed}`
              : `${styles.subMenuContainer} ${styles.open}`
          }
        >
          <nav>
            {subMenu.map(child =>
              <Link key={child.id} href={`${child.link}`}>
                <a
                  onClick={() => {
                    handleMenu("isOpen", null);
                    handleMenu("currentPage", id);
                    toggleSubMenu(id);
                  }}
                >
                  {child.name}
                </a>
              </Link>
            )}
            {!showFullMenu &&
              <Button
                className="menuItemButton"
                onClick={() => {
                  toggleSubMenu(id);
                }}
              >
                <BackArrow className={styles.backArrow} />
              </Button>}
          </nav>
        </div>}
    </nav>
  );
};

export default MenuItem;
