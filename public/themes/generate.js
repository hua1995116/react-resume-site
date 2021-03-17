const fs = require('fs');
const path = require('path');

const fileList = fs.readdirSync(path.join(__dirname, './'));

const contentJSON = fileList.filter(item => item.indexOf('.css') > -1).reduce((json, item) => {
  const itemPath = path.join(__dirname, item);
  const name = path.basename(item, '.css');
  console.log(json, name, itemPath);
  json[name] = fs.readFileSync(itemPath).toString();
  return json;
}, {})

fs.writeFileSync(path.join(__dirname, 'theme.js'), `module.exports = ${JSON.stringify(contentJSON)}`);
