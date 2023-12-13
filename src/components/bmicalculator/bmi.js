
import React, { useState } from 'react'; 
import './bmi.css'; 
  
function BmiCalculator() { 
    const [heightValue, setHeightValue] = useState(''); 
    const [weightValue, setWeightValue] = useState(''); 
    const [bmiValue, setBmiValue] = useState(''); 
    const [bmiMessage, setBmiMessage] = useState(''); 
  
    const calculateBmi = () => { 
        if (heightValue && weightValue) { 
            const heightInMeters = heightValue / 100; 
            const bmi = (weightValue / (heightInMeters * heightInMeters)).toFixed(2); 
            setBmiValue(bmi); 
  
            let message = ''; 
            if (bmi < 18.5) { 
                message = 'You are Underweight'; 
            } else if (bmi >= 18.5 && bmi < 25) { 
                message = 'You are Normal weight'; 
            } else if (bmi >= 25 && bmi < 30) { 
                message = 'You are Overweight'; 
            } else { 
                message = 'You are Obese'; 
            } 
            setBmiMessage(message); 
        } else { 
            setBmiValue(''); 
            setBmiMessage(''); 
        } 
    }; 
  
    return ( 
        <div>
        <div className="container"> 
        
            <h1 className="head"> BMI Calculator</h1> 
            <div className="input-container"> 
                <label htmlFor="height"> Height (cm): {heightValue}</label> 
                <input 
                    type="range"
                    id="height"
                    min="0"
                    max="220"
                    value={heightValue} 
                    onChange={(e) => setHeightValue(e.target.value)} 
                /> 
            </div> 
            <div className="input-container"> 
                <label htmlFor="weight"> Weight (kg): {weightValue}</label> 
                <input 
                    type="range"
                    id="weight"
                    min="0"
                    max="100"
                    
                    value={weightValue} 
                    onChange={(e) => setWeightValue(e.target.value)} 
                /> 
            </div> 
            <button className="calculate-btn" onClick={calculateBmi}> 
                Click to Calculate BMI 
            </button> 
            {bmiValue && bmiMessage && ( 
                <div className="result"> 
                    <p> 
                        Your BMI: <span className="bmi-value">{bmiValue}</span> 
                    </p> 
                    <p> 
                        Result: <span className="bmi-message">{bmiMessage}</span> 
                    </p> 
                </div> 
            )} 
        </div> 
        </div>
    ); 
} 
  
export default BmiCalculator;