<template>
  <div v-if="!image">
    <h2>Выбери изображения</h2>
    <input type="file" multiple @change="onFileChange" accept="image/*" />
  </div>
  <div v-else>
    <div v-for="img in imgs" :key="img.key">
      <ImageRow
        :keyId="img.key"
        :file="img.file"
        :state="img.state"
        :currentProgress="img.progress"
      />
    </div>

    <div class="footerInfo">
      <p v-show="compressState === 'compressStart'">Изображения сжимаются</p>
      <p v-show="compressState === 'compressFinished'" class="msgFinal">
        Изображения загружены на сервер
      </p>
      <Loader v-show="compressState === 'compressStart'" />
      <button
        class="btnSend"
        @click="uploadImages"
        :disabled="!image || blockInterface"
        v-show="compressState === 'noCompress'"
      >
        Передать изображения
      </button>
    </div>
  </div>

<!--Отображение результата загрузки -->
<!--  <div v-if="resultURLS.length > 0">
    <h2>Изображения загруженные на сервер:</h2>
    <div v-for="(url1, ind) in resultURLS" :key="ind">
      <a :href="url1" target="_blank">
        <img :src="url1" alt="" />
      </a>
    </div>
  </div>-->

</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { compressArray, sendFileArray } from "@/utils/upload";
import ImageRow from "@/components/ImageRow.vue";
import { useImages } from "@/state/composition-state";
import Loader from "@/components/Loader.vue";
import * as Sentry from "@sentry/browser";
import { Severity } from "@sentry/browser";

export default defineComponent({
  name: "ImageList",
  // eslint-disable-next-line vue/no-unused-components
  components: { Loader, ImageRow },
  setup() {
    const stateImgs = useImages();
    // eslint-disable-next-line
    (window as any).smf_VUE_image_upload_state = stateImgs;

    const blockInterface = ref(false);
    const image = computed<boolean>(() => stateImgs.state.imgInfo.length > 0);

    const onFileChange = (e: InputEvent) => {
      // eslint-disable-next-line
      const fl: FileList = (e.target as any).files;

      for (let i = 0; i < fl.length; i++) {
        stateImgs.methods.addNewImg(fl[i]);
        console.log("onFileChange ", fl[i].name);
      }
    };

    const uploadImages = async () => {
      console.log("--------- uploadImages --------");

      blockInterface.value = true;
      stateImgs.methods.cnangeAllState("Upload");
      const logMsg = await sendFileArray();

      /*
       * данные о системе
       * */
      const sysMsg = `System data ==================\n
pixelDepth : ${window.screen.pixelDepth}, height : ${window.screen.height}, width : ${window.screen.width}`;
      console.log(sysMsg);
      /*
      const elem = document.getElementById("fullWidth");
      const elem2 = window.getComputedStyle(elem!);
      console.log("elem2.width ", elem2.width);
*/

      Sentry.captureMessage(logMsg, Severity.Info);

      /*const result = await compressArray([
        "2021/4/29/61d-228-4aa-d0a.webp",
        "2021/4/29/046-1ba-b4f-364.png",
      ]);*/
      stateImgs.state.resultURLs = await compressArray();
      // console.log(stateImgs.state.resultURLs);
      stateImgs.state.compressState = "compressFinished";
    };

    return {
      imgs: computed(() => stateImgs.state.imgInfo),
      compressState: computed(() => stateImgs.state.compressState),
      onFileChange,
      image,
      uploadImages,
      blockInterface,
      resultURLS: computed(() => stateImgs.methods.form350output()),
    };
  },
});
</script>

<style scoped>
.btnRemove {
  margin-left: 1rem;
  font-size: 2rem;
  padding: 1px 6px;
  border-style: solid;
  border-width: 2px;
  border-color: aqua;
  text-indent: 0px;
  display: block;
  /*text-align: center;*/
}
.flexCont {
  display: inline-flex;
  /*align-content: center;*/
  align-items: center;
  height: 85px;
  /*border: 1px solid red;*/
  justify-content: flex-start;
}
.footerInfo {
  display: flex;
  justify-content: flex-start;
}
.btnSend {
  font-size: 1.5rem;
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  background-color: #fde4bb;
  border-radius: 5px;
  box-shadow: 12px 12px 16px 0 rgba(255 255 255 0.3) inset,
    -8px -8px 12px 0 rgba(0 0 0 0.25) inset;
}

/*Animate the size, outside*/
.btnSend:hover,
.btnSend:focus {
  animation: pulse 1s;
  box-shadow: 0 0 0 0.5em rgba(255, 255, 255, 0);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 #ef8f6e;
  }
}

.footerInfo p {
  padding: 0 1rem;
}
.msgFinal {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
