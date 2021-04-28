<template>
  <Suspense>
    <template #default>
      <ImageList />
    </template>
    <template #fallback>
      <h1>ERROR</h1>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ImageList from "@/views/ImageList.vue";

export default defineComponent({
  name: "App",
  components: { ImageList },
});
</script>

<style scoped></style>
