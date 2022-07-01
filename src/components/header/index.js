import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { CSSTransition } from "react-transition-group";
import Hamburger from "hamburger-react";

import Button from "../button";

import styles from "./header.module.scss";

import { menuTree } from "../../generative/menuTree";

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);
  // const { menuTree } = props
  return (
    <div className={styles.header}>
      <p>Header</p>
      <Hamburger toggled={isOpen} toggle={setIsOpen} color="#000" size={24} />
      <Menu menuTree={menuTree} isOpen={isOpen}/>
    </div>
  );
};

export default Header;

const Menu = ({ isOpen, menuTree }) => {
  const [menuToggle, setMenuToggle] = useState(null);

  const menuClass = isOpen ? `${styles.open}` : `${styles.closed}`;
  console.log(menuClass)
  return (
    <nav className={`${styles.menu} ${menuClass}`}>
      {menuTree.map(entry =>
        <MenuItem
          key={entry.id}
          name={entry.name}
          menuToggle={menuToggle}
          setMenuToggle={setMenuToggle}
        >
          {entry.children}
        </MenuItem>
      )}
    </nav>
  );
};

const MenuItem = ({ isMobile, name, children, menuToggle, setMenuToggle }) => {
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(
    () => {
      const pageClick = e => {
        if (
          dropDownRef.current !== null &&
          !dropDownRef.current.contains(e.target)
        ) {
          setIsOpen(false);
        }
        if (isOpen) {
          window.addEventListener("click", pageClick);
        }
      };
      return () => {
        window.removeEventListener("click", pageClick);
      };
    },
    [isOpen, setIsOpen]
  );

  return (
    <nav ref={dropDownRef}>
      <Button>
        {name}
      </Button>
      {children &&
        <nav className={styles.subMenu}>
          {children.map(child =>
            <Button key={child.id}>
              {child.name}
            </Button>
          )}
        </nav>}
    </nav>
  );
};
