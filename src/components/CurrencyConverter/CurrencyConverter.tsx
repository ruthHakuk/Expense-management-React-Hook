import React, { useEffect, useState } from 'react'
import './CurrencyConverter.scss'
import useFetchDataStatus from '../../hooks/fetchData'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate } from 'react-router-dom'

const ExpensTip = () => {
 const API_KEY = 'A21BDF0A-ED22-4F8D-B55E-DAD0A7FBA108'
  //מתשנים לדעת את שני סוגי המטבעות להמרה
  const [currencyOne, setCurrencyOne] = useState<string>('ILS')
  const [currencyTwo, setCurrencyTwo] = useState<string>('USD')
  //שימוש בfetch
  const [url, setUrl] = useState<string>(`https://rest.coinapi.io/v1/exchangerate/${currencyOne}/${currencyTwo}?apikey=${API_KEY}`)
  const { isLoading, data, error } = useFetchDataStatus(url)
  const [currencyRate, setCurrencyRate] = useState<number>(0)
  const [rateResult, setRateResult] = useState<number>(0)
  const _navigate = useNavigate()
  const handleChange = (e: any) => {
    const inputValue = parseFloat(e.target.value)
    if (currencyRate) {
      setRateResult(inputValue * currencyRate)
    }
  }

  useEffect(() => {
    setUrl(`https://rest.coinapi.io/v1/exchangerate/${currencyOne}/${currencyTwo}?apikey=${API_KEY}`)
  }, [currencyOne, currencyTwo])

  useEffect(() => {
    if (data != null) {
      setCurrencyRate(data.rate)
    }
  }, [data])

  if (isLoading) {
    return (
      <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
        <CircularProgress color="secondary" />
      </Stack>
    )
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }


  const goToMainPage = () => {
    _navigate(`/home`)
  }
  return (
    <div className='CurrencyConverter'>
      <div className="float-right" dir="rtl">
        <button className="btn btn-secondary btn-rtl" onClick={goToMainPage}>
          <i className="fas fa-arrow-right"></i> Back
        </button>
      </div>
      <h1>Exchange Rate: {currencyRate}</h1>
      <div className='form-container'>
        <form>
          <div className="row">
            <div className="select-container">
              <label htmlFor="currency-one-select">From</label>
              <select
                id="currency-one-select"
                value={currencyOne}
                onChange={(e) => setCurrencyOne(e.target.value)}
              >
                <option value="ILS">ILS</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <div className="select-container">
              <label htmlFor="currency-two-select">To</label>
              <select
                id="currency-two-select"
                value={currencyTwo}
                onChange={(e) => setCurrencyTwo(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="ILS">ILS</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>

          <div className="row">
            <input
              id="currency-one-input"
              placeholder={`Amount in ${currencyOne}`}
              onChange={handleChange}
            />
            <input
              id="currency-two-input"
              placeholder={`Converted to ${currencyTwo} `}
              value={rateResult === 0 ? 0 : rateResult}
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ExpensTip
