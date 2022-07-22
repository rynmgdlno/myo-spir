import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";

import Button from "../button";

import BackArrow from "../svg/back";

import styles from "./header.module.scss";

const MenuItem = ({
  activeIndex,
  currentMenu,
  id,
  isOpen,
  setIsOpen,
  link,
  name,
  children,
  showFullMenu,
  toggleSubMenu,
  scrolled,
  setActiveIndex,
  setCurrentMenu,
  setHoverActive,
  setDefaultPosition,
  setDefaultWidth,
  setPosition,
  setWidth
}) => {
  const dropDownRef = useRef(null);
  const isActive = id !== activeIndex ? false : true;
  // todo: extract useEffects to custom hooks?:
  // setting width/position for menu selector highlight:
  // const el = dropDownRef.current;
  const handleMouse = useCallback(
    () => {
      const rect = dropDownRef.current.getBoundingClientRect();
      setWidth(dropDownRef.current.offsetWidth);
      setPosition(rect.left);
    },
    [dropDownRef, setPosition, setWidth]
  );

  useEffect(
    () => {
      if (currentMenu === id) {
        setDefaultPosition(dropDownRef.current.getBoundingClientRect().left);
        setDefaultWidth(dropDownRef.current.offsetWidth);
      }
    },
    [currentMenu, id, setDefaultPosition, setDefaultWidth]
  );

  useEffect(
    () => {
      const el = dropDownRef.current;
      el.addEventListener("mouseover", handleMouse);
      return () => {
        el.removeEventListener("mouseover", handleMouse);
      };
    },
    [dropDownRef, handleMouse, id]
  );

  // val selector highlight position on scroll:
  const val = 3.2;
  useEffect(
    () => {
      setPosition(prevState => (scrolled ? prevState - val : prevState + val));
      setDefaultPosition(
        prevState =>
          scrolled ? prevState - val : prevState + val
      );
    },
    [setPosition, setDefaultPosition, scrolled]
  );

  // closes submenu on hamburger click (mobile only)
  useEffect(
    () => {
      if (!showFullMenu && !isOpen && activeIndex !== null) {
        toggleSubMenu(id);
      }
    },
    [showFullMenu, isOpen, activeIndex, toggleSubMenu, id]
  );

  // listener to close submenu on outside click:
  useEffect(
    () => {
      const outsideMenu = e => {
        if (
          dropDownRef.current !== null &&
          !dropDownRef.current.contains(e.target)
        ) {
          setActiveIndex(null);
        }
      };
      if (isActive) {
        window.addEventListener("click", outsideMenu);
      }
      return () => {
        window.removeEventListener("click", outsideMenu);
      };
    },
    [isActive, setActiveIndex]
  );

  return (
    <nav
      ref={dropDownRef}
      className={styles.menuEntry}
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={() => setHoverActive(false)}
    >
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
            <a
              onClick={() => {
                setIsOpen(null);
                setCurrentMenu(id);
              }}
            >
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
                <a onClick={() => {
                  setIsOpen(null);
                  setCurrentMenu(id);
                  toggleSubMenu(id);
                }}>
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
