import Header from "../header";
import Footer from "../footer";

import styles from "./layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.bgImage}/>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
