// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsonfile = require('jsonfile');
const file = './common/utils/jobs-config.json';

export const getExtensionPeriod = async () => {
  // read from File the extension period
  const expiresAtDays = await jsonfile
    .readFile(file)
    .then((obj) => {
      console.log(obj);
      const expiresAtDays = 1000 * 60 * 60 * 24 * obj.days; // 1000ms * 60s * 60m * 24h * days
      return expiresAtDays;
    })
    .catch((error) => console.error(error));
  return expiresAtDays;
};

export const setExtensionPeriod = async (updatedConfig) => {
  jsonfile.writeFileSync(file, updatedConfig);
};
