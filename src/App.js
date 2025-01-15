// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [amount, SetAmount] = useState(1);
  const [FromCur, SetFromCur] = useState('EUR');
  const [ToCur, SetToCur] = useState('USD');
  const [converted, SetConverted] = useState("");
  const [IsLoading, SetIsLoading] = useState(false);

  useEffect(function(){

    async function convert() {
      SetIsLoading(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${FromCur}&to=${ToCur}`);
    
        const data = await res.json();
        SetConverted(data.rates[ToCur]);
        SetIsLoading(false);
    }

    if (FromCur === ToCur) return SetConverted(amount);
    

    convert();
  }, [amount, FromCur, ToCur]);

  return (
    <div>
     <h1>Converter Money</h1>
      
      <input type="text" 
        value={amount} onChange={(e) => SetAmount(Number(e.target.value))} 
        disabled={IsLoading} />
     
      <select value={FromCur} onChange={(e) => SetFromCur(e.target.value)} disabled={IsLoading} >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={ToCur} onChange={(e) => SetToCur(e.target.value)} disabled={IsLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{converted} {ToCur}</p>
    </div>
  );
}
