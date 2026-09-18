import { useState } from 'react';
import './App.css';

function App() {
  // 1. Set up our React State
  const [currentInput, setCurrentInput] = useState('');
  const [previousInput, setPreviousInput] = useState('');
  const [operator, setOperator] = useState(null);

  // 2. The Math Logic
  const calculate = (n1, n2, op) => {
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);
    if (isNaN(num1) || isNaN(num2)) return '';

    switch (op) {
      case 'add': return String(num1 + num2);
      case 'subtract': return String(num1 - num2);
      case 'multiply': return String(num1 * num2);
      case 'divide': return String(num1 / num2);
      default: return '';
    }
  };

  // 3. Button Click Handlers
  const handleNumber = (val) => {
    // Prevent multiple decimals
    if (val === '.' && currentInput.includes('.')) return; 
    setCurrentInput((prev) => prev + val);
  };

  const handleOperator = (op) => {
    if (currentInput === '') return;
    
    // If we already have a previous number, calculate it first
    if (previousInput !== '') {
      const result = calculate(previousInput, currentInput, operator);
      setPreviousInput(result);
    } else {
      setPreviousInput(currentInput);
    }
    
    setCurrentInput('');
    setOperator(op);
  };

  const handleCalculate = () => {
    if (currentInput === '' || previousInput === '') return;
    const result = calculate(previousInput, currentInput, operator);
    setCurrentInput(result);
    setPreviousInput('');
    setOperator(null);
  };

  const handleClear = () => {
    setCurrentInput('');
    setPreviousInput('');
    setOperator(null);
  };

  // Determine what to show on the screen
  const displayValue = currentInput || previousInput || '0';

  // 4. The HTML (JSX) Layout
  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="keys">
        {/* Action buttons */}
        <button onClick={handleClear} className="clear">C</button>
        <button onClick={() => handleOperator('divide')} className="operator">÷</button>
        <button onClick={() => handleOperator('multiply')} className="operator">×</button>
        <button onClick={() => handleOperator('subtract')} className="operator">−</button>

        {/* Number buttons row 1 */}
        <button onClick={() => handleNumber('7')}>7</button>
        <button onClick={() => handleNumber('8')}>8</button>
        <button onClick={() => handleNumber('9')}>9</button>
        <button onClick={() => handleOperator('add')} className="operator">+</button>

        {/* Number buttons row 2 */}
        <button onClick={() => handleNumber('4')}>4</button>
        <button onClick={() => handleNumber('5')}>5</button>
        <button onClick={() => handleNumber('6')}>6</button>
        <button onClick={handleCalculate} className="equals">=</button>

        {/* Number buttons row 3 */}
        <button onClick={() => handleNumber('1')}>1</button>
        <button onClick={() => handleNumber('2')}>2</button>
        <button onClick={() => handleNumber('3')}>3</button>

        {/* Bottom row */}
        <button onClick={() => handleNumber('0')} className="zero">0</button>
        <button onClick={() => handleNumber('.')}>.</button>
      </div>
    </div>
  );
}

export default App;