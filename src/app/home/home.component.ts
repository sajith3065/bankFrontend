import { Component, OnInit } from '@angular/core';
import { DataService } from '../bankService/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: any = ""
  acno: any = ""
  balance: any = ""
  message:any=""
  msgClr:any=true
  dAcno:any=""

  // reactive form money transfer
  moneyTransferForm=this.fb.group({
    rAcno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]+')]],
    psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
  })

  constructor(private ds: DataService,private fb:FormBuilder,private dp:DatePipe,private rout:Router) { }




  ngOnInit(): void {

    if (localStorage.getItem("currentUname")) {
      this.name = localStorage.getItem("currentUname")
    }


    // login back button
    if(!localStorage.getItem("currentAcno")){
      this.rout.navigateByUrl("")
      alert("Please Login First")
    }

  }

  // to display balance
  getBalance() {
    if (localStorage.getItem("currentAcno")) {
      this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")

      this.ds.getBalanceApi(this.acno).subscribe({
        next: (result: any) => {
          this.balance = result.message
        },
        error: (result: any) => {
          alert(result.error.message)
        }
      })

    }


  }



  // profile View
  getProfile(){
    if(localStorage.getItem("currentAcno")){
      this.acno=JSON.parse(localStorage.getItem("currentAcno") || "")
      console.log(this.acno);
      console.log(this.name);
      
      
    }

  }


// Money transfer
moneyTransfer(){
  if(this.moneyTransferForm.valid){
    var path=this.moneyTransferForm.value
    var rAcno=path.rAcno
    var amount=path.amount
    var psw=path.psw
    // console.log(rAcno);

    if(localStorage.getItem("currentAcno")){
      this.acno=JSON.parse(localStorage.getItem("currentAcno")|| "")
    }

      // date
      const date=new Date()
      var latestDate=this.dp.transform(date,'medium')
        // console.log(latestDate);
        if(this.acno==rAcno){
          // alert("You cannot transfer to your Account")
          this.message="You cannot transfer to your Account"
          this.msgClr=false

        }else{
          // api call
          this.ds.moneyTransferApi(this.acno,rAcno,amount,psw,latestDate).subscribe({
            next:(result:any)=>{
              // alert(result.message)
              this.message=result.message
              this.msgClr=true
            },
            error:(result:any)=>{
              // alert(result.error.message)
              this.message=result.error.message
              this.msgClr=false
            }
          })
        }
        

  }
  else{
    // alert("Invalid Form")
    this.message="Inavlid Form"
    this.msgClr=false
  }
}


// logout
logout(){
  localStorage.removeItem("currentUname")
  localStorage.removeItem("currentAcno")
  this.rout.navigateByUrl("")
}



// delete Account
deleteActive(){
  if(localStorage.getItem("currentAcno")){
    this.dAcno=JSON.parse(localStorage.getItem("currentAcno")||"")
    console.log(this.dAcno);
    
  }
}


// if no in delete
cancelp(){
  this.dAcno=""
}


// if yes
yesDelete(event:any){

this.ds.accountDeleteApi(event).subscribe({
  next:(data:any)=>{
    alert(data.message)
    this.logout()
  }
})

}


}
