import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor( 
    private apihttp : HttpClient,
    private api : ApiService) { }

  //Справочник 'Тип металлоискателя'
  public getTypesMetalDetectors(){
    const url = `v1/ref/types_metal_detectors`
    return this.api.get(url)
  }

  //Справочник 'Страна производитель'
  public getCountryManufactureOfMetalDetectors(){
    const url = `v1/ref/country_manufacture`
    return this.api.get(url)
  }

  //Справочник 'Статус наличия'
  public getAvailabilityOfMetalDetectors(){
    const url = `v1/ref/availability`
    return this.api.get(url)
  }
}
