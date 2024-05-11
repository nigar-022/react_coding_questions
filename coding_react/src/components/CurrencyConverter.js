import React, { useEffect, useState } from "react";

export function CurrencyConverter() {
    const [amount, setAmount] = useState('')
    const [currecyOptions,setCurrencyOptions] = useState([]);
    const [fromCurrency,setFromCurrency] = useState("usd");
    const [toCurrency,setToCurrency] = useState('inr');
    const [exchangeRate,setExchangeRate] = useState()
    const [currencyData,setcurrencyData] = useState([])
    const [output,setOutput] = useState(0)

    console.log(fromCurrency)
    console.log(toCurrency)
    console.log(exchangeRate)
    console.log(currencyData)


    useEffect(() => {
        const fetchData = async () => {
            try{

                
                const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}.json`)
                const data = await response.json();

                const currency = Object.keys(data[fromCurrency])[10]
                setcurrencyData(data[fromCurrency])
                
                setCurrencyOptions(Object.keys(data[fromCurrency]))
                setFromCurrency(fromCurrency)
                setToCurrency(currency)
                setExchangeRate(currencyData[currency])

            }catch(e) {
                console.log(e)

            }
        }
        fetchData()
    },[fromCurrency])


    const convert = () => {
      console.log('called')
      setOutput(amount * exchangeRate)

    }
  return (
    <>
      <h1> Currency Converter </h1>
      <input type="number" placeholder="Amount"  onChange={(e) => setAmount(e.target.value)}/>
      <div>
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {
            currecyOptions && currecyOptions.map((option) => (

              <option key = {option} value={option}>{option}</option>
            ))

          }
        </select>

        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {
            currecyOptions && currecyOptions.map((option) => (

              <option key={option} value={option}>{option}</option>
            ))

          }
        </select>
      </div>
      <button onClick = {convert}>Convert</button>
      <h2>Converted Amount = {output.toFixed(2)} </h2>
      <h3>{`${amount} ${fromCurrency} = ${output} ${toCurrency}`}</h3>

    </>
  );
}
