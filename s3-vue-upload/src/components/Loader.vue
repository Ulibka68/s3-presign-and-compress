<template>
  <div class="loader"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loader",
});
</script>

<style scoped>
.loader {
  --loader_size: 20px;
  --segment_width: 5px;
}
.loader:before,
.loader:after {
  --segment_width: 5px;
}

.loader {
  width: var(--loader_size);
  height: var(--loader_size);
  border-radius: 100%;
  position: relative;

  background-color: inherit;
}

/* LOADER 1 */

.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: calc(0px - var(--segment_width));
  left: calc(0px - var(--segment_width));
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: var(--segment_width) solid transparent;
  border-top-color: #3498db;
}

.loader:before {
  z-index: 100;
  animation: spin 1.5s infinite;
}

.loader:after {
  border: var(--segment_width) solid #ccc;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
