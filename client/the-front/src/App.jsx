import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [foodName, setFoodName] = useState('');
  const [newFoodName, setNewFoodName] = useState('');
  const [daysSinceEaten, setDaysSinceEaten] = useState(0);
  const [list, setList] = useState([]);
  useEffect(() => {
    try {
      fetch("http://localhost:4000/display")
        .then((res) => res.json())
        .then((data) => setList(data))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }, []);
   


  const Add = async () => {
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodName: foodName,
          daysSinceEaten: daysSinceEaten,
        }),
      });
  
      if (!response.ok) {
        // Handle non-successful responses here
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      alert("Data Successfully Added");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  
  return (
    <div className='App'>
      
      All Foods

      {list.map((value, key) => {
        return <div key={key}>
          <div className="container">
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1">Food Name</div>
                <div className="col col-2">Days Since Eaten</div>
              </li>
              <li className="table-row">
                <div className="col col-1" >{value.foodName}</div>
                <div className="col col-2" >{value.daysSinceEaten}</div>
              </li>
            </ul>

            <input type="text" placeholder='Replace Name' onChange={(e) => setNewFoodName(e.target.value)} />
          
          </div>
        </div>
      })}
    </div>
  )
}

export default App
