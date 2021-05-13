import { reactive } from "vue";
import {
  generateOutputPictName,
  getFileExtension,
} from "@/utils/uid-filenames";

export type Tstate = "Start" | "Upload" | "Upload finished" | "Отправлен";

export interface OneImgInfo {
  file: File;
  newName: string;
  key: number;
  state: Tstate;
  progress: number;
}

export interface ResultURL {
  jpg1600: string;
  jpg350: string;
}
// ключ - это имя первоначального файла
// 2021/5/9/585-6c4-9f2-568.png:
//     jpg350: "https://imgprovider.site/resize/2021/5/9/585-6c4-9f2-568-350.jpeg"
//     jpg1600: "https://imgprovider.site/resize/2021/5/9/585-6c4-9f2-568-1600.jpeg"

export type ResultURLs = Record<string, ResultURL>;

const state = reactive({
  error: null,
  compressState: "noCompress" as
    | "noCompress"
    | "compressStart"
    | "compressFinished",
  imgInfo: [] as Array<OneImgInfo>,
  showPopup: false,
  // newNames: [] as Array<string>,
  resultURLs: {} as ResultURLs,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  callBackFunc: () => {},
});

let counterKey = 0;
function newKey(): number {
  return counterKey++;
}

// eslint-disable-next-line
export function useImages() {
  const addNewImg = (file: File) => {
    const newImg: OneImgInfo = {
      newName: generateOutputPictName() + "." + getFileExtension(file.name),
      file,
      key: newKey(),
      state: "Start",
      progress: 0,
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

  const cnangeAllState = (newState: Tstate) => {
    state.imgInfo.forEach((val) => {
      val.state = newState;
    });
  };

  const resetState = () => {
    state.error = null;
    state.compressState = "noCompress";
    state.imgInfo = [];
    state.showPopup = false;
    state.resultURLs = {};
    // state.newNames = [];
    // console.log("resetState newNames", state.newNames);
    // console.log("resetState  state.imgInfo", state.imgInfo);
  };

  const form350output = (): Array<string> => {
    // eslint-disable-next-line
    const resURLs = [] as any;
    Object.keys(state.resultURLs).forEach((val) => {
      const curImg = state.resultURLs[val];
      resURLs.push(curImg.jpg350);
    });
    return resURLs;
  };

  return {
    state: state,
    methods: {
      addNewImg,
      findImgByKey,
      removeImgByKey,
      cnangeImgStateByKey,
      cnangeAllState,
      resetState,
      form350output,
    },
  };
}
