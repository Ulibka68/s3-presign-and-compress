<template>
  <div class="card">
    <h1>ImageList</h1>
  </div>

  <div v-if="!image">
    <h2>Выбери изображения</h2>
    <input type="file" multiple @change="onFileChange" accept="image/*" />
  </div>
  <div v-else>
    <div v-for="img in state.imgInfo" :key="img.key">
      <ImageRow :key="img.key" :file="img.file" :state="img.state" />
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
import {
  compressArray,
  getPreSignedUrlsObject,
  sendFileArray,
} from "@/utils/upload";
import ImageRow from "@/components/ImageRow.vue";
import { useImages } from "@/state/composition-state";

export default defineComponent({
  name: "ImageList",
  components: { ImageRow },
  setup() {
    const state = useImages();

    const blockInterface = ref(false);
    const image = computed<boolean>(() => state.imgInfo.length > 0);

    const onFileChange = (e: InputEvent) => {
      // eslint-disable-next-line
      const fl: FileList = (e.target as any).files;

      for (let i = 0; i < fl.length; i++) {
        state.methods.addNewImg(fl[i]);
      }
    };

    /*
    const uploadImages = async () => {
      console.log("--------- uploadImages --------");

      blockInterface.value = true;
      newNames = createUniqueFnames(fileList.value);
      await sendFileArray(fileList.value, newNames);
      blockInterface.value = false;

      /!*const result = await compressArray([
        "2021/4/29/61d-228-4aa-d0a.webp",
        "2021/4/29/046-1ba-b4f-364.png",
      ]);*!/
      const result = await compressArray(newNames);
      console.log(result);
    };*/

    return {
      state,
      onFileChange,
      image,
      // uploadImages,
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
