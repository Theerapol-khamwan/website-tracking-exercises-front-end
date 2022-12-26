import React from "react";

const CalculateBMI = (props) => {
  const dataProfile = props.dataProfile;
  const weight = dataProfile.weight;
  const height = dataProfile.height;

  const heightSquared = height * height;
  const calculateBMI = (weight / heightSquared) * 10000;

  let bmiDisplay;
  if (calculateBMI <= 18.5) {
    bmiDisplay = (
      <>
        <div className="text-gray-300 flex font-bold">
          <h1>UNDERWEIGHT</h1>
          <div>{calculateBMI.toFixed(2)}</div>
        </div>
      </>
    );
  }

  if (18.5 <= calculateBMI && calculateBMI <= 24.9) {
    bmiDisplay = (
      <>
        <div className="text-green-400 flex font-bold">
          <h1 className="mr-2">NORMAL</h1>
          <div>{calculateBMI.toFixed(2)}</div>
        </div>
      </>
    );
  }

  if (calculateBMI >= 25 && calculateBMI <= 29.9) {
    bmiDisplay = (
      <>
        <div className="text-orange-400 rounded-lg">
          <h1 className="mr-2">OVERWEIGHT</h1>
          <div>{calculateBMI.toFixed(2)}</div>
        </div>
      </>
    );
  }

  if (calculateBMI >= 30 && calculateBMI <= 34.9) {
    bmiDisplay = (
      <>
        <div className="text-red-400 rounded-lg">
          <h1 className="mr-2">OBESE</h1>
          <div>{calculateBMI.toFixed(2)}</div>
        </div>
      </>
    );
  }

  if (calculateBMI >= 35) {
    bmiDisplay = (
      <>
        <div className="text-indigo-500 rounded-lg">
          <h1 className="mr-2">EXTREMELY OBESE</h1>
          <div>{calculateBMI.toFixed(2)}</div>
        </div>
      </>
    );
  }

  return <div>{bmiDisplay}</div>;
};

export default CalculateBMI;
