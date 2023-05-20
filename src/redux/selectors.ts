import { RootState } from "./store";

export const getIngredients = (store: RootState) => store.ingredients;
export const getConstructorData = (store: RootState) => store.constructorData;
export const getOrder = (store: RootState) => store.order;
export const getUser = (store: RootState) => store.user;
export const getFeed = (store: RootState) => store.feed;
