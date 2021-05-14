const smf_theme_url = "../..";
const smf_theme_url_scripts = smf_theme_url + "/dist";
const moduleNames = {
  APP: smf_theme_url_scripts + "/js/app.fd8a98d1.js",
  VENDOR: smf_theme_url_scripts + "/js/chunk-vendors.c2d9ee6a.js",
  CSS: smf_theme_url_scripts + "/css/app.8da9cf3a.css",
};

let firstInit = true;
// глобальная переменная
var smf_VUE_image_upload_state;

function returnResult() {
  console.log("---------- Получен результат ------------");
  console.log(smf_VUE_image_upload_state.state.resultURLs);
}

function waitSMF() {
  let countWait = 0;
  const idTime = setInterval(() => {
    if (smf_VUE_image_upload_state) {
      smf_VUE_image_upload_state.state.callBackFunc = returnResult;
      smf_VUE_image_upload_state.state.showPopup = true;
      clearInterval(idTime);
    }
    console.log("countWait ", countWait);
    if (++countWait > 5000 / 10) {
      clearInterval(idTime);
      console.error("Ошибка загрузки");
    }
  }, 10);
}

function startVue() {
  if (firstInit) {
    let lnk = document.createElement("link");
    lnk.rel = "stylesheet";
    lnk.href = moduleNames.CSS;
    document.head.appendChild(lnk);

    lnk = document.createElement("script");
    lnk.src = moduleNames.VENDOR;
    document.body.appendChild(lnk);

    lnk = document.createElement("script");
    lnk.src = moduleNames.APP;
    document.body.appendChild(lnk);
    lnk.onload = () => {
      // smf_VUE_image_upload_state.methods.resetState();
      // smf_VUE_image_upload_state.state.showPopup = true;
      waitSMF();
    };

    document.getElementById("popup-container-background").style.display =
      "block";
    firstInit = false;
  } else {
    smf_VUE_image_upload_state.methods.resetState();
    smf_VUE_image_upload_state.state.showPopup = true;
  }
}
