import { useState } from 'react';
import './OptimizeForm.css';

const productionApiUrl =
  'https://eveolutionary-algorithm-server.onrender.com/optimize';

function getApiUrl() {
  if (import.meta.env.PROD) {
    return productionApiUrl;
  }

  return `http://${window.location.hostname}:8000/optimize`;
}

function OptimizeForm() {
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [protein, setProtein] = useState('');
  const [maxCalories, setMaxCalories] = useState('');
  const [maxGenerations, setMaxGenerations] = useState('5');
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('carbs', carbs);
    formData.append('fat', fat);
    formData.append('protein', protein);
    formData.append('max_calories', maxCalories);
    formData.append('max_generation', maxGenerations);

    try {
      const response = await fetch(getApiUrl(), {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(body || `Request failed with status ${response.status}`);
      }

      setResponseData(await response.json());
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pageDiv">
      <form onSubmit={handleSubmit} className="optimize-form">
        <label>
          Carbs:
          <input
            required
            type="number"
            step="1"
            min="0"
            value={carbs}
            onChange={(event) => setCarbs(event.target.value)}
          />
        </label>

        <label>
          Fat:
          <input
            required
            type="number"
            step="1"
            min="0"
            value={fat}
            onChange={(event) => setFat(event.target.value)}
          />
        </label>

        <label>
          Protein:
          <input
            required
            type="number"
            min="0"
            step="1"
            value={protein}
            onChange={(event) => setProtein(event.target.value)}
          />
        </label>

        <label>
          Max Calories:
          <input
            required
            min="1"
            type="number"
            value={maxCalories}
            onChange={(event) => setMaxCalories(event.target.value)}
          />
        </label>

        {!import.meta.env.PROD && (
          <label>
            Max Generations:
            <input
              required
              min="1"
              type="number"
              value={maxGenerations}
              onChange={(event) => setMaxGenerations(event.target.value)}
            />
          </label>
        )}

        <input type="submit" value="Submit" className="submit" disabled={loading} />

        {loading && (
          <div className="lds-roller" aria-label="Loading">
            {Array.from({ length: 8 }, (_, index) => <div key={index} />)}
          </div>
        )}

        {error && <div role="alert">{error}</div>}
      </form>

      <div className="cardDiv">
        {responseData.map((food) => (
          <div className="card" key={food.code ?? food.name}>
            <h2>{food.name}</h2>
            <h4>Calories: {food.Energy}</h4>
            <h4>Carbs: {food.carbs}</h4>
            <h4>Fats: {food.fat}</h4>
            <h4>Protein: {food.protein}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OptimizeForm;
