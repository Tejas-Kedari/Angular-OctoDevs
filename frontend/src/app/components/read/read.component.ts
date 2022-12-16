import { Component, OnInit } from '@angular/core';
import { DevsService } from 'src/app/services/devs.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  constructor(private service:DevsService) { }

  readData:any;
  succmsg:any;
  errmsg:any;

  ngOnInit(): void {
    this.showAllData();
  }

  // getdelete id
  deleteId(id:any){
    this.service.deleteData(id).subscribe((res)=>{
      this.succmsg = res.message;
      this.showAllData();
    })
  }

  showAllData(){
    this.service.getAllData().subscribe((res)=>{
      this.readData = res.data;
    });
  }

}
