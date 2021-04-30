import { GetterTree, MutationTree, ActionContext, CommitOptions } from "vuex";

import { initialState, LoadingStates, OneImageInfo } from "../initialState";
import {
  generateOutputPictName,
  getFileExtension,
} from "@/utils/uid-filenames";

/*
   ---------------------- Mutations -------------------------------
 */

export type MutationPayload = {
  setOne: void;
  setAdd: number;
  setMulti: { addCnt1: number; addCnt2: number };
  setLoadingState: { id: number; state: LoadingStates };

  addNewFile: File;
  removeFile: number;
};

export const mutations: MutationTree<State> & Mutations = {
  setOne({ counter }) {
    counter.counter = 0;
  },
  setAdd({ counter }, payload) {
    counter.counter += payload;
  },
  setMulti({ counter }, payload) {
    counter.counter += payload.addCnt1 + payload.addCnt2;
  },
  setLoadingState({ counter }, payload) {
    counter.loadingStates[payload.id] = payload.state;
  },
  addNewFile({ counter }, payload) {
    const newImg: OneImageInfo = {
      file: payload,
      newName: generateOutputPictName() + "." + getFileExtension(payload.name),
      loadingState: "Выбрано",
      id: counter.imagesInfo.length,
    };
    counter.imagesInfo.push(newImg);
  },
  removeFile({ counter }, payload) {
    const idDel = counter.imagesInfo.findIndex((value) => value.id === payload);
    if (idDel === -1) return;
    counter.imagesInfo.splice(idDel, 1);
  },
};

/*
   ---------------------- Getters -------------------------------
 */

export type Getters = {
  doubledCounter(state: State): number;
  counterGet(state: State): number;
  nameGet(state: State): (id: number) => string;
  loadStateGet(state: State): (id: number) => LoadingStates;
  imageInfoGet(state: State): Array<OneImageInfo>;
  newNamesGet;
};

export const getters: GetterTree<State, State> & Getters = {
  doubledCounter: ({ counter }) => {
    return counter.counter * 2;
  },
  counterGet: ({ counter }) => {
    return counter.counter;
  },
  nameGet: ({ counter }) => (id: number) => counter.newNames[id],
  loadStateGet: ({ counter }) => (id: number) => counter.loadingStates[id],
  imageInfoGet: ({ counter }) => counter.imagesInfo,
};

/*
   ---------------------- Actions -------------------------------
 */

export type ActionsPayload = {
  setOneA: [payload: void, returnVal: void];
  setAddA: [payload: number, returnVal: number];
  setMultiA: [
    payload: { addCnt1: number; addCnt2: number },
    returnVal: Promise<number>
  ];
  setLoadingState: [
    payload: { id: number; state: LoadingStates },
    returnVal: Promise<void>
  ];
};

export const actions: Actions = {
  setOneA({ commit }): void {
    commit("setOne", (null as unknown) as void);
  },
  setAddA({ commit, state }, payload: number): number {
    commit("setAdd", payload);
    return state.counter.counter;
  },
  async setMultiA(
    con: AugmentedActionContext,
    payload: { addCnt1: number; addCnt2: number }
  ): Promise<number> {
    await setTimeout(() => {
      con.commit("setMulti", payload);
    }, 2000);

    return new Promise<number>(() => 1);
  },
  async setLoadingState(
    con: AugmentedActionContext,
    payload: { id: number; state: LoadingStates }
  ): Promise<void> {
    await setTimeout(() => {
      con.commit("setLoadingState", payload);
    }, 2000);
  },
};

/*
   ---------------------- Actions no change code -----------------------------
 */

type Actions = {
  [Property in keyof ActionsPayload]: (
    augContext: AugmentedActionContext,
    payload: ActionsPayload[Property][0]
  ) => ActionsPayload[Property][1];
};

type AugmentedActionContext = {
  commit<K extends keyof MutationPayload>(
    key: K,
    payload: MutationPayload[K],
    options?: CommitOptions
  ): void;
} & Omit<ActionContext<State, State>, "commit">;

/*
   ---------------------- Mutations - no change code ------------------------
 */

type Mutations = {
  [Property in keyof MutationPayload]: (
    state: State,
    payload: MutationPayload[Property]
  ) => void;
};

/*
   ---------------------- Getters - no change code -------------------------------
 */
type State = typeof initialState;
