import Layout from "../src/components/layout";

import "../styles/button.scss";
import "../styles/formInput.scss";
import "../styles/globals.css";
import "../styles/variables.css";

function MyApp({ Component, pageProps }) {
  
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
