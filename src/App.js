import { useEffect, useState } from 'react';
import './App.css';

function Dogs({ onDogClick }) {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    
    fetch(`https://dog.ceo/api/breeds/image/random/50`)
      .then(response => response.json())
      .then(data => {
        setIsError(false);
        setIsLoading(false);
        setData(data.message);
      })
      .catch(() => {
        setIsError(false);
        setIsLoading(false);
      })
  }, []);

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  return (
    <>
      <h2>Dogs</h2>
      {isError && <span>error loading dogs</span>}
      {isLoading && <span>loading dogs 🐾🐾🐾</span>}
      {data && (
        <ul>
          {data.map((dogUrl, index) => (
            <li key={getRandomInt(999999)} onClick={() => onDogClick(index + 1)}>
              <img alt={`dog #${index + 1}`} src={dogUrl} />
              <span>Dog #{index + 1}</span>
            </li>
          ))}
        </ul>
      )} 
    </>
  );
}

function App() {
  const [dogEmoji, setDogEmoji] = useState('🐕‍🦺');
  const [number, setNumber] = useState(1);
  
  const calculateFibonaci = (num) => {
    if (num < 1) {
      return 1;
    }

    return calculateFibonaci(num - 1) + calculateFibonaci(num - 2);
  };

  return (
    <div className="App">
      <h1>Fibonacci Dogs</h1>
        <div className="fibonacci">
          <span 
            className="emoji"
            onClick={() => setDogEmoji(dogEmoji === '🐕‍🦺' ? '🐩' : '🐕‍🦺')}
          >
            {dogEmoji}
          </span>
          <div>
            <button onClick={() => setNumber(number - 1)}>-</button>
            <button onClick={() => setNumber(number + 1)}>+</button>
          </div>
          <span>Fibonaci of {number} is {calculateFibonaci(number)}</span>
        </div>
        <Dogs onDogClick={(dogNumber) => setNumber(dogNumber)} />
    </div>
  );
}

export default App;
