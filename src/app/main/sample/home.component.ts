import {Component, OnInit, ViewChild} from '@angular/core'
import {MonumentsService} from "../../monuments/monuments.service";
import {FormBuilder} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {HomeService} from "./home.service";
import {SwiperConfigInterface} from "ngx-swiper-wrapper";
import {MapInfoWindow, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private service:HomeService, private fb:FormBuilder,private modalService: NgbModal , private sanitizer: DomSanitizer) { }

  public contentHeader: object
  public monuments: [];
  public photos: [];

  public monument:any;


  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Sample',
            isLink: false
          }
        ]
      }
    }
    this.getMon()
    this.getPhoto()
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  getMon(){

    this.service.getMon()
        .subscribe((data:any) => {

            console.log(data)
              this.monuments = data
              this.monuments.forEach((monument:any)=>{
                this.markerCentere.lat = monument.latitude,
                    this.markerCentere.lng = monument.longitude,

                    this.markerse.push(
                        {
                          position: {
                            lat: monument.latitude,
                            lng: monument.longitude
                          },
                          options: {
                            draggable: false
                          },
                          label: monument.nom
                        }
                    )
              })



            },
            error => {
              console.log(error)
            }
        )
  }
  getPhoto(){

    this.service.getPhoto()
        .subscribe((data:any) => {

              this.photos = data


            },
            error => {
              console.log(error)
            }
        )
  }
  modalOpenLG(modalLG) {
    this.getMon()
    this.modalService.open(modalLG, {
      centered: true,
      size: 'lg'
    });
  }
  modalDetail(modalD, m:any) {
    console.log(m)
    this.monument = m;
    this.markerCenter.lat = this.monument.latitude,
        this.markerCenter.lng = this.monument.longitude,
        this.markers = []
        this.markers.push(
        {
          position: {
            lat: this.monument.latitude,
            lng: this.monument.longitude
          },
          options: {
            draggable: false
          },
          label: this.monument.nom
        }
    )

    this.modalService.open(modalD, {
      centered: true,
      size: 'lg'
    });
  }

  public swiperCoverflow: SwiperConfigInterface = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: '.swiper-pagination'
    }
  };

  getPhotos(id:any):string{
    let photo:any
    if(this.photos)
    {
       photo  = this.photos.filter((f:any) => {
        return f.monument.id === id
      })
    }

    return photo[0]?.url
  }


  getPhotoss():any{
    let photo : any = this.photos.filter((f:any) => {
      return f.monument.id === this.monument.id
    })
    console.log(photo)
    return photo
  }


  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  public markerZoom = 12;
  public streetZoom = 12;
  public markerCenter: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  };
  public markerCentere: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  };

  public markers: object[] = [

  ];
  public markerse: object[] = [

  ];
  openInfo(marker: MapMarker) {
    this.infoWindow.open(marker);
  }
  openInfoe(marker: MapMarker) {
    this.infoWindow.open(marker);
  }
}