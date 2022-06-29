// env variables
const space = process.env.NEXT_PUBLIC_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CD_ACCESS_TOKEN;

// creating the client
export const client = require("contentful").createClient({
  space: space,
  accessToken: accessToken
});

// retrieving content:
// explicit order by (i.e. for pages with the order by integer, or blogs by date)
export const getOrderedCollection = async (collectionType, orderBy) => {
  const collection = await client.getEntries({
    content_type: `${collectionType}`,
    order: `${orderBy}`
  });
  return collection;
};

// unordered collection:
export const getCollection = async collectionType => {
  const collection = await client.getEntries({
    content_type: `${collectionType}`
  });
  return collection;
};

// single entry by id:
export const getSingleEntry = async entryId => {
  const entry = await client.getEntry(entryId);
  return entry;
};
