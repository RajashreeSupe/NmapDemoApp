import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { register } from '../register';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  selectedFile: File | null = null;

  registrationForm = new FormGroup({
    photo: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    age: new FormControl(),
    state: new FormControl(),
    country: new FormControl(),
    interest: new FormControl(),
    addressType: new FormControl(),
    address1: new FormControl(),
    address2: new FormControl(),
    companyAddress1: new FormControl(),
    companyAddress2: new FormControl()
  });

  photo: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.registrationForm = this.fb.group({
      photo: [null, Validators.required],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+@')]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]+')]],
      age: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      interest: [''],
      addressType: ['home'],
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: ['']
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width === 310 && img.height === 325) {
          this.selectedFile = file;
          this.registrationForm.patchValue({ photo: file });
        } else {
          alert('Invalid photo dimensions. Required: 310x325 px');
        }
      };
    }
  }
  onCancel() {
    this.registrationForm.reset();
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const register = {
        photo: this.photo,
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        email: this.registrationForm.value.email,
        phone: this.registrationForm.value.phone,
        age: this.registrationForm.value.age,
        state: this.registrationForm.value.state,
        country: this.registrationForm.value.country,
        interest: this.registrationForm.value.interest,
        addressType: this.registrationForm.value.addressType,
        address1: this.registrationForm.value.address1,
        address2: this.registrationForm.value.address2,
        companyAddress1: this.registrationForm.value.companyAddress1,
        companyAddress2: this.registrationForm.value.companyAddress2
      };

      this.userService.addUser(register).subscribe(
        (result) => {
          console.log("data added successfully");
          const data: any = result.body;
          console.log(data.id);
          let userId = data.id;

          this.router.navigate(['/profile', userId]);
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    }
  }
}





