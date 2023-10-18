import { Component, OnInit } from '@angular/core';
import { DataService } from '../bankService/data.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  acno: any
  transactionArray: any = []
  spinner: any = true
  date: any = ""
  searchTerm: any = ""


  constructor(private ds: DataService, private rout: Router) { }

  ngOnInit(): void {

    // acno
    if (localStorage.getItem('currentAcno')) {
      this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")
      this.ds.accountStatementApi(this.acno).subscribe({
        next: (result: any) => {
          this.transactionArray = result.message
          console.log(this.transactionArray);



        }
      })
    }
    // Spinner Timout

    setTimeout(() => {
      this.spinner = false
    }, 1000)


    // date
    this.date = new Date()
  }


  // Home 
  backtoHome() {
    this.rout.navigateByUrl("home")
  }

  // Filter
  filterData(search: any) {
    this.searchTerm = search
  }


  // Exportpdf
  pdfExport() {
    // object created
    var pdf = new jsPDF()
    // set coloms
    let col = ['Type', 'Amount', 'Account Number', 'Date']
    // set rows
    let row = []

    // styles
    pdf.setFontSize(15)
    pdf.text("Account--Statement", 15, 10)
    pdf.setFontSize(12)
    pdf.setTextColor('blue')

    // nezteed array
    var allDataArray = this.transactionArray
    for (let i of allDataArray) {
      let rowData = [i.type,i.amount,i.tacno,i.date]
      row.push(rowData)
    }

    // convert pdf to table
    (pdf as any).autoTable(col, row,{startY: 15})

    // open converted pdf in new table
    pdf.output('dataurlnewwindow')

    // download and save

    pdf.save('Account-Statement.pdf')
  }

}
