import React, { useState } from 'react';
import axios from 'axios';
import './OptimizeForm.css';

function OptimizeForm() {
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
    const[protein,setProtein]=useState('');
    const [maxCalories, setMaxCalories] = useState('');
    const [maxGenerations, setMaxGenerations] = useState('5');
    const [responseData, setResponseData] = useState([]);
    const [error, setError] = useState(null);
    const [loading,setLoading]=useState(false)
    const [envstatus] = useState(process.env.NODE_ENV=== "production")
    // const [maxGenState,setMaxGenState]=useState(0)
    const handleSubmit = (event) => {
        event.preventDefault();
        if(parseInt(carbs)<0||parseInt(fat)<0||parseInt(protein)<0){
            alert("all the values must be above 0")
            return;
        }
        setError("")
       
      
        setLoading(true)
        const formData = new FormData();
        formData.append('carbs', carbs);
        formData.append('fat', fat);
        formData.append('protein',protein)
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
                    <input required
                        type="number"
                        step="1"
                           min="0"
                        value={carbs}
                        onChange={e => setCarbs(e.target.value)}
                    />
                </label>

                <label>
                    Fat:
                    <input required
                        type="number"
                        step="1"
                           min="0"
                        value={fat}
                        onChange={e => setFat(e.target.value)}
                    />
                </label>
                <label>
                Protein:
                    <input required
                        type="number"
                           min="0"
                        step="1"
                        value={protein}
                        onChange={e => setProtein(e.target.value)}
                    />
                </label>

                <label>
                    Max Calories:
                    <input required
                        min="1"
                        type="number"
                        value={maxCalories}
                        onChange={e => setMaxCalories(e.target.value)}
                    />
                </label>
                {!envstatus&&<label>
                    Max Generations:
                    <input required
                        min="1"
                        type="number"
                        value={maxGenerations}
                        onChange={e => setMaxGenerations(e.target.value)}
                    />
                </label>}


                <input type="submit" value="Submit" className='submit' />
                {loading&&(<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)}
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
          
        </div>
    );

}

export default OptimizeForm;
