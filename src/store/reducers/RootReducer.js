import { combineReducers } from "@reduxjs/toolkit";
import { Authentication } from "./reducer";
import { AllProduct } from "./reducer";
export const rootReducer=combineReducers({
    auth : Authentication,
    Product : AllProduct
})