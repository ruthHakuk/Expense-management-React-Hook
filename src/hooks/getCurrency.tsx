import { useState, useEffect } from 'react';
import { Currency } from '../Models/currency.model';
import CurrencyService from '../services/currency.service';

export function useCurrency(c1: string, c2: string) {
    const [rate, setRate] = useState<number>(0)

    useEffect(() => {
        CurrencyService.getCurrencytRate(c1, c2)
            .then((res) => {
                const resObj: Currency = res.data
                setRate(resObj.rate)
            })
            .catch((error) => {
                console.log(error)
            })
    })

    return rate;
}