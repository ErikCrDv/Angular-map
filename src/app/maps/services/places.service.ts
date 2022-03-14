import { Injectable } from '@angular/core';
import { PlacesResponse, Feature } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [ number, number ];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapService
  ) { 
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[ number, number ]> {
    return new Promise( ( resove, reject ) => {

      navigator.geolocation.getCurrentPosition( 
        ( { coords } )=> {
          this.userLocation = [ coords.longitude, coords.latitude];
          resove( this.userLocation );
        }, 
        ( err ) =>{
          alert('No se pudo teber la geolocalozacion')
          console.log( err );
          reject();
        } 
      )

    });
  }


  getPlacesByQuery( query: string = '' ){
    if( query.length === 0 ){
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }
    if( !this.userLocation ) throw Error('No hay userLocation');
    
    this.isLoadingPlaces = true;

    return this.placesApi.get<PlacesResponse>(`/${ query }.json`, {
      params:{
        proximity: this.userLocation?.join(',')
      }
    })
      .subscribe( res => {
        this.isLoadingPlaces = false;
        this.places = res.features;
        this.mapService.createMarkersFromPlaces( this.places, this.userLocation! );
      });
  }

  deletePlaces(){
    this.places = [];
  }
}
