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
  users: null,
  loaded: false,

  imgInfo: [] as Array<OneImgInfo>,
});

let counterKey = 0;
function newKey(): number {
  return counterKey++;
}

export default function useUsers() {
  const load = async () => {
    if (!state.loaded) {
      try {
        const usersResponse = await fetch(
          "https://reqres.in/api/users?delay=2"
        );
        state.users = await usersResponse.json();
      } catch (e) {
        state.error = e;
      }
    }
  };

  const addNewImg = (file: File) => {
    const newImg: OneImgInfo = {
      newName: generateOutputPictName(),
      file,
      key: newKey(),
      state: "Загружен",
    };
  };

  // function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
  //  UnwrapRefSimple
  const findImgByKey = (key: number): OneImgInfo => {
    return state.imgInfo.find((value) => value.key === key);
  };

  return { ...toRefs(state), methods: { load, addNewImg } };
}
