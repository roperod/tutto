import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, map, filter } from 'rxjs';
import { Picture } from '../picture/picture.model';
import { ApiService } from '../services/api.service';
import { PictureComponent } from '../picture/picture.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  offset:number = 0;
  offsetSize:number = 30;

  pictures$ = new Observable<Picture[]>();
  pictures:Picture[] = [];

  @ViewChild("pictureModal", {read: ViewContainerRef})
  pictureModal!: ViewContainerRef;
  
  @ViewChild("search") search!:ElementRef;

  constructor(private apiService:ApiService, private router:Router) {}
  
  ngOnInit(): void {
    this.listPictures();
  }

  listPictures(filteredId:string="") {
    this.apiService.listPictures().pipe(
      map(pictures => filteredId? pictures.filter(picture => picture.id.toString() == filteredId) : pictures),
      map(pictures => {
        if (filteredId.length > 0) this.pictures = [];
        
        if (this.offset < pictures.length) { 
          this.pictures = this.pictures.concat(pictures.slice(this.offset,this.offset+this.offsetSize))
        } else {
          this.pictures = pictures.slice(this.offset,this.offset+this.offsetSize);
        }
        return pictures;
      })
    ).subscribe();
  }

  onScroll() {
    this.offset += this.offsetSize;
    this.listPictures();
  }

  createPictureComponent(id:number) {
    this.pictureModal.clear();
    const newPictureModal = this.pictureModal.createComponent(PictureComponent, {});
    newPictureModal.setInput("id", id);
  }

  filterById() {
    var filter:string = this.search.nativeElement.value;
    this.listPictures(filter);
  }
}
