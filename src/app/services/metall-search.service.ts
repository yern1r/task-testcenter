import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MetallSearchService {

  constructor(
    private apihttp : HttpClient,
    private api : ApiService) { }

  //Изменение данных металлоискателя в таблице 'Металлоискатели'
  public changingDataInMetallSearching(
    id : number,
    brand:string,
    yearIssue:number,
    count:number,
    countryManufactureId:number,
    availabilityId:number,
    typeMetalDetectorsId:number){
    const url = `v1/data/update/${id}`
    const body = {
      brand: brand,
      yearIssue: yearIssue,
      count: count,
      countryManufactureId: countryManufactureId,
      availabilityId: availabilityId,
      typeMetalDetectorsId: typeMetalDetectorsId,
    };
    return this.api.put(url, body)
  }

  //Добавление данных металлоискателя в таблицу 'Металлоискатели'
  public addingDataInTableOfMetallSearching(
    brand:string,
    yearIssue:number,
    count:number,
    countryManufactureId:number,
    availabilityId:number,
    typeMetalDetectorsId:number
  ){
    const url = `v1/data/metal_detectors`
    const body = {
      brand: brand,
      yearIssue: yearIssue,
      count: count,
      countryManufactureId: countryManufactureId,
      availabilityId: availabilityId,
      typeMetalDetectorsId: typeMetalDetectorsId,
    };
    return this.api.post(url, body)
  }

  //Поиск металлоискателя по id
  public seacrhingInMetallSearching(id : number){
    const url = `v1/metal_detectors/${id}`
    return this.api.get(url)
  }

  //Фильтр данных списка по типу металлоискателя
  public filterDataByTypeOfMetallSearching(type : number,pageNo?:number,pageSize?:number){
    const url = `v1/metal_detectors/type/${type}?pageNo=${pageNo}&pageSize=${pageSize}`
    return this.api.get(url)
  }

  //Поиск по наименованию металлоискателя
  public findByNameOfMetallSearching(brand : number,pageNo?:number,pageSize?:number){
    const url = `v1/metal_detectors/brand/${brand}?pageNo=${pageNo}&pageSize=${pageSize}`
    return this.api.get(url)
  }

  //Удаление данных металлоискателя в таблице 'Металлоискатели'
  public deletingDataInfMetallSearching(id : number){
    const url = `v1/data/delete/${id}`
    return this.api.delete(url)
  }
}
