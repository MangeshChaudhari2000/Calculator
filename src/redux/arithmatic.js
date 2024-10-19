// redux/arithmatic.js
import { createSlice } from "@reduxjs/toolkit";
import { create, all } from "mathjs";

const math = create(all);
const initialState = {
  output: "0"
};

export const calculate = (input) => (dispatch) => {
    try {
      // Replace 'x' with '*' for multiplication and handle percent
      const formattedInput = input.replace(/x/g, '*').replace(/%/g, '/100');
      const result = math.evaluate(formattedInput); // Use mathjs to evaluate
      dispatch(arithmaticAction.setOutput(result.toString()));
    } catch (error) {
      console.error("Calculation Error: ", error);
      dispatch(arithmaticAction.setOutput("Error"));
    }
  };

const arithmaticSlice = createSlice({
  name: "arithmatic",
  initialState,
  reducers: {
    setOutput: (state, action) => {
      state.output = action.payload;
    },
    clearOutput: (state) => {
      state.output = "0";
    },
  },
});

export const arithmaticReducer=arithmaticSlice.reducer; 
export const arithmaticAction = arithmaticSlice.actions;
export const arithmaticSelector = (state) => state.arithmaticReducer;
