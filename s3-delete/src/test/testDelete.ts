require("dotenv").config();
import { deleteImages } from "../ImageDelete";

async function runDelete() {
  // console.log(await deleteImages("2021/5/11/b72-bf2-f21-ac3.jpeg"));
  console.log(
    await deleteImages([
      "2021/5/12/7b0-8f0-abc-3a1.jpeg",
      "2021/5/12/b38-a3d-a42-e26.jpeg",
    ])
  );
}
runDelete();
