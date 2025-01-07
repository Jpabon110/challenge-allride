import {  Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { Coordinates } from '../interfaces/Coordinates';
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';

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
  addressRecibed: Coordinates[] = [];

  constructor(
    private socketService: SocketService,
    private dialog: MatDialog 
  ) {}

  ngOnInit() {
    this.socketService.getNewLocation().subscribe((location: Coordinates) => {
      this.center = { lat: location.lat, lng: location.lng };
      this.addressRecibed.push(location);
      this.markers.push({ lat: location.lat, lng: location.lng });
    });
  }

  setCenter(location: { lat: number, lng: number }) {
    this.center = { lat: location.lat, lng: location.lng };
  }

  openInstructionsModal(): void {
    this.dialog.open(InstrucctionsDialogComponent, {
      width: '400px',
    });
  }

}

@Component({
  selector: 'instrucctions-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  styleUrls: ['./instrucctions.component.scss'],
  templateUrl: './instrucctions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstrucctionsDialogComponent {
  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(InstrucctionsDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
