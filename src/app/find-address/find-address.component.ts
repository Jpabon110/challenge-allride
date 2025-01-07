import { AfterViewInit, Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { GeocodingService } from '../services/geocoding.service';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'find-address',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule, GoogleMapsModule],
  templateUrl: './find-address.component.html',
  styleUrls: ['./find-address.component.scss']
})
export class FindAddressComponent implements AfterViewInit , OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef | undefined;

  address: string = '';
  center: google.maps.LatLngLiteral = { lat: -33.4489, lng: -70.6693 };
  addressSended: string[] = [];
  zoom = 15;

  constructor(private geocodingService: GeocodingService, private socketService: SocketService) {}

  ngAfterViewInit() {
    if (this.searchInput && this.searchInput.nativeElement) {
      const autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement);
      autocomplete.addListener("place_changed", () => this.onPlaceChanged(autocomplete));
    }
  }

  onPlaceChanged(autocomplete: google.maps.places.Autocomplete) {
    autocomplete.getPlace();
  }

  searchAddress() {
    this.geocodingService.getCoordinates(this.address)
      .subscribe((response) => {
        if (response.results && response.results.length > 0) {
          const location = response.results[0].geometry.location;
          this.addressSended.push(response.results[0].formatted_address)
          this.socketService.sendLocation({ lat: location.lat, lng: location.lng });
        } else {
          alert('No se encontraron resultados para la dirección ingresada.');
        }
      });
  }

  openInNewWindow() {
    const url = 'http://127.0.0.1:4200/maps';
    const windowFeatures = 'width=800,height=600,resizable,scrollbars,status';
    window.open(url, '_blank', windowFeatures);
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
