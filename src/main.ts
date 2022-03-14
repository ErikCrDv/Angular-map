import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl';
Mapboxgl.accessToken = 'pk.eyJ1IjoiZXJpa2NyZHYiLCJhIjoiY2t5YzV4NWZhMDd4aTJxbW80aTkyM3RkZCJ9.XQxYn91irw41eSx7IbGLMA';


if( !navigator.geolocation ){
  alert('El navegador no soporta la Geolocalizacion');
  throw new Error('El navegador no soporta la Geolocalizacion');
} 


if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
