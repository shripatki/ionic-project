import { Component, OnInit, Input } from '@angular/core';
import { ReceipeModel } from '../receipe.model';

@Component({
  selector: 'app-receipe-item',
  templateUrl: './receipe-item.component.html',
  styleUrls: ['./receipe-item.component.scss'],
})
export class ReceipeItemComponent implements OnInit {
  @Input() receipe:ReceipeModel;
  constructor() { }

  ngOnInit() {}

}
