import {Component, Input, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() classNames;

  ngOnInit(): void {
    document.body.style.overflow = "hidden";
  }

  ngOnDestroy(): void {
    document.body.style.overflow = "";
  }

}
