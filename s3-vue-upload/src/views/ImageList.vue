<template>
  <div class="card">
    <h1>ImageList</h1>
  </div>

  <div v-if="!image">
    <h2>Выбери изображения</h2>
    <input type="file" multiple @change="onFileChange" accept="image/*" />
  </div>
  <div v-else>
    <div v-for="img in imagesInfo" :key="img.id">
      <div class="flexCont">
        <Image :file="img.file" />
        <button
          @click="removeImage"
          class="btnRemove"
          :data-file-ind="img.id"
          :disabled="blockInterface"
        >
          X
        </button>
      </div>
    </div>
    <button
      class="btnSend"
      @click="uploadImages"
      :disabled="!image || blockInterface"
    >
      Передать изображения
    </button>
  </div>
  <!--  <h2 v-if="uploadURL">Success! Image uploaded to bucket.</h2>-->
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Image from "@/components/Image.vue";
import {
  compressArray,
  getPreSignedUrlsObject,
  sendFileArray,
} from "@/utils/upload";
import { createUniqueFnames } from "@/utils/uid-filenames";
import { useStore, Store, State } from "@/store";

export default defineComponent({
  name: "ImageList",
  components: { Image },
  setup() {
    const store = useStore();
    const imagesInfo = computed(() => store.getters.imageInfoGet);

    const blockInterface = ref(false);
    const image = computed<boolean>(() => imagesInfo.value.length > 0);

    const onFileChange = (e: InputEvent) => {
      // eslint-disable-next-line
      const fl: FileList = (e.target as any).files;
      const l = fl.length;

      for (let i = 0; i < l; i++) {
        store.commit("addNewFile", fl[i]);
      }
    };

    const removeImage = (e: Event) => {
      // eslint-disable-next-line
      const ind: number = (e.target as any).getAttribute("data-file-ind");
      store.commit("removeFile", ind);
    };

    const uploadImages = async () => {
      console.log("--------- uploadImages --------");

      blockInterface.value = true;

      await sendFileArray(fileList.value, newNames);
      blockInterface.value = false;

      /*const result = await compressArray([
        "2021/4/29/61d-228-4aa-d0a.webp",
        "2021/4/29/046-1ba-b4f-364.png",
      ]);*/
      const result = await compressArray(newNames);
      console.log(result);
    };

    return {
      imagesInfo,
      onFileChange,
      image,
      removeImage,
      uploadImages,
      blockInterface,
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
  border: 1px solid red;
  justify-content: flex-start;
}
.btnSend {
  font-size: 1.5rem;
  margin-top: 0.5rem;
}
</style>
