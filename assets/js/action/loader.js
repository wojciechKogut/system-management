import {LOADING} from "./types";

export const loader = (flag) => {
  return {
      type: LOADING,
      payload: flag
  }
};