import Head from "next/head";
import Link from "next/link";

import { getOrderedCollection } from "../../src/contentful";

import styles from "./blog.module.scss";

export const getStaticProps = async context => {
  const posts = await getOrderedCollection("blogPost", "fields.date");
  return {
    props: {
      posts: posts.items
    }
  };
};

const Blog = props => {
  const { posts } = props;
  console.log(posts);
  return (
    <div className={styles.page}>
      <Head>
        <title>Blog</title>
        <meta name="Blog" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {posts.map(post =>
          <div key={post.sys.id}>
            <Link href={`/blog/${post.fields.slug}`}>
              <a>
                {post.fields.title}
              </a>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Blog;
