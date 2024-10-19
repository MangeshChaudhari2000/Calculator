import { arithmaticReducer } from "./arithmatic";
import { configureStore } from "@reduxjs/toolkit";

const store=configureStore(
    {
        reducer:{arithmaticReducer}
    }
)

export default store;