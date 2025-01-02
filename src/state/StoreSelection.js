import { atom } from "recoil";

export const selectedStoresState = atom({
  key: "selectedStoresState", // Unique ID (with respect to other atoms/selectors)
  default: [], // Default value (initial state)
});
