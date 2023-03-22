// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsonfile = require('jsonfile');
const file = './config/categories-config.json';

export const getCategoriesFS = async () => {
  // read from File the Categories
  const categories = await jsonfile
    .readFile(file)
    .then((obj) => {
      return obj.categories;
    })
    .catch((error) => console.error(error));
  return categories;
};

export const setCategoriesFS = async (updatedConfig) => {
  jsonfile.writeFileSync(file, updatedConfig);
};
