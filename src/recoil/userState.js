import { atom } from "recoil";

const defaultValue = localStorage.getItem("user") ?? null;

const userState = atom({
  key: "todoListState",
  default: defaultValue,
});

export default userState;
