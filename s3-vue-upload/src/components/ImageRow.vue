<template>
  <div class="flexCont">
    <Image :file="file" />
    <Loader class="loaderpos" v-show="state === 'Upload'" />
    <!--    <p>{{ state }}</p>
    <p>Key : {{ keyId }}</p>
    <p>Len : {{ file.size }}</p>-->
    <p v-show="state === 'Upload finished'" class="finalCheckBox">&#x2705;</p>
    <button
      @click="removeImage"
      class="btnRemove"
      :data-file-ind="keyId"
      :disabled="blockInterface"
      v-show="state === 'Start'"
    >
      X
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useImages, Tstate } from "@/state/composition-state";
import Image from "@/components/Image.vue";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  name: "ImageRow",
  // eslint-disable-next-line vue/no-unused-components
  components: { Loader, Image },
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
  /*border: 1px solid red;*/
  justify-content: flex-start;
}
.flexCont p {
  margin-left: 1rem;
}
.loaderpos {
  margin-left: 15px;
}
.finalCheckBox {
  font-size: 2rem;
}
</style>
