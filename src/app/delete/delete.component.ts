import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

@Input() data:string | undefined

@Output() onCancel=new EventEmitter()
@Output() onDelete=new EventEmitter()

// if no
cancel(){
this.onCancel.emit()
}

// if Yes
deleteAcc(){
this.onDelete.emit(this.data)
}


}
