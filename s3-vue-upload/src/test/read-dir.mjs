import { readdir,readdirSync,writeFileSync } from "fs";
const testFolder = "./dist/js";
const testFolderCSS = "./dist/css";


function main2() {
  let resVal=' const moduleNames= {\n';
  let files=  readdirSync(testFolder);
  files.filter(value => (!value.endsWith('map'))).forEach((file) => {
    if (file.startsWith('app')){
      resVal = `${resVal}   APP:"../../dist/js/${file}",`;
    }
    else {
      resVal = `${resVal}\n   VENDOR:"../../dist/js/${file}",`;
    }
  });

  files=  readdirSync(testFolderCSS);
  resVal = `${resVal}\n   CSS:"../../dist/css/${files[0]}"`;
  resVal = resVal+'\n}';
  console.log(resVal);
  writeFileSync('./dist/module-names.js',resVal);

}
main2();
