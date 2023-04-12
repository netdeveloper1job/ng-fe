import { AbstractControl, FormGroup } from "@angular/forms";
export function anyOneFieldRequired(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
      if ((control.value == '' || control.value == null) && (matchingControl.value == '' || matchingControl.value == null)) {
        matchingControl.setErrors({ required: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }