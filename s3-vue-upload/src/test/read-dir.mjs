import { readdir,readdirSync,writeFileSync } from "fs";
const testFolder = "./dist/js";
const testFolderCSS = "./dist/css";


function main2() {
  let resVal=' const smf_theme_url="../..";\n const smf_theme_url_scripts=smf_theme_url+"/dist"; \nconst moduleNames= {\n';
  let files=  readdirSync(testFolder);
  files.filter(value => (!value.endsWith('map'))).forEach((file) => {
    if (file.startsWith('app')){
      resVal = `${resVal}   APP:smf_theme_url_scripts+"/js/${file}",`;
    }
    else {
      resVal = `${resVal}\n   VENDOR:smf_theme_url_scripts+"/js/${file}",`;
    }
  });

  files=  readdirSync(testFolderCSS);
  resVal = `${resVal}\n   CSS:smf_theme_url_scripts+"/css/${files[0]}"`;
  resVal = resVal+'\n}';
  console.log(resVal);
  writeFileSync('./dist/module-names.js',resVal);

}
main2();
