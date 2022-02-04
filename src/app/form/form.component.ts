import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  userForm! : FormGroup
  constructor(public x : FormBuilder) { 
    this.userForm = this.x.group({
      firstname : ['',[Validators.required]],
      lastname : ['',[Validators.required]],
      email : ['',[Validators.required , Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobile : ['',[Validators.required ,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      age : ['',[Validators.required]],
      password : ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],  
      confirmPassword : ['',[Validators.required]]
    })

    
  }

  ngOnInit(): void {
  }

}
