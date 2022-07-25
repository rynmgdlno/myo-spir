import Head from "next/head";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { getCollection, getSlugEntry } from "../src/contentful/index.js";
import { renderOptions } from "../src/contentful/richText";

import { Forms } from "../src/components/forms";

import styles from "./page.module.scss";

// Generating routes on build from Contentful "page" entries
// using "slug" as URL:
export const getStaticPaths = async () => {
  const pages = await getCollection("page");
  const paths = pages.items.map(page => {
    return {
      params: { page: page.fields.slug }
    };
  });
  return {
    paths,
    fallback: false
  };
};

// Getting page content per route based on slug:
export const getStaticProps = async context => {
  const { page } = context.params;
  const data = await getSlugEntry("page", page);
  return {
    props: {
      data
    }
  };
};

const Page = props => {
  const { AppointmentForm, ContactForm } = Forms;
  const data = props.data.items[0];
  const { pageMainImage, title, pageMainBodyText } = data.fields;
  const mainImage = pageMainImage
    ? {
        title: pageMainImage.fields.title,
        alt: pageMainImage.fields.description,
        url: `https:${pageMainImage.fields.file.url}`,
        width: pageMainImage.fields.file.details.image.width,
        height: pageMainImage.fields.file.details.image.height
      }
    : null;

  return (
    <div className={styles.page}>
      <Head>
        <title>
          {title}
        </title>
        <meta name="Page" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {pageMainImage &&
          <div className={styles.mainImage}>
            <Image
              src={mainImage.url}
              height={mainImage.height}
              width={mainImage.width}
              alt={mainImage.alt}
              layout="responsive"
            />
          </div>}
        <section>
          {data && documentToReactComponents(pageMainBodyText, renderOptions)}
          {title.toLowerCase() === "contact" && <ContactForm 
            message={`hello`}
            formType="CONTACT FORM"
          />}
          {title.toLowerCase() === "referrals" && <ContactForm 
            message={`referrals`}
            formType={"REFERRAL"}
          />}
          {title.toLowerCase() === "book an appointment" && <AppointmentForm />}
        </section>
      </main>
    </div>
  );
};

export default Page;
