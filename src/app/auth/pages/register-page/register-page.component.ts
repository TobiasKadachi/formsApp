import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.ValidatorsService.firstNameAndLastnamePattern) ]],
    // email: ['',[ Validators.required, Validators.pattern(this.ValidatorsService.emailPattern) ], [new EmailValidatorService()]],
    email: ['',[ Validators.required, Validators.pattern(this.ValidatorsService.emailPattern) ], [this.EmailValidatorService]],
    username: ['',[ Validators.required, this.ValidatorsService.cantBeStrider ]],
    password: ['',[ Validators.required, Validators.minLength(6) ]],
    password2: ['',[ Validators.required ]],
  },{
    validators: [
      this.ValidatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });


  constructor(
    private fb: FormBuilder,
    private ValidatorsService: ValidatorsService,
    private EmailValidatorService: EmailValidatorService
   ){}


isValidField(field: string){
  return this.ValidatorsService.isValidField(this.myForm, field)
}

  onSubmit(){
  this.myForm.markAllAsTouched();
}

}
