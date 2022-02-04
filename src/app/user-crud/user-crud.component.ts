import { HttpClient } from '@angular/common/http';
import { isNgTemplate, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit {
  userForm!: FormGroup
  userData: any = [];
  userHobbies: any = [];
  uploadedImage: any = null
  constructor(public fb: FormBuilder, private httpclient: HttpClient, private crudService: CrudService) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required]],
      hobbies: [''],
      gender: [''],
      city: [''],
      id: []
    })
  }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    this.crudService.getUser().subscribe((res: any) => {
      this.userData = res.data;
    })
  }

  hobbiesChanged($event: any) {
    const value = $event.target.value;
    if (this.userHobbies.find((x: any) => x === value)) {
      this.userHobbies = this.userHobbies.filter((x: any) => x !== value);
    }
    else {
      this.userHobbies.push(value);
    }
  }

  editData(item: any) {
    this.userForm.patchValue({
      firstName: item.firstName,
      lastName: item.lastName,
      age: item.age,
      gender: item.gender,
      city: item.city,
      id: item._id
    })
    if (item.hobbies) {
      this.userHobbies = item.hobbies.split(',')
    }
  }

  saveData() {
    if (!this.userForm.valid) {
      return
    }
    if (this.userForm.value.id) {
      this.updateData()
    }
    else {
      this.addData()
    }
  }

  setImage($event: any) {
    this.uploadedImage = $event.target.files[0]
  }

  addData() {
    const item = {
      "firstName": this.userForm.value.firstName,
      "lastName": this.userForm.value.lastName,
      "age": this.userForm.value.age,
      "gender": this.userForm.value.gender,
      "city": this.userForm.value.city
    }
    const formData = new FormData()
    formData.append('hobbies', this.userHobbies.join(','))
    formData.append('userImage', this.uploadedImage)
    Object.keys(item).forEach(item => {
      formData.append(item, this.userForm.value[item])
    })
    this.crudService.addUser(formData).subscribe((res: any) => {
      if (res.isSuccess) {
        this.getDetails();
        this.uploadedImage = null
        this.userForm.reset()
        this.userHobbies = []
      }
      else {
        alert(res.message);
      }
    })
  }

  updateData() {
    const item = {
      "firstName": this.userForm.value.firstName,
      "lastName": this.userForm.value.lastName,
      "age": this.userForm.value.age,
      "gender": this.userForm.value.gender,
      "city": this.userForm.value.city,
      "id": this.userForm.value.id
    }
    const formData = new FormData()
    formData.append('hobbies', this.userHobbies.join(','))
    if (this.uploadedImage) {
      formData.append('userImage', this.uploadedImage)
    }
    Object.keys(item).forEach(item => {
      formData.append(item, this.userForm.value[item])
    })
    this.crudService.updateUser(formData).subscribe((res: any) => {
      if (res.isSuccess) {
        this.getDetails();
        this.userForm.reset();
        this.userHobbies = []
      }
      else {
        alert(res.message);
      }
    })
  }

  deleteData(id: string) {
    this.crudService.deleteUser(id).subscribe((res) => {
      this.getDetails();
    })
  }

}
