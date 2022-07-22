import { useEffect, useState } from "react";
import Hamburger from "hamburger-react";
import Link from "next/link";

import { useWindowSize, mobileSizes } from "../../hooks/mediaHook";
import { menuTree } from "../../generative/menuTree";

// import MenuItem from './menuItem'

import Menu from './menu'
import Logo from '../svg/logo'

import styles from "./header.module.scss";

const Header = () => {
  const [currentMenu, setCurrentMenu] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const showFullMenu = !mobileSizes.includes(useWindowSize());

  const headerClass = showFullMenu
    ? `${styles.headerLarge}`
    : `${styles.headerMobile}`;

  const scrollClass = scrolled && `${styles.scrolled}`;

  // scroll listener for header size change:
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${headerClass} ${scrollClass}`}>
      <div className={styles.headerWrapper}>
        <Link href="/">
          <a onClick={() => setCurrentMenu(null)} className={styles.homeLink}>
            <Logo className={styles.logo} />
          </a>
        </Link>
        {!showFullMenu &&
          <Hamburger
            toggled={isOpen}
            toggle={setIsOpen}
            color="rgba(11, 21, 26, 1)"
            size={28}
          />}
        <Menu
          currentMenu={currentMenu}
          isOpen={isOpen}
          menuTree={menuTree}
          scrolled={scrolled}
          setCurrentMenu={setCurrentMenu}
          setIsOpen={setIsOpen}
          showFullMenu={showFullMenu}
        />
      </div>
    </div>
  );
};

export default Header;

// const Menu = ({ isOpen, setIsOpen, menuTree, showFullMenu }) => {
//   const [menuToggle, setMenuToggle] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [width, setWidth] = useState(null);
//   const [position, setPosition] = useState(null);
//   const menuSlide = !isOpen ? `${styles.closed}` : `${styles.open}`;
//   const subMenuSlide = activeIndex !== null && `${styles.subMenuSlide}`;
//   const selectorClass = {
//     left: `${position}px`,
//     width: `${width}px`
//   };

//   // sub menu handler:
//   const toggleSubMenu = id => {
//     if (id === activeIndex) {
//       setActiveIndex(null);
//     } else {
//       setActiveIndex(id);
//     }
//   };

//   // console.log(selectorClass)

//   return (
//     <div className={`${styles.menuContainer} ${menuSlide} ${subMenuSlide}`}>
//       <div className={styles.menu}>
//         {menuTree.map(entry =>
//           <MenuItem
//             activeIndex={activeIndex}
//             key={entry.id}
//             setIsOpen={setIsOpen}
//             id={entry.id}
//             isOpen={isOpen}
//             link={entry.link}
//             name={entry.name}
//             menuToggle={menuToggle}
//             setActiveIndex={setActiveIndex}
//             setMenuToggle={setMenuToggle}
//             showFullMenu={showFullMenu}
//             toggleSubMenu={toggleSubMenu}
//             setWidth={setWidth}
//             setPosition={setPosition}
//           >
//             {entry.children}
//           </MenuItem>
//         )}
//         <div className={`${styles.selector}`} style={selectorClass} />
//       </div>
//     </div>
//   );
// };

// const MenuItem = ({
//   activeIndex,
//   id,
//   isOpen,
//   setIsOpen,
//   setActiveIndex,
//   link,
//   name,
//   children,
//   showFullMenu,
//   toggleSubMenu,
//   setWidth,
//   setPosition
// }) => {
//   const dropDownRef = useRef(null);
//   const isActive = id !== activeIndex ? false : true;

//   // todo: extract useEffects to custom hooks?:
//   // setting width/position for menu selector highlight:
//   useEffect(() => {
//     const el = dropDownRef.current;
//     const handleMouse = () => {
//       const rect = el.getBoundingClientRect();
//       setWidth(el.offsetWidth);
//       setPosition(rect.left);
//     };
//     el.addEventListener("mouseover", handleMouse);
//     return () => {
//       el.removeEventListener("mouseover", handleMouse);
//     };
//   });

//   // closes submenu on hamburger click (mobile only)
//   useEffect(
//     () => {
//       if (!showFullMenu && !isOpen && activeIndex !== null) {
//         toggleSubMenu(id);
//       }
//     },
//     [showFullMenu, isOpen, activeIndex, toggleSubMenu, id]
//   );

//   //  listener to close submenu on outside click:
//   useEffect(
//     () => {
//       const outsideMenu = e => {
//         if (
//           dropDownRef.current !== null &&
//           !dropDownRef.current.contains(e.target)
//         ) {
//           setActiveIndex(null);
//         }
//       };
//       if (isActive) {
//         window.addEventListener("click", outsideMenu);
//       }
//       return () => {
//         window.removeEventListener("click", outsideMenu);
//       };
//     },
//     [isActive, setActiveIndex]
//   );

//   return (
//     <nav ref={dropDownRef} className={styles.menuEntry}>
//       {children
//         ? <Button
//             className="menuItemButton"
//             onClick={() => {
//               toggleSubMenu(id);
//             }}
//           >
//             {`${name}`}
//           </Button>
//         : <Link href={`${link}`}>
//             <a onClick={() => setIsOpen(null)}>
//               {name}
//             </a>
//           </Link>}
//       {children &&
//         <div
//           className={
//             id !== activeIndex
//               ? `${styles.subMenuContainer} ${styles.closed}`
//               : `${styles.subMenuContainer} ${styles.open}`
//           }
//         >
//           <nav>
//             {children.map(child =>
//               <Link key={child.id} href={`${child.link}`}>
//                 <a onClick={() => setIsOpen(null)}>
//                   {child.name}
//                 </a>
//               </Link>
//             )}
//             {!showFullMenu &&
//               <Button
//                 className="menuItemButton"
//                 onClick={() => {
//                   toggleSubMenu(id);
//                 }}
//               >
//                 <BackArrow className={styles.backArrow} />
//               </Button>}
//           </nav>
//         </div>}
//     </nav>
//   );
// };
