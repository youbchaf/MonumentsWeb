import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MonumentsService} from "./monuments.service";
import {FormBuilder} from "@angular/forms";
import {MapInfoWindow, MapMarker} from "@angular/google-maps";
import MapTypeId = google.maps.MapTypeId;

@Component({
  selector: 'app-monuments',
  templateUrl: './monuments.component.html',
  styleUrls: ['./monuments.component.scss']
})
export class MonumentsComponent implements OnInit {
  public contentHeader: object
  
  public basicDPdata: NgbDateStruct;
  public monuments: [];
  public types: [];
  public zones: any [];
  public allzone: any [];
  public villes: [];
  public creators: [];
  public monument:any;
  source: google.maps.LatLngLiteral
  destination:google.maps.LatLngLiteral
  map : google.maps.Map
    center: google.maps.LatLngLiteral
    options: google.maps.MapOptions = {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel:true,
        disableDefaultUI:true,
        disableDoubleClickZoom:true,
        zoom:16
    }
    ds: google.maps.DirectionsService
    dr: google.maps.DirectionsRenderer
    polylineOptions = {
        path: [],
        strokeColor: '#32a1d0',
        strokeOpacity: 1.0,
        strokeWeight: 2,
    };

    constructor(private service:MonumentsService, private fb:FormBuilder,private modalService: NgbModal) { }

  ngOnInit(): void {

    this.contentHeader = {
      headerTitle: 'Monuments',
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
            name: 'Monuments',
            isLink: false
          }
        ]
      }
    }
    this.getMon()
    this.getType()
    this.getZone()
    this.getVille()
    this.getCreator()
    navigator.geolocation.getCurrentPosition(position => {
        this.center= {
            lat:position.coords.latitude,
            lng:position.coords.longitude
        }

        this.destination = {
            lat: 31.6237776,
            lng: -7.9941399
        }
        this.source = {
            lat : 37.42206,
            lng:-7.9941399
        }
        this.map = new google.maps.Map(document.getElementById("map-canvas"),{
            ...this.options,
            center:this.center
        })

        let markerStart = new google.maps.Marker({
            position: this.center,


            map: this.map
        })
        let markerDestination = new google.maps.Marker({
            position: this.destination,
            map: this.map
        })
        var destinationmarker =
        this.ds = new google.maps.DirectionsService()
        this.dr = new google.maps.DirectionsRenderer({
            map:null,
            suppressMarkers:true
        })

        let request= {
            origin:this.source,
            destination:this.destination,
            travelMode: google.maps.TravelMode.DRIVING
        }
        this.ds.route(request,(response,status)=>{
            this.dr.setOptions({
                suppressPolylines:false,
                map:this.map
            });
            if(status == google.maps.DirectionsStatus.OK){
                this.dr.setDirections(response);
            }
        })



    })

      this.service.getLocationService().then(resp=>{

          this.markerCentere.lat =  resp.lat
          this.markerCentere.lng = resp.lng

          this.markerse.push(
              {
                  position: {
                      lat: resp.lat,
                      lng: resp.lng
                  },
                  options: {
                      draggable: false
                  },
                  label: "Current location"
              }
          )
      })
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
  getType(){

    this.service.getType()
        .subscribe((data:any) => {
              console.log(data)
              this.types = data
            },
            error => {
              console.log(error)
            }
        )
  }
  getVille(){

    this.service.getVille()
        .subscribe((data:any) => {
              console.log(data)
              this.villes = data
            },
            error => {
              console.log(error)
            }
        )
  }
  getZone(){

    this.service.getZone()
        .subscribe((data:any) => {
              console.log(data)
              this.allzone = data
            },
            error => {
              console.log(error)
            }
        )
  }
  getCreator(){

    this.service.getCreator()
        .subscribe((data:any) => {
              console.log(data)
              this.creators = data
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
    this.monument = m;
    this.modalService.open(modalD, {
      centered: true,
      size: 'lg'
    });
  }

    search() {
      console.log("search")
        let zone = document.getElementById("zone") as HTMLSelectElement
        let ville = document.getElementById("ville") as HTMLSelectElement
        let type = document.getElementById("type") as HTMLSelectElement
        let creator = document.getElementById("creator") as HTMLSelectElement
        let date = document.getElementById("date") as HTMLInputElement
        let nom = document.getElementById("nom") as HTMLInputElement


        let SearchMonument = {
          "zone":zone.value,
                "ville":ville.value,
                "type":type.value,
                "creator":creator.value,
                "nom":nom.value
        }
        console.log(SearchMonument)

        this.service.searchMon(SearchMonument)
            .subscribe((data:any) => {
                    console.log(data)
                    this.monuments = data
                    this.markerse = []
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

    selectZone(x) {
        this.zones = this.allzone.filter(zone=>{
            return x.target.value === zone.ville.nom
        })
        console.log(this.zones)
    }



    @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

    public markerZoom = 12;
    public streetZoom = 12;
    public markerCentere: google.maps.LatLngLiteral = {
        lat: 31.6239008,
        lng: -7.993831
    };

    public markerse: object[] = [

    ];

    openInfoe(marker: MapMarker) {
        this.infoWindow.open(marker);
    }

    reset() {
        this.getMon()
    }
}
