import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'



@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.less'
})
export class CategoryComponent {

  category = [
    { title: 'Machine Learning', iconClass: 'fa-solid top fa-puzzle-piece fa-fw' },
    { title: '(Probabilistic) Deep Learning', iconClass: 'fa-solid top fa-layer-group fa-fw' },
    { title: 'Statistical Relational AI', iconClass: 'fa-solid top fa-chart-pie fa-fw' },
    { title: 'Computer Vision', iconClass: 'fa-solid top fa-eye fa-fw' },
    { title: 'Natural Language Processing', iconClass: 'fa-solid top fa-font fa-fw' },
    { title: 'Robotics', iconClass: 'fa-solid top fa-robot fa-fw'},

    { title: 'Models of Higher Cognition', iconClass: 'fa-solid top fa-brain fa-fw' },
    { title: 'Psychology of Information Processing', iconClass: 'fa-solid top fa-diagram-predecessor fa-fw'},
    { title: 'Database Systems', iconClass: 'fa-solid top fa-database fa-fw' },
    { title: 'Software Engineering', iconClass: 'fa-solid top fa-terminal fa-fw'},
    { title: 'Distributed Systems', iconClass: 'fa-solid top fa-sitemap fa-fw'},
    { title: 'Hardware', iconClass: 'fa-solid top fa-server fa-fw'},

    { title: 'Bioinformatics', iconClass: 'fa-solid top fa-heart-pulse fa-fw' },
    { title: 'Semantic Web', iconClass: 'fa-solid top fa-folder-tree fa-fw' },
    { title: 'Sustainability', iconClass: 'fa-solid top fa-seedling fa-fw' },
    { title: 'Medicine', iconClass: 'fa-solid top fa-stethoscope fa-fw' },
    { title: 'Finance', iconClass: 'fa-solid top fa-chart-line fa-fw' },
    { title: 'Multimodal AI', iconClass: 'fa-solid top fa-layer-group fa-fw' },
  ]

}
