import Head from "next/head";
import Image from "next/image";
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
  return (
    <div className={styles.page}>
      <Head>
        <title>Blog</title>
        <meta name="Blog" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className={styles.blogTitle}>Blog</h1>
        <h3>Stay up to date.</h3>
        <div className={styles.posts}>
          {posts.map(post => <BlogCard key={post.id} data={post} />)}
        </div>
      </main>
    </div>
  );
};

export default Blog;

const BlogCard = ({ data, key }) => {
  const {
    date,
    description,
    image: {
      fields: {
        description: imageDescription,
        file: { details: { image: { width, height } }, url: imageUrl }
      }
    },
    slug,
    title
  } = data.fields;
  return (
    <article className={styles.blogCard}>
      <Link key={key} href={`/blog/${slug}`}>
        <a>
          <div>
            <Image
              src={`https:${imageUrl}`}
              alt={imageDescription}
              layout="responsive"
              width={width}
              height={height}
            />
          </div>
          <div>
            <p>
              {date}
            </p>
            <h3>
              {title}
            </h3>
            <p>
              {description}
            </p>
          </div>
        </a>
      </Link>
    </article>
  );
};
