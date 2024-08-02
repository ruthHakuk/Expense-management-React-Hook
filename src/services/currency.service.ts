import axios from "axios"

class CurrencyService{

   // API_KEY ='F040CA87-3131-48F5-9347-2DB57A47F5DA'
    API_KEY='JJJJ'
    getCurrencytRate(cur1:string,cur2:string){
        return axios.get(`https://rest.coinapi.io/v1/exchangerate/${cur1}/${cur2}?apikey=${this.API_KEY}`)
    }

}
export default new CurrencyService