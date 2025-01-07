import {  Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule, GoogleMapsModule],
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {

  center: google.maps.LatLngLiteral = { lat: -33.4489, lng: -70.6693 };
  markers: google.maps.LatLngLiteral[] = [];
  zoom = 15;
  displayedColumns: string[] = ['postId', 'name', 'email'];

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.getNewLocation().subscribe((location: google.maps.LatLngLiteral) => {
      this.center = { lat: location.lat, lng: location.lng };
      this.markers.push(location);
    });
  }

}
