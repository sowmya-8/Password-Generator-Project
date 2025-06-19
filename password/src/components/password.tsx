import React, { useState } from 'react';
import './password.css';

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const generatePassword = () => {
    let characters = '';
    if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) characters += '0123456789';
    if (includeSymbols) characters += '!@#$%^&*()_+{}[]<>?';

    if (characters.length === 0) {
      setAlertMessage('⚠️ Please select at least one checkbox');
      return;
    }

    let generated = '';
    for (let i = 0; i < length; i++) {
      generated += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    setPassword(generated);
    setAlertMessage('');
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setAlertMessage('✅ Password copied to clipboard!');
    setTimeout(() => setAlertMessage(''), 3000);
  };

  return (
    <div className="password-generator">
      <div className="output-section">
        <input type="text" value={password} readOnly placeholder="Your password will appear here" />
        <button onClick={copyToClipboard}>Copy</button>
      </div>

      <div className="controls">
        <label>
          Length: 
          <input
            type="number"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>
        <label><input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} /> Capital Letters[A-Z]</label>
        <label><input type="checkbox" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} /> Small Letters[a-z]</label>
        <label><input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} /> Numbers[0--9]</label>
        <label><input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} /> Symbols[@#$%*&]</label>

        <button onClick={generatePassword}>Generate Password</button>
      </div>

      {alertMessage && <div className="alert">{alertMessage}</div>}
    </div>
  );
};

export default PasswordGenerator;
