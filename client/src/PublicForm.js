import React, { useState } from 'react';
import axios from 'axios';
import './OptimizeForm.css';

function OptimizeForm() {
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
    const [maxCalories, setMaxCalories] = useState('');
    const [maxGenerations, setMaxGenerations] = useState('');
    const [responseData, setResponseData] = useState([]);
    const [error, setError] = useState(null);
    const [loading,setLoading]=useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append('carbs', carbs);
        formData.append('fat', fat);
        formData.append('max_calories', maxCalories);
        formData.append('max_generation', maxGenerations);
        // console.log(window.location)
        let apiUrl = `http://${ window.location.hostname}:8000/optimize`;
        if (process.env.NODE_ENV === "production") {
          apiUrl = 'https://eveolutionary-algorithm-server.onrender.com/optimize'
        }
        const config = {
            method: 'post',
            url: apiUrl,
            headers: {

            },
            data: formData
        };

        axios(config)
            .then(function (response) {
                setResponseData(response.data);
                setLoading(false)
            })
            .catch(function (error) {
                setError(error);
                setLoading(false)
            });
    }

    return (
        <div className='pageDiv'>
            
            <form onSubmit={handleSubmit} className="optimize-form">
                <label>
                    Carbs:
                    <input
                        type="number"
                        min="0"
                        max="1"
                        step="0.01"
                        value={carbs}
                        onChange={e => setCarbs(e.target.value)}
                    />
                </label>

                <label>
                    Fat:
                    <input
                        type="number"
                        min="0"
                        max="1"
                        step="0.01"
                        value={fat}
                        onChange={e => setFat(e.target.value)}
                    />
                </label>

                <label>
                    Max Calories:
                    <input
                        type="number"
                        value={maxCalories}
                        onChange={e => setMaxCalories(e.target.value)}
                    />
                </label>

                <label>
                    Max Generations:
                    <input
                        type="number"
                        value={maxGenerations}
                        onChange={e => setMaxGenerations(e.target.value)}
                    />
                </label>

                <input type="submit" value="Submit" className='submit' />
                {error && <div>{error.message}</div>}
            </form>
           
            <div className='cardDiv'>
                {responseData.map((food) => {
                    return (
                        <div className='card' key={food.name}>
                            <h2>{food.name}</h2>
                            <h4> Calories: {food.Energy}</h4>
                            <h4> Carbs: {food.carbs}</h4>
                            <h4> Fats: {food.fat}</h4>
                            <h4> Protein: {food.protein}</h4>
                        </div>
                    )
                })}
            </div>
            {loading&&(<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)}
        </div>
    );

}

export default OptimizeForm;
