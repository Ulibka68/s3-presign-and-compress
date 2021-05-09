<template>
  <div id="overlay" class="cover blur-in">
    <div class="content">
      <button class="buttonUpload" @click="handleImgUpload">
        Загрузить изображение
      </button>
      <h1>The history or Lorem Ipsum</h1>
      <span>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32.
      </span>
      <span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          faucibus viverra porta. Pellentesque scelerisque eros quis dignissim
          semper. Nulla ut justo a sapien lobortis posuere. Maecenas scelerisque
          justo eleifend risus dapibus, id bibendum tellus placerat. Sed massa
          diam, ornare ut varius ut, auctor non arcu. Cras rutrum tortor eu diam
          feugiat aliquam. Suspendisse rutrum pretium pretium.
        </p>
      </span>
      <span>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </span>
    </div>
  </div>
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
  width: 450px;
  max-height: calc(100vh - 40px);
  /*overflow: auto;*/
  box-sizing: content-box;
  margin: 0 auto;
  padding: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
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
</style>
