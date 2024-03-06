import { useState } from 'react';
import './BarbellCalculatorModal.css';

function BarbellCalculatorModal({ onClose }) {
  const [unit, setUnit] = useState('kg'); //^ 'kg' or 'lbs'
  const [desiredWeight, setDesiredWeight] = useState('');
  const [plateCounts, setPlateCounts] = useState([]);
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  //^ customInventory initialization with default values
  const [customInventory, setCustomInventory] = useState({
    kg: { 20: 2, 15: 2, 10: 2, 5: 4, 2.5: 4, 1.25: 4 },
    lbs: { 45: 2, 35: 2, 25: 2, 10: 4, 5: 4, 2.5: 4 },
  });

  //^ Update inventory function
  const updateInventory = (weight, newCount) => {
    if (newCount < 0) return; //^ Prevent negative inventory
    const updatedInventory = { ...customInventory };
    updatedInventory[unit][weight] = newCount;
    setCustomInventory(updatedInventory);
  };

  const calculatePlateDimensions = (plateWeight) => {
    const kgScale = 25;
    const lbsScale = 55;
    const baseHeight = 85;
    const heightIncrease =
      (plateWeight / (unit === 'kg' ? kgScale : lbsScale)) * 80;
    const baseWidth = 25;
    const widthIncrease = 10;
    return {
      height: `${baseHeight + heightIncrease}px`,
      width: `${baseWidth + widthIncrease}px`,
    };
  };

  const getColorByWeight = (plateWeight) => {
    const weight = unit === 'kg' ? plateWeight : plateWeight * 2.20462;

    if (weight >= 25) return '#FF0000';
    else if (weight >= 20) return '#0000FF';
    else if (weight >= 15) return '#FFFF00';
    else if (weight >= 10) return '#008000';
    else if (weight >= 5) return '#696969';
    else return '#FFFFFF';
  };

  const calculatePlates = (weight, unit) => {
    const barWeight = unit === 'kg' ? 20.4 : 45;
    let remainingWeight = weight - barWeight;
    remainingWeight /= 2; //^ Plates needed for one side
    let platesNeeded = [];

    const plates = Object.keys(customInventory[unit])
      .map(Number)
      .sort((a, b) => b - a);

    plates.forEach((plateWeight) => {
      const availablePlates = customInventory[unit][plateWeight];
      let platesToUse = Math.floor(remainingWeight / plateWeight);

      if (platesToUse > availablePlates) {
        platesToUse = availablePlates;
      }

      for (let i = 0; i < platesToUse; i++) {
        platesNeeded.push(plateWeight);
        remainingWeight -= plateWeight;
      }
    });

    return platesNeeded;
  };

  const handleCalculateClick = () => {
    const plates = calculatePlates(parseFloat(desiredWeight), unit);
    setPlateCounts(plates);
  };

  return (
    <div id='modal'>
      <div id='modal-background' onClick={onClose}></div>
      <div
        id='modal-content'
        onClick={handleModalContentClick}
        className='calculator-modal-content'
      >
        <h2>
          Barbell Calculator<span className='blinking-cursor'></span>
        </h2>
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value='lbs'>Lbs</option>
          <option value='kg'>Kg</option>
        </select>
        <input
          type='number'
          value={desiredWeight}
          onChange={(e) => setDesiredWeight(e.target.value)}
          placeholder='Desired Weight'
        />
        <button onClick={handleCalculateClick}>Calculate</button>
        {plateCounts.length > 0 && (
          <div className='barbell-visualization'>
            <div className='barbell'>
              <div className='bar'></div> {/* Bar representation */}
              {plateCounts.map((plate, index) => (
                <div
                  key={index}
                  className='barbell-plate'
                  style={{
                    ...calculatePlateDimensions(plate),
                    backgroundColor: getColorByWeight(plate),
                  }}
                >
                  {`${plate}`}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className='inventory-container'>
          {Object.entries(customInventory[unit]).map(([weight, count]) => (
            <div key={weight} className='plate-item'>
              <button
                className='inventory-adjust plus'
                onClick={() => updateInventory(weight, count + 1)}
              >
                +
              </button>
              <div className='plate-inventory'>
                <span className='plate-weight'>{weight}</span>
                <span className='plate-unit'>{unit}</span>
                <div className='inventory-circle'>{count}</div>
              </div>
              <button
                className='inventory-adjust minus'
                onClick={() => updateInventory(weight, Math.max(count - 1, 0))}
              >
                -
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BarbellCalculatorModal;
