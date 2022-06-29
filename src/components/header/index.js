import React from 'react'

import styles from './header.module.scss'

const Header = props => {
  const { menuTree } = props

  return (
    <div className={styles.header}>
      <p>Header</p>
      <Menu menuTree={menuTree}/>
    </div>
  );
};

export default Header

const Menu = (props) => {
  const { menuTree } = props
  // const staticMenu = 
  return (
    <nav>
    {menuTree.filter((entry) => entry.fields.showInMenu).map((entry) => {
      return <button key={entry.fields.id}>{entry.fields.title}</button>
    })}
    </nav>
  )
}