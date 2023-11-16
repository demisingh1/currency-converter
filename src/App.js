import { useState } from 'react';
import './App.css';

const initialState = {
  currency:'CAD',
  amount:'',
  ConvertedAmount:'',
  loading:false,
}
function App() {
  const[state , setState] = useState(initialState);
  const{currency , amount, ConvertedAmount,loading} = state;
  // const[amount , setAmount] = useState('');

  // get currency value
  const getValues = (e)=>{
    const name = e.target.name;
   const value = e.target.value;
   console.log(name,value);
   setState({...state , [name]:value})
   
  }
 /// get amount
  const ConvertCurrency = (e)=>{
e.preventDefault();
setState({...state , loading:true})
try {
fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=INR`)
  .then(resp => resp.json())
  .then((data) => {
    // alert(`10 GBP = ${data.rates.USD} USD`);
    const ConvertedAmount = data.rates.INR;
    setState({...state, ConvertedAmount, loading:false })
    console.log(data);
  });
} catch (error) {
  console.log(error);
}
  }
  return (
    <div>
      <nav>
        <h2 className='logo'>Currency Converter</h2>
      </nav>
      <div>
        <form>
          <label htmlFor="amount">Enter  Amount:</label>
          <input type="number" name='amount' id='amount' onChange={getValues} value={amount} />
          
          <label htmlFor="currency">Select Currency</label>
          <select name="currency" id="currency" value={currency} onChange={getValues}>
            
            <option value="CAD">CAD</option>
            <option value="GBP">GBP</option>
            <option value="AUD">AUD</option>
            <option value="INR">INR</option>
          </select>
          <br />
          <button onClick={ConvertCurrency}>{loading ? 'Converting' : 'Convert'}</button>
          <br />
          <label htmlFor="Convamount">USD</label>
          <input type="number" name='Convertedamount' id='Convamount' disabled value={ConvertedAmount} />
        </form>
      </div>
    </div>
  );
}

export default App;
