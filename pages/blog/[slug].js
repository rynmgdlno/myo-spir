import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { getOrderedCollection, getSlugEntry } from "../../src/contentful";
import { renderOptions } from "../../src/contentful/richText";

import Facebook from "../../src/components/svg/facebook";
import Instagram from "../../src/components/svg/instagram";
import LinkedIn from "../../src/components/svg/linkedin";
import Twitter from "../../src/components/svg/twitter";

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
  const { bodyText, date, description, image, slug, title } = data.fields;
  const mainImage = {
    title: image.fields.title,
    alt: image.fields.description,
    url: `https:${image.fields.file.url}`,
    width: image.fields.file.details.image.width,
    height: image.fields.file.details.image.height
  };
  const shareLink = `https://myo-spir.com/${slug}`;
  const testLink = `https://ilysiavr.com/careers`;
  return (
    <div className={styles.page}>
      <Head>
        <title>
          {title}
        </title>
        <meta name="Blog Post" content="" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:title"
          content={title}
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:type"
          content="website"
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:url"
          content={`https://www.myo-spir.com/blog/${slug}`}
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:image"
          content={mainImage.url}
        />
      </Head>
      <main>
        <section>
          <div className={styles.image}>
            <Image
              src={mainImage.url}
              height={mainImage.height}
              width={mainImage.width}
              alt={mainImage.alt}
              layout="responsive"
            />
          </div>
          <div className={styles.content}>
            <div className={styles.share}>
              <p>Share</p>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareLink}&text=${title}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className={styles.shareIcon} />
              </a>
              <a
                href={`https://www.facebook.com/sharer.php?u=${shareLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className={styles.shareIcon} />
              </a>
              <a
                href={`http://www.linkedin.com/shareArticle?mini=true&url=${shareLink}&title=${title}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedIn className={styles.shareIcon} />
              </a>
            </div>
            <div>
              <p>
                {date}
              </p>
              <h1>
                {title}
              </h1>
              <h2>
                {description}
              </h2>
              {data && documentToReactComponents(bodyText, renderOptions)}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
