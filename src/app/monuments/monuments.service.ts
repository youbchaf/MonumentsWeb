import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MonumentsService {

  constructor(private http:HttpClient) { }

  getMon() {
    return this.http.get(environment.apiUrl+`/MonumentProjetWS/Monument`)
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
}
