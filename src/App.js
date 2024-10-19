import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { arithmaticSelector, arithmaticAction } from "./redux/arithmatic";
import { calculate } from "./redux/arithmatic";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

function App() {
  const { output } = useSelector(arithmaticSelector);
  const dispatch = useDispatch();
  const [tempValue, setTempValue] = useState("");
  const [dark, setDark] = useState(false);
  useEffect(() => {
    // Update tempValue to output when output changes after calculation
    setTempValue(output);
  }, [output]); // This effect will run whenever output changes

  const handleButtonClick = (value) => {
    if (value === "C") {
      dispatch(arithmaticAction.clearOutput());
    }
    else if (value === "=") {
      dispatch(calculate(tempValue));
      // No need to set tempValue here; it will be updated via useEffect
    }
    else if (value === "+-") {
      const currentValue = parseFloat(tempValue) || 0;
      const newValue = -currentValue;
      setTempValue(newValue.toString());
      dispatch(arithmaticAction.setOutput(newValue.toString()));
    }
    else {

      const newValue = tempValue + value.toString();
      setTempValue(newValue);
      dispatch(arithmaticAction.setOutput(newValue));
    }
  };

  const handleTheme = () => {
    setDark(!dark);
  }

  return (
    <div className={`flex items-center h-screen ${dark ? "bg-gray-900" : ""}   `}>

      <div className="w-80 bg-gray-200 border-slate-800 drop-shadow-lg rounded-lg mx-auto rounded-2xl mt-4">
        <div className="flex justify-between p-2 items-center">
          <div className="h-16 w-11/12 bg-gray-800 rounded-xl shadow-md ">
            <p className="text-white text-3xl p-4">{tempValue}</p> {/* Display tempValue */}
          </div>
          <img className="w-6 h-6 "
            src={`${dark?"https://cdn-icons-png.flaticon.com/128/7269/7269735.png":"https://cdn-icons-png.flaticon.com/128/7645/7645197.png"}`}
            onClick={() => handleTheme()} 
            aria-label="theme"/>
        </div>

        <div className="grid grid-cols-4 gap-2 p-2">
          {btnValues.map((subArray, indexOuter) =>
            subArray.map((data, indexRow) => (
              <div
                key={indexRow}
                className={`flex transition ease-in-out delay-100 hover:scale-105 items-center justify-center h-14 rounded-lg m-2 shadow-md hover:shadow-2xl shadow-gray-400 transition duration-150 ease-in-out
                         ${data === "=" ? "w-32 bg-lime-600 hover:bg-lime-700" : "w-12"}
                         ${(indexRow + 1) % 4 === 0 ? "bg-amber-500 hover:bg-amber-600 shadow-amber-900/20" : "bg-gray-600 hover:bg-gray-800"}`}
                role="button"
                aria-label={`Button ${data}`}
                onClick={() => handleButtonClick(data)}
              >
                <p className="text-center text-white">{data}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
