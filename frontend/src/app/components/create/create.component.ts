import { Component, OnInit } from '@angular/core';
import { DevsService } from 'src/app/services/devs.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  errmsg: any;
  succmsg: any;
  getparamid: any;

  constructor(private service: DevsService, private router: ActivatedRoute) { }


  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if (this.getparamid) {
      this.service.getSingleData(this.getparamid).subscribe((res) => {
        this.devForm.patchValue({
          name: res.data[0].name,
          email: res.data[0].email,
          mobile: res.data[0].mobile
        })
      })
    }
  }

  devForm = new FormGroup({
    'name': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'mobile': new FormControl('', Validators.required)
  });

  devSubmit() {
    if (this.devForm.valid) {
      this.service.createData(this.devForm.value).subscribe((res) => {
        this.devForm.reset();
        this.succmsg = res.message;
      })
    }
    else this.errmsg = 'All fields are required';
  }

  // update data
  devUpdate() {

    if (this.devForm.valid) {
      this.service.updateData(this.devForm.value, this.getparamid).subscribe((res) => {
        this.succmsg = res.message;
      })
    }
    else {
      this.errmsg = 'All field is required';
    }
  }

}
