import Head from "next/head";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import {
  getOrderedCollection,
  getSlugEntry
} from "../../src/contentful";
import { renderOptions } from "../../src/contentful/richText";

import styles from "./blog.module.scss";

// Nextjs fetching/routing:
export const getStaticPaths = async () => {
  const posts = await getOrderedCollection("blogPost", "fields.date");
  const paths = posts.items.map(post => {
    return {
      params: { slug: post.fields.slug }
    };
  });
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async context => {
  const { slug } = context.params;
  const data = await getSlugEntry("blogPost", slug);
  return {
    props: {
      data
    }
  };
};

const Blog = props => {
  const data = props.data.items[0];
  const { bodyText, date, description, title } = data.fields;
  console.log(data)
  return (
    <div className={styles.page}>
      <Head>
        <title>{title}</title>
        <meta name="Blog Post" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h3>{title}</h3>
        {data && documentToReactComponents(bodyText, renderOptions)}
      </main>
    </div>
  );
};

export default Blog