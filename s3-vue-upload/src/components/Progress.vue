<template>
  <div>
    <div
      class="vue-simple-progress-text"
      :style="text_style"
      v-if="text.length > 0 && textPosition == 'top'"
    >
      {{ text }}
    </div>
    <div class="vue-simple-progress" :style="progress_style">
      <div
        class="vue-simple-progress-text"
        :style="text_style"
        v-if="text.length > 0 && textPosition == 'middle'"
      >
        {{ text }}
      </div>
      <div
        style="position: relative; left: -9999px"
        :style="text_style"
        v-if="text.length > 0 && textPosition == 'inside'"
      >
        {{ text }}
      </div>
      <div class="vue-simple-progress-bar" :style="bar_style">
        <div
          :style="text_style"
          v-if="text.length > 0 && textPosition == 'inside'"
        >
          {{ text }}
        </div>
      </div>
    </div>
    <div
      class="vue-simple-progress-text"
      :style="text_style"
      v-if="text.length > 0 && textPosition == 'bottom'"
    >
      {{ text }}
    </div>
  </div>
</template>

<script>
// Источник
// https://github.com/dzwillia/vue-simple-progress/blob/master/src/components/Progress.vue

var isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
/* eslint-disable */
export default {
  props: {
    val: {
      default: 0,
    },
    max: {
      default: 100,
    },
    size: {
      // either a number (pixel width/height) or 'tiny', 'small',
      // 'medium', 'large', 'huge', 'massive' for common sizes
      type: String,
      default: "3px",
    },
    "bg-color": {
      type: String,
      default: "#eee",
    },
    "bar-color": {
      type: String,
      default: "#2196f3", // match .blue color to Material Design's 'Blue 500' color
    },
    "bar-transition": {
      type: String,
      default: "all 0.5s ease",
    },
    "bar-border-radius": {
      type: Number,
      default: 0,
    },
    spacing: {
      type: Number,
      default: 4,
    },
    text: {
      type: String,
      default: "",
    },
    "text-align": {
      type: String,
      default: "center", // 'left', 'right'
    },
    "text-position": {
      type: String,
      default: "bottom", // 'bottom', 'top', 'middle', 'inside'
    },
    "font-size": {
      type: String,
      default: "1rem",
    },
    "text-fg-color": {
      type: String,
      default: "#222",
    },
  },
  computed: {
    pct() {
      var pct = (this.val / this.max) * 100;
      pct = pct.toFixed(2);
      return Math.min(pct, this.max);
    },
    size_px() {
      switch (this.size) {
        case "tiny":
          return "2px";
        case "small":
          return "4px";
        case "medium":
          return "8px";
        case "large":
          return "12px";
        case "big":
          return "16px";
        case "huge":
          return "32px";
        case "massive":
          return "64px";
      }

      return this.size;
    },
    text_padding() {
      switch (this.size) {
        case "tiny":
        case "small":
        case "medium":
        case "large":
        case "big":
        case "huge":
        case "massive":
          return Math.min(Math.max(Math.ceil(this.size_px / 8), 3), 12);
      }

      return isNumber(this.spacing) ? this.spacing : 4;
    },
    text_font_size() {
      switch (this.size) {
        case "tiny":
        case "small":
        case "medium":
        case "large":
        case "big":
        case "huge":
        case "massive":
          return Math.min(Math.max(Math.ceil(this.size_px * 1.4), 11), 32);
      }

      return isNumber(this.fontSize) ? this.fontSize : 13;
    },
    progress_style() {
      var style = {
        background: this.bgColor,
      };

      if (this.textPosition == "middle" || this.textPosition == "inside") {
        style["position"] = "relative";
        style["min-height"] = this.size_px;
        style["z-index"] = "-2";
      }

      if (this.barBorderRadius > 0) {
        style["border-radius"] = this.barBorderRadius + "px";
      }

      return style;
    },
    bar_style() {
      var style = {
        background: this.barColor,
        width: this.pct + "%",
        height: this.size_px + "px",
        transition: this.barTransition,
      };

      if (this.barBorderRadius > 0) {
        style["border-radius"] = this.barBorderRadius + "px";
      }

      if (this.textPosition == "middle" || this.textPosition == "inside") {
        style["position"] = "absolute";
        style["top"] = "0";
        style["height"] = "100%";
        (style["min-height"] = this.size_px), (style["z-index"] = "-1");
      }

      return style;
    },
    text_style() {
      var style = {
        color: this.textFgColor,
        // "font-size": this.text_font_size,
        "font-size": this.fontSize,
        "text-align": this.textAlign,
      };
      console.log(style);
      console.log(this.fontSize);

      if (
        this.textPosition == "top" ||
        this.textPosition == "middle" ||
        this.textPosition == "inside"
      )
        style["padding-bottom"] = this.text_padding + "px";
      if (
        this.textPosition == "bottom" ||
        this.textPosition == "middle" ||
        this.textPosition == "inside"
      )
        style["padding-top"] = this.text_padding + "px";

      return style;
    },
  },
};
</script>
