<template>
  <div class="popup-container-background" v-if="showPopup">
    <div class="popup-container">
      <a href="#" class="close-button" @click="state.state.showPopup = false"
        >&#10006;</a
      >
      <div class="scolling-context">
        <ImageList />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import ImageList from "@/views/ImageList.vue";
import { useImages } from "@/state/composition-state";

export default defineComponent({
  name: "App",
  components: { ImageList },
  setup() {
    const state = useImages();
    const handleImgUpload = () => {
      state.methods.resetState();
      state.state.showPopup = true;
    };
    return {
      state,
      handleImgUpload,
      showPopup: computed(() => state.state.showPopup),
    };
  },
});
</script>

<style>
@import "./css-gloabal-var.css";
</style>

<style scoped>
.content {
  width: 650px;
  margin: 0 auto;
  padding-top: 100px;
}

span {
  color: dimgray;
}

.popup-container-background {
  /* position: fixed;
  margin: 0;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
  filter: blur(4px);*/

  position: fixed;
  background-color: rgba(255, 228, 196, 0.5);
  margin: 0;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;

  font-size: 1.2rem;
  font-family: Arial;
}

.popup-container {
  width: 480px;
  max-height: calc(100vh - 40px);
  /*overflow: auto;*/
  box-sizing: border-box;
  margin: 0 auto;
  padding: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  /*transform: translate(calc(-50% - 25px), -50%);*/
  transform: translate(-50%, -50%);

  box-shadow: 10px 10px 7px rgba(192, 143, 143, 0.75) inset,
    -10px -10px 7px rgba(192, 143, 143, 0.75) inset;
  background-color: var(--mast-bgr-color);

  font: inherit;
}
.scolling-context {
  margin: 0;
  max-height: calc(100vh - 40px - 1rem);
  overflow: auto;
}

.close-button {
  transition: all 0.5s ease;
  position: absolute;
  background-color: #ff9980;
  padding: 1.5px 7px;
  right: 40px;
  /*margin-left: -10px;*/
  /*margin-top: -9px;*/
  border-radius: 50%;
  border: 2px solid #fff;
  color: white;
  box-shadow: -3px 1px 6px 0px rgba(0, 0, 0, 0.1);
}

.close-button:hover {
  background-color: tomato;
  color: #fff;
}

.buttonUpload {
  font-size: 2rem;
  font-weight: bold;
  color: red;
  padding: 1rem;
}

@media (max-width: 500px) {
  .content {
    width: 100vw;
  }

  .popup-container {
    width: calc(100% - 60px);
  }
}
</style>
