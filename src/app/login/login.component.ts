import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../bankService/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

// data="Happy Banking with Us!!"
data2="Enter Account Number"



// acno:any
// psw:any


// model form

loginForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
  psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]],
})


constructor(private rout:Router,private fb:FormBuilder,private ds:DataService){}

login(){

  var acno=this.loginForm.value.acno
  var psw=this.loginForm.value.psw

  if(this.loginForm.valid){
    this.ds.loginApi(acno,psw).subscribe({

      next: (result: any)=>{
        // store data in Local Storage
        localStorage.setItem("currentAcno",JSON.stringify(acno))
        localStorage.setItem("currentUname",result.currentUser)
        localStorage.setItem("token",JSON.stringify(result.token))

        alert(result.message)
        this.rout.navigateByUrl("home")

      },
      error: (result:any)=>{
        alert(result.error.message)
      }
    })

  }
  else{
    alert('Invalid')
  }

}



}
