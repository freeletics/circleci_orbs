const fetch = require('node-fetch');
const fs = require('fs');
const minimist = require('minimist');

const locales = {
  de: 'de',
  en: 'en',
  es: 'es',
  fr: 'fr',
  it: 'it',
  ja: 'ja',
  'pl-pl': 'pl',
  pt: 'pt',
  ru: 'ru',
  'tr-tr': 'tr',
};

const args = minimist(process.argv.slice(2));

const privacyDir = args['privacyDir'];
if (!privacyDir) {
  console.log("privacyDir was not passed as a parameter");
  return process.exit(1);
} else {
  console.log(`Output privacy dir: ${privacyDir}`);
}

if (!fs.existsSync(privacyDir)) {
  console.log(`${privacyDir} does not exist`);
  return process.exit(1);
}

var privacyFileTemplate = args['privacyFileTemplate'];
if (!privacyFileTemplate) {
  privacyFileTemplate = "privacy";
}

const inviteDir = args['inviteDir'];
if (!inviteDir) {
  console.log("inviteDir was not passed as a parameter");
  return process.exit(1);
} else {
  console.log(`Invite policy output dir: ${inviteDir}`);
}

if (!fs.existsSync(inviteDir)) {
  console.log(`${inviteDir} does not exist`);
  return process.exit(1);
}

var inviteFileTemplate = args['inviteFileTemplate'];
if (!inviteFileTemplate) {
  inviteFileTemplate = "referral_terms_and_conditions";
}

if (!process.env.CONTENTSTACK_ACCESS_TOKEN) {
  console.log("CONTENTSTACK_ACCESS_TOKEN environmental variable is not set.");
  return process.exit(1);
}

if (!process.env.CONTENTSTACK_API_KEY) {
  console.log("CONTENTSTACK_API_KEY environmental variable is not set.");
  return process.exit(1);
}

const styles = `<style>
html {
  font-family: 'AktivGrotesk', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  line-height: 1.25;
}

html:lang(ja) {
  font-family: -apple-system, BlinkMacSystembFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

a {
  color: #357df4
}

ul {
  margin-bottom: 32px;
  margin-left: 16px;
  padding: 0;
}

ul ul {
  margin: 4px 16px;
}

li {
  line-height: 1.25;
  list-style: disc;
  padding: 4px 0;
}

li li {
  list-style: circle;
}

code {
  white-space: pre;
}

th, td {
  border: 1px solid #696969;
  padding: 8px;
}

table {
  border-collapse: collapse;
  margin-bottom: 32px;
  width: 100%;
}

th {
  background-color: #c8c8c8;
}

table { page-break-inside:auto }
tr    { page-break-inside:avoid; page-break-after:auto }
thead { display:table-header-group }
tfoot { display:table-footer-group }
</style>
`;

const template = ({ heading, locale, paragraph }) => `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, minimum-scale=1">
<title>${heading}</title>
${styles}
</head>
<body>
<h1>${heading}</h1>
${paragraph}
</body>
</html>`;

const contentstackRequest = async ({ contentType, locale }) => {
  const url = `https://cdn.contentstack.io/v3/content_types/${contentType}/entries?environment=production&locale=${locale}`;
  const response = await fetch(url, {
    headers: {
      access_token: process.env.CONTENTSTACK_ACCESS_TOKEN,
      api_key: process.env.CONTENTSTACK_API_KEY,
    },
  });
  const json = await response.json();
  const content = json.entries[0];

  return content;
};

// Fetch and write Privacy Pages
const privacyPolicyPageRequests = Object.keys(locales).map((locale) =>
  contentstackRequest({ contentType: 'privacy_policy_page', locale }),
);

Promise.all(privacyPolicyPageRequests).then((contents) => {
  contents.forEach((content) => {
    const data = template({
      heading: content.data_protection_statement_section.heading,
      locale: locales[content.locale],
      paragraph: content.data_protection_statement_section.paragraph,
    });

    const filenameHtml = `${privacyDir}/${privacyFileTemplate}.${
      locales[content.locale]
    }.html`;

    fs.writeFileSync(filenameHtml, data);
    console.log('Saved!', filenameHtml);
  });
});

// Fetch and write Referrals Program Terms Pages
const referralsProgramTermsPageRequests = Object.keys(locales).map((locale) =>
  contentstackRequest({ contentType: 'referrals_program_terms_page', locale }),
);

Promise.all(referralsProgramTermsPageRequests).then((contents) => {
  contents.forEach((content) => {
    const data = template({
      heading: content.terms_and_conditions_section.heading,
      locale: locales[content.locale],
      paragraph: content.terms_and_conditions_section.paragraph,
    });

    const filenameHtml = `${inviteDir}/${inviteFileTemplate}.${
      locales[content.locale]
    }.html`;

    fs.writeFileSync(filenameHtml, data);
    console.log('Saved!', filenameHtml);
  });
});
