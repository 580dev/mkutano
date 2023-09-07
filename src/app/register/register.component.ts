import {Component, inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {RegisterService} from "../register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  fb = inject(FormBuilder);
  registerService = inject(RegisterService);

  registerForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    mail: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, validateNumber]],
    country: ['', [Validators.required]],
    profilType: ['',[Validators.required]]
  },
    {updateOn:"blur"}
  )

  isStudent = false;
  isWorker = false;
  isStartup = false
   imgAlreadyLoad = false;
   profilImg = '';
   errorUpload = '';
   isSubmitSuccess = false;
   isSubmitError = false;

  ngOnInit() {
   this.registerForm.valueChanges.subscribe(form =>{
     console.log(form.firstName)
   })
  }

  onSubmitRegisterForm() {
    console.log(this.registerForm.value);
    this.isSubmitSuccess = false;
    this.isSubmitError = false;
    this.registerService.addParticipant({...this.registerForm.value, cvUrl: this.profilImg})
      .then(()=>{
        alert('Register success. We will contact you for the future.')
        this.registerForm.reset({});
        this.isSubmitSuccess = true;
      },
        ()=>{
        this.isSubmitError = true;
        })
  }

  profilChange($event: any){
    console.log($event.target.value);
    this.isWorker=false;
    this.isStudent=false;
    this.isStartup=false;
    this.removeControl();
    if($event.target.value === 'STUDENT') {
      this.isStudent = true;
      (this.registerForm as FormGroup).addControl('school', new FormControl('', Validators.required))
    }
    if($event.target.value === 'WORKER') {
      this.isWorker = true;
      (this.registerForm as FormGroup).addControl('profession', new FormControl('', Validators.required));
      (this.registerForm as FormGroup).addControl('nbreYearExp', new FormControl('',
        [Validators.required, validateNumber]))
    }
    if($event.target.value === 'COMPANY') {
      this.isStartup = true;
      (this.registerForm as FormGroup).addControl('nameOfStartup', new FormControl('', Validators.required));
      (this.registerForm as FormGroup).addControl('numberOfEmp', new FormControl('',
        [Validators.required, validateNumber]));
      (this.registerForm as FormGroup).addControl('coreBuss', new FormControl('', Validators.required));
    }
  }

  removeControl(){
    (this.registerForm as FormGroup).removeControl('school');
    (this.registerForm as FormGroup).removeControl('profession');
    (this.registerForm as FormGroup).removeControl('nbreYearExp');
    (this.registerForm as FormGroup).removeControl('nameOfStartup');
    (this.registerForm as FormGroup).removeControl('numberOfEmp');
    (this.registerForm as FormGroup).removeControl('coreBuss');
  }

  async onDetectFile(event: any) {
    this.errorUpload ='';
    this.imgAlreadyLoad = false;
    console.log(typeof event);
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    this.registerService.uploadImage(file).then((url: string) => {
      this.imgAlreadyLoad = true;
      this.profilImg = url;
    },()=>{
      this.errorUpload = 'error occur when upload resume'
    })
  }
}

export const validateNumber: ValidatorFn = (ctrl:AbstractControl) => {
  const regx =  new RegExp('[0-9]')
  console.log(regx);
  console.log(regx.test(ctrl.value))
  return !regx.test(ctrl.value) ? {error:{msg:'insert only number'}}:null
}


