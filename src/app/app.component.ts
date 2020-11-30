import { Component, OnInit } from '@angular/core';
import { SensexService } from 'src/app/sensex-service.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  p: number = 1;
  pageSize: number = 30;
  totalCount: number;
  collection: any[] = [];
  closeResult = '';
  editSensexForm: FormGroup;

  constructor(private sensexService: SensexService,
              private modalService: NgbModal,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.retrieveSensexData();
    this.getSensexMessage();
    this.editSensexForm = this.fb.group({
      Open: [''],
      Close: [''],
    });
  }
  // function which handles page change event and
  // retrieves data form server
  handlePageChange(pageNumber) {
    this.p = pageNumber;
    this.retrieveSensexData();
  }
  // function which is triggered by socket.io event
  // refreshing the page
  getSensexMessage() {
    this.sensexService.getSensexMessage().subscribe((data) => {
      this.p = 1;
      this.retrieveSensexData();
    });
  }
  getRequestParams(start, count) {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (typeof start !== 'undefined') {
      params[`start`] = start;
    }

    if (count) {
      params[`count`] = count;
    }

    return params;
  }
  // Api which retrieves sensex data
  retrieveSensexData() {
    const start = (this.p - 1) * this.pageSize;
    const params = this.getRequestParams(start, this.pageSize);

    this.sensexService.getSensexList(params)
      .subscribe(
        response => {
          this.collection = response.pageData;
          this.pageSize = 30;
          this.totalCount = response.totalItem;
        },
        error => {
        });
  }
  // funtion to open sensex form modal
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  // Submitting the form
  onSubmit() {
    this.modalService.dismissAll();
    const params = this.editSensexForm.getRawValue();
    this.sensexService.addSensexList(params)
      .subscribe(
        response => {
          this.editSensexForm.reset();
        },
        error => {
        });
  }
}
