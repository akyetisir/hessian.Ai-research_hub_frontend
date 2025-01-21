import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgIf  } from '@angular/common';
import { Paper } from '../../shared/models/paper.model'; 



@Component({
  selector: 'app-paper-description',
  standalone: true,
  imports: [ RouterLink, NgIf, CommonModule],
  templateUrl: './paper-description.component.html',
  styleUrl: './paper-description.component.less'
})


export class PaperDescriptionComponent{
  @Input() paper: Paper | null = null;
}
