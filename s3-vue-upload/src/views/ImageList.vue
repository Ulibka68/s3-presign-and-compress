<template>
  <div class="card">
    <h1>ImageList</h1>
  </div>

  <div v-if="!image">
    <h2>Выбери изображения</h2>
    <input type="file" multiple @change="onFileChange" accept="image/*" />
  </div>
  <div v-else>
    <div v-for="(file1, ind) in fileList" :key="file1.name">
      <div class="flexCont">
        <Image :file="file1" />
        <button @click="removeImage" class="btnRemove" :data-file-ind="ind">
          X
        </button>
      </div>
    </div>
    <button class="btnSend" @click="uploadImages" :disabled="!image">
      Передать изображения
    </button>
  </div>
  <!--  <h2 v-if="uploadURL">Success! Image uploaded to bucket.</h2>-->
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Image from "@/components/Image.vue";
import { sendFile } from "@/utils/upload";

export default defineComponent({
  name: "ImageList",
  components: { Image },
  setup() {
    const fileList = ref<Array<File>>([] as Array<File>);
    const image = computed<boolean>(() => fileList.value.length > 0);

    const onFileChange = (e: InputEvent) => {
      // fileList.value = (e.target as any).files;
      // eslint-disable-next-line
      const fl: FileList = (e.target as any).files;
      const l = fl.length;
      const arrTmp = [];

      for (let i = 0; i < l; i++) {
        arrTmp.push(fl[i]);
      }
      fileList.value = arrTmp;
    };
    const removeImage = (e: Event) => {
      // eslint-disable-next-line
      const ind: number = (e.target as any).getAttribute("data-file-ind");
      fileList.value.splice(ind, 1);
    };
    const uploadImages = () => {
      sendFile(fileList.value[0]);
    };

    return { fileList, onFileChange, image, removeImage, uploadImages };
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
