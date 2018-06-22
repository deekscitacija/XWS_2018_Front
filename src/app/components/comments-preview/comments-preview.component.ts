import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-comments-preview',
  templateUrl: './comments-preview.component.html',
  styleUrls: ['./comments-preview.component.css']
})
export class CommentsPreviewComponent implements OnInit {

  @Input() comments: any[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit() {


  }

}
