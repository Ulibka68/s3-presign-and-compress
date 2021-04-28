<template>
  <img :src="url" :onload="imgOnload" />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Image",
  props: {
    file: File,
  },
  setup(props) {
    const url = computed<string>(() => window.URL.createObjectURL(props.file));
    const imgOnload = () => {
      // console.log(url.value);
      window.URL.revokeObjectURL(url.value);
    };

    return {
      url,
      imgOnload,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  height: 80px;
}
</style>
