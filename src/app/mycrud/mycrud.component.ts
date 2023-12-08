import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../shared/service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mycrud',
  templateUrl: './mycrud.component.html',
  styleUrls: ['./mycrud.component.css']
})
export class MycrudComponent implements OnInit {

  empForm: FormGroup
  education: string[] = ["Matric", "Diploma", "Intermediate", "Graduate", "Post Graduate"]
  constructor(private fb: FormBuilder, private service: ServiceService,
    private dialogref: MatDialogRef<MycrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.empForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experiance: '',
      package: ''
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.service.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next:(val:any) => {
              alert("Employee Updated succesfully")
              this.dialogref.close(true)
          },error:(err:any) => {
            alert(err)
          }
        })
      }
      else {
        this.service.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert("Employee added succesfully")
            this.dialogref.close(true)
          }, error: (err: any) => {
            alert(err)
          }
        })
      }

    }
  }
}
