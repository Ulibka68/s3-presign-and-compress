<template>
  <div class="flexCont">
    <Image :file="props.file" />
    <p>{{ props.state }}</p>
    <button
      @click="removeImage"
      class="btnRemove"
      :data-file-ind="props.key"
      :disabled="blockInterface"
    >
      X
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useImages, Tstate } from "@/state/composition-state";

export default defineComponent({
  name: "ImageRow",
  props: {
    file: File,
    key: Number,
    state: Tstate,
  },
  setup(props) {
    const state = useImages();
    const blockInterface = ref(false);

    const removeImage = (e: Event) => {
      // eslint-disable-next-line
      const key: number = (e.target as any).getAttribute("data-file-ind");
      state.methods.removeImgByKey(key);
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
</style>
