import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// header overloading
const options = {
  headers: new HttpHeaders()
}




@Injectable({
  providedIn: 'root'
})

export class DataService {

  // craete common url
  baseUrl: any = "https://bank-server-d4hf.onrender.com"

  constructor(private http: HttpClient) { }


  // TOKEN
  // ========================
  getToken() {
    // create a header object
    const headers = new HttpHeaders()

    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token") || "")
      options.headers = headers.append("access_token",token)
    }
    return options

  }



  // api to create account
  accountCreate(acno: any, psw: any, uname: any) {
    const bodyData = { acno, psw, uname }
    // http will automaticaly convert
    return this.http.post(`${this.baseUrl}/bankuser/create_acc`, bodyData)
  }


  // api to create login
  loginApi(acno: any, psw: any) {
    const bodyData = { acno, psw }
    return this.http.post(`${this.baseUrl}/bankuser/login`, bodyData)
  }


  // api to get balance
  getBalanceApi(acno: any) {
    return this.http.get(`${this.baseUrl}/bankuser/balance/${acno}`,this.getToken())
  }

  // Money transfer Api
  moneyTransferApi(sAcno: any, rAcno: any, amount: any, spsw: any, date: any) {
    const bodyData = {
      sAcno, rAcno, amount, spsw, date
    }
    return this.http.post(`${this.baseUrl}/bankuser/money-transfer`, bodyData,this.getToken())
  }


  //api to get transactions
  accountStatementApi(acno: any) {
    return this.http.get(`${this.baseUrl}/bankuser/account-statement/${acno}`,this.getToken())
  }


  // to delete account
  accountDeleteApi(acno: any) {
    return this.http.delete(`${this.baseUrl}/bankuser/delete-account/${acno}`,this.getToken())
  }

}
