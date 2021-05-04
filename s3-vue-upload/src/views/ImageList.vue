<template>
  <div class="card">
    <h1>ImageList</h1>
  </div>

  <div v-if="!image">
    <h2>Выбери изображения</h2>
    <input type="file" multiple @change="onFileChange" accept="image/*" />
  </div>
  <div v-else>
    <div v-for="img in imgs" :key="img.key">
      <ImageRow :keyId="img.key" :file="img.file" :state="img.state" />
    </div>
    <div class="footerInfo">
      <p v-show="compressState === 'compressStart'">Изображения сжимаются</p>
      <p v-show="compressState === 'compressFinished'" class="msgFinal">
        Изображения загружены на сервер
      </p>
      <Loader v-show="compressState === 'compressStart'" />
    </div>
    <button
      class="btnSend"
      @click="uploadImages"
      :disabled="!image || blockInterface"
      v-show="compressState !== 'compressFinished'"
    >
      Передать изображения
    </button>
  </div>
  <div v-if="resultURLS">
    <h2>Выходные изображения</h2>
    <div v-for="(url1, ind) in resultURLS" :key="ind">
      <a :href="url1" target="_blank">{{ url1 }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import {
  compressArray,
  getPreSignedUrlsObject,
  sendFileArray,
} from "@/utils/upload";
import ImageRow from "@/components/ImageRow.vue";
import { useImages } from "@/state/composition-state";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  name: "ImageList",
  // eslint-disable-next-line vue/no-unused-components
  components: { Loader, ImageRow },
  setup() {
    const stateImgs = useImages();

    const blockInterface = ref(false);
    const image = computed<boolean>(() => stateImgs.state.imgInfo.length > 0);
    const resultURLS = ref(null);

    const onFileChange = (e: InputEvent) => {
      // eslint-disable-next-line
      const fl: FileList = (e.target as any).files;

      for (let i = 0; i < fl.length; i++) {
        stateImgs.methods.addNewImg(fl[i]);
      }
    };

    const uploadImages = async () => {
      console.log("--------- uploadImages --------");

      blockInterface.value = true;
      stateImgs.methods.cnangeAllState("Upload");
      await sendFileArray();

      /*const result = await compressArray([
        "2021/4/29/61d-228-4aa-d0a.webp",
        "2021/4/29/046-1ba-b4f-364.png",
      ]);*/
      const result = await compressArray();
      console.log(result);
      // eslint-disable-next-line
      const resURLs = [] as any;
      Object.keys(result).forEach((val) => {
        const curImg = result[val];
        resURLs.push(curImg.jpg350);
      });
      resultURLS.value = resURLs;
      console.log(resultURLS.value);
      stateImgs.state.compressState = "compressFinished";
    };

    return {
      imgs: computed(() => stateImgs.state.imgInfo),
      compressState: computed(() => stateImgs.state.compressState),
      onFileChange,
      image,
      uploadImages,
      blockInterface,
      resultURLS,
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
.btnSend {
  font-size: 1.5rem;
  margin-top: 0.5rem;
}
.footerInfo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.footerInfo p {
  padding: 0 1rem;
}
.msgFinal {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
