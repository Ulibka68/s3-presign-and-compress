<template>
  <div class="flexCont">
    <Image :file="file" />
    <p>{{ state }}</p>
    <p>Key : {{ keyId }}</p>
    <button
      @click="removeImage"
      class="btnRemove"
      :data-file-ind="keyId"
      :disabled="blockInterface"
    >
      X
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useImages, Tstate } from "@/state/composition-state";
import Image from "@/components/Image.vue";

export default defineComponent({
  name: "ImageRow",
  // eslint-disable-next-line vue/no-unused-components
  components: { Image },
  props: {
    file: File,
    keyId: Number,
    state: String,
  },
  setup(props) {
    // console.log("ImageRow : ", props);
    // console.log(props.state);
    const stateImgs = useImages();
    const blockInterface = ref(false);

    const removeImage = (e: Event) => {
      // eslint-disable-next-line
      const key: string = (e.target as any).getAttribute("data-file-ind");
      stateImgs.methods.removeImgByKey(parseInt(key));
    };
    return {
      blockInterface,
      removeImage,
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
.flexCont p {
  margin-left: 1rem;
}
</style>
