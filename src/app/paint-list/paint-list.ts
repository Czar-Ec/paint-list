import { Component, Signal } from '@angular/core';
import { ConfigService } from '../shared/config-service';
import { Paint } from '../shared/list-objects';
import { CommonModule } from '@angular/common';
import { PaintInfo } from './paint-info/paint-info';

@Component({
  selector: 'app-paint-list',
  imports: [CommonModule, PaintInfo],
  templateUrl: './paint-list.html',
  styleUrl: './paint-list.scss',
})
export class PaintList {
  paintList: Signal<Paint[]>;

  constructor(private readonly configService: ConfigService) {
    this.paintList = this.configService.paintList$;
  }
}
