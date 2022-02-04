import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-student-crud',
  templateUrl: './student-crud.component.html',
  styleUrls: ['./student-crud.component.css']
})
export class StudentCrudComponent implements OnInit {
  userForm! : FormGroup
  userData: any = [];
  userHobbies: any = []
  constructor(public fb: FormBuilder, private httpClient: HttpClient, private crudService: CrudService ) {
    this.userForm = this.fb.group({
      firstName: ['' , [Validators.required]],
      lastName: ['' , [Validators.required]],
      age: ['' , [Validators.required]],
      gender: [''],
      city: [''],
      id: []
    })
   }

  ngOnInit(): void {
    this.getDetails();
  }

  hobbiesChanged($event: any){
    const value = $event.target.value;
    if(this.userHobbies.find((x:any) => x === value)){
      this.userHobbies = this.userHobbies.filter((x:any) => x !== value);
    }
    else{
      this.userHobbies.push(value);
    }
  }

  getDetails(){
    this.crudService.getAll().subscribe((res: any) => {
      this.userData = res.data})
  }

  editData(payload: any){
    this.userForm.patchValue({
      firstName : payload.firstName,
      lastName : payload.lastName,
      age : payload.age,
      hobbies : payload.hobbies,
      gender : payload.gender,
      city : payload.city,
      id : payload._id
    })
    if(payload.hobbies){
      payload.userHobbies = payload.hobbies.split(',');
    }
  }

  saveData(){
    if(!this.userForm.valid){
      return
    }
    if(this.userForm.value.id){
      this.updateData()
    }
    else{
      this.addData()
    }
  }

  addData(){
    const payload = {
      "firstName" : this.userForm.value.firstName,
      "lastName" : this.userForm.value.lastName,
      "age" : this.userForm.value.age,
      "hobbies" : this.userHobbies.join(','),
      "gender" : this.userForm.value.gender,
      "city" : this.userForm.value.city,
    }
    this.crudService.addAllData(payload).subscribe((res: any) => {
      if(res.isSuccess) {
        this.getDetails();
        this.userForm.reset()
        this.userHobbies = []
      }
    });
  }

  updateData(){
    const payload = {
      "firstName" : this.userForm.value.firstName,
      "lastName" : this.userForm.value.lastName,
      "age" : this.userForm.value.age,
      "hobbies" : this.userHobbies.join(','),
      "gender" : this.userForm.value.gender,
      "city" : this.userForm.value.city,
      "id": this.userForm.value.id
    }
    this.crudService.updateAllData(payload).subscribe((res: any) => {
      if(res.isSuccess) {
        this.getDetails();
        this.userForm.reset()
        this.userHobbies = []
      }
    });
  }

  deleteData(id: string) {
    this.crudService.deleteAllData(id).subscribe((res) => {
      this.getDetails();
    }) 
  }

}
