import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import ErrorMsgService from "../../services/error-msg-service";
import {BaseInputComponent} from "../base-input.component";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent extends BaseInputComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(
    fb: FormBuilder,
    errorMsgService: ErrorMsgService) {
    super(fb, errorMsgService);
  }

}
