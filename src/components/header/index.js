import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import styles from "./header.module.scss";

import { menuTree } from "../../generative/menuTree";

const Header = props => {
  // const { menuTree } = props
  return (
    <div className={styles.header}>
      <p>Header</p>
      <Menu menuTree={menuTree} />
    </div>
  );
};

export default Header;

const Menu = props => {
  const { menuTree } = props;
  // const staticMenu =
  return (
    <nav>
      {menuTree.map(entry => {
        if (entry.children) {
          entry.children.map(child => {
            {
              /* return <MenuItem key={child.id} name={child.name}/>; */
            }
            return (
              <p key={child.id}>
                {child.name}
              </p>
            );
          });
        }
      })}
    </nav>
  );
};

const MenuItem = ({ isMobile, title, children, menuToggle, setMenuToggle }) => {
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
    <nav className={styles.menuItem}>
      
    </nav>
  );
};
