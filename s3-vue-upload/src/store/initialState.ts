export type LoadingStates = "Выбрано" | "Загрузка" | "Успешно загружено";

export interface OneImageInfo {
  file: File;
  newName: string;
  loadingState: LoadingStates;
  id: number;
}

export const initialState = {
  counter: {
    counter: 0,
    filesList: [] as Array<File>,
    newNames: [] as Array<string>,
    loadingStates: [] as Array<LoadingStates>,
    imagesInfo: [] as Array<OneImageInfo>,
  },
  auth: {
    name: "Ivan",
    idUser: "89annsdj77",
    email: "ivan@ivan.ru",
  },
};
