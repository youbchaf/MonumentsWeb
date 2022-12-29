import {Component, OnInit, ViewChild} from '@angular/core'
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
  public commentaires: [];
  public users: [];
  public commentaire :any [];
  public photos: [];
  public vote:boolean = true;
  public monument:any;
  public newUser : any[] = []


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
    this.getComments()
    this.getUsers()




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
                this.markerCenter.lat = monument.latitude,
                    this.markerCenter.lng = monument.longitude

                    this.markers.push(
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
      size: 'xl'
    });
  }
  modalDetail(modalD, m:any) {
    console.log(m)
    this.monument = m;
    this.retrieveComment()

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
      size: 'xl'
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

    if(photo)
    return photo[0]?.url
  }
  getPhotoss():any{
    let photo : any
    if(this.monument){
      photo  = this.photos.filter((f:any) => {
        return f.monument.id === this.monument.id
      })
    }


    return photo
  }
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  public markerZoom = 12;
  public streetZoom = 12;
  public markerCenter: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  };

  public markers: object[] = [
  ];


  openInfo(marker) {
    this.infoWindow.open(marker);
  }
  upVote() {
    this.vote = true
  }
  downVote() {
    this.vote = false
  }
  addComment() {
    let user = document.getElementById("nom") as HTMLInputElement
    let contenu = document.getElementById("commentaire") as HTMLTextAreaElement
    let comment = {
      nom:user.value,
      contenu:contenu.value,
      vote:this.vote,
      monument:this.monument.id
    }

    this.service.addComment(comment).subscribe((data:any) => {
          this.commentaires = data
          this.getComments()
          this.getUsers()
        },
        error => {
          console.log(error)
        }
    )


  }
  getComments(){

    this.service.getComment()
        .subscribe((data:any) => {

              this.commentaires = data


            },
            error => {
              console.log(error)
            }
        )
  }
  getUsers(){
    this.service.getUser()
        .subscribe((data:any) => {

              this.users = data
              this.retrieveComment()

            },
            error => {
              console.log(error)
            }
        )
  }
  retrieveComment(){

    if(this.monument && this.commentaires)
    this.commentaire = this.commentaires.filter((c:any)=>{
      return c.pk.monument === this.monument.id

    })

    if(this.commentaire)
    this.commentaire.forEach((e,i) => {
        this.users.forEach((e1:any,i1) =>{
          if(e1.id === e.pk.user){
            this.newUser.push(e1)
          }

        })
    })

  }

  getCommentUser(c:any):any{

    if(this.users){
      let userInfo =  this.users.find((s:any)=>{
        return s.id === c.pk.user
      })
      return userInfo
    }

  }



}
