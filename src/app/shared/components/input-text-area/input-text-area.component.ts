import { Component, OnInit } from '@angular/core';
import {BaseInputComponent} from "../base-input.component";
import {FormBuilder} from "@angular/forms";
import ErrorMsgService from "../../services/error-msg-service";

@Component({
  selector: 'app-input-text-area',
  templateUrl: './input-text-area.component.html',
  styleUrls: ['./input-text-area.component.css']
})
export class InputTextAreaComponent extends BaseInputComponent implements OnInit {

  constructor(fb: FormBuilder, errorMsgService: ErrorMsgService) {
    super(fb, errorMsgService);
  }

  ngOnInit(): void {
  }

}
