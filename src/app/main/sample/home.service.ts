import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  getMon() {
    return this.http.get(environment.apiUrl+`/MonumentProjetWS/Monument`)
  }

  getPhoto() {
    return this.http.get(environment.apiUrl+`/MonumentProjetWS/photos`)
  }
  getVille() {
    return this.http.get(environment.apiUrl+`/MonumentProjetWS/villes`)
  }
  getZone() {
    return this.http.get(environment.apiUrl+`/MonumentProjetWS/zones`)
  }
  getCreator() {
    return this.http.get(environment.apiUrl+`/MonumentProjetWS/creator`)
  }
  getType() {
    return this.http.get(environment.apiUrl+`/MonumentProjetWS/type`)
  }

  addComment(param) {
    let options = {
      headers: new HttpHeaders().set(
          'Content-Type',
          'application/json'
      )
    };
    return this.http.post(environment.apiUrl+`/MonumentProjetWS/commentaire/add`,param,options)
  }
  getComment() {
    return this.http.get(environment.apiUrl+`/MonumentProjetWS/Commentaire`)
  }
  getUser() {
    return this.http.get(environment.apiUrl+`/MonumentProjetWS/users`)
  }

  searchMon(param) {
    let data = {
      params: {
        'nom': param.nom,
        'ville': param.ville,
        'zone':param.zone,
        'creator':param.creator,
        'type':param.type,
        'date':param.date
      }
    }

    const body = new FormData();
    body.append('nom', param.nom);
    body.append('ville', param.ville);
    body.append('zone', param.zone);
    body.append('creator', param.creator);
    body.append('type', param.type);
    body.append('date', param.date);

    let options = {
      headers: new HttpHeaders().set(
          'Content-Type',
          'application/json'
      )
    };
    return this.http.post(environment.apiUrl+`/MonumentProjetWS/Monument/search`,param,options)
  }



  getLocationService():Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({lng: resp.coords.longitude, lat: resp.coords.latitude})
      })
    })
  }
}
