import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { Picture } from './picture.model';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {

  @Input({alias: "id", required: true}) id:number = 0;

  @ViewChild("pictureImg") pictureImg!:ElementRef;

  picture$ = new Observable<Picture>();

  constructor(private apiService:ApiService, private host:ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.getPicture();
  }

  getPicture() {
    this.picture$ = this.apiService.getPicture(this.id);
  }

  destroy() {
    this.host.nativeElement.remove();
  }

  zoom($event:any) {
    const x = $event.clientX - $event.target.offsetLeft;
    const y = $event.clientY - $event.target.offsetTop;
    
    this.pictureImg.nativeElement.style.transformOrigin = `${x}px ${y}px`;
    this.pictureImg.nativeElement.style.transform = "scale(2)";
  }
  
  resetZoom($event:any) {
    this.pictureImg.nativeElement.style.transformOrigin = `center`;
    this.pictureImg.nativeElement.style.transform = "scale(1)";
  }

}
