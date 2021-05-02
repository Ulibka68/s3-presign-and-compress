import { computed, reactive, ref, toRefs } from "vue";
import { generateOutputPictName } from "@/utils/uid-filenames";

export type Tstate = "Загружен" | "Отправлен";

export interface OneImgInfo {
  file: File;
  newName: string;
  key: number;
  state: Tstate;
}

const state = reactive({
  error: null,
  counter: 1,
  imgInfo: [] as Array<OneImgInfo>,
});

let counterKey = 0;
function newKey(): number {
  return counterKey++;
}

export function useImages() {
  const addNewImg = (file: File) => {
    const newImg: OneImgInfo = {
      newName: generateOutputPictName(),
      file,
      key: newKey(),
      state: "Загружен",
    };
    state.imgInfo.push(newImg);
  };

  const findImgByKey = (key: number): OneImgInfo | null => {
    const ind = state.imgInfo.findIndex((value) => value.key === key);
    if (ind === -1) return null;
    return state.imgInfo[ind];
  };

  const removeImgByKey = (key: number): boolean => {
    const ind = state.imgInfo.findIndex((value) => value.key === key);
    if (ind === -1) return false;
    state.imgInfo.splice(ind, 1);
    return true;
  };

  const cnangeImgStateByKey = (key: number, newState: Tstate): boolean => {
    const ind = state.imgInfo.findIndex((value) => value.key === key);
    if (ind === -1) return false;
    state.imgInfo[ind].state = newState;
    return true;
  };

  return {
    state: state,
    methods: { addNewImg, findImgByKey, removeImgByKey, cnangeImgStateByKey },
  };
}
