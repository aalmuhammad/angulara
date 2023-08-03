import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { PopupfilmComponent } from 'src/app/film/popupfilm/popupfilm.component';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  filmData: any
  dataFilm : any
  displayedColumns = ['film_id', 'title', 'actors']

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getAllFilms();
  }

  getAllFilms() {
    this.apiService.getActorByFilm().subscribe(
      (data) => {
        this.filmData = this.combineFilmWithActors(data);
        this.dataFilm = this.filmData

        this.dataSource = new MatTableDataSource<any>(this.dataFilm);
        this.dataSource.paginator = this.paginator;
        

        console.log(data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  PopupFilm(action: string, filmData?: any) {
    const dialogRef = this.dialog.open(PopupfilmComponent, {
      width: '60%',
      height: '400px',
      data: {
        action: action,
        filmData: filmData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'Add') {
          this.addFilm(result.filmData);
        } else if (result.action === 'Edit') {
          this.editFilm(result.filmData);
        } else if (result.action === 'Delete') {
          this.deleteFilm(result.filmData.film_id);
        }
      }
    });
  }

  addFilm(filmData: any) {
    this.apiService.insertFilm(filmData).subscribe(
      (response) => {
        console.log('Data added successfully: ', response);
        this.getAllFilms();
      },
      (error) => {
        console.error('Error adding data: ', error);
      }
    );
  }

  editFilm(filmData: any) {
    this.apiService.updateFilm(filmData).subscribe(
      (response) => {
        console.log('Data updated successfully: ', response);
        this.getAllFilms();
      },
      (error) => {
        console.error('Error updating data: ', error);
      }
    );
  }

  deleteFilm(filmId: number) {
    this.apiService.deleteFilm(filmId).subscribe(
      (response) => {
        console.log('Data deleted successfully: ', response);
        this.getAllFilms();
      },
      (error) => {
        console.error('Error deleting data: ', error);
      }
    );
  }

  combineFilmWithActors(data: any): any[] {
    const films = data[0];
    const actors = data[1];
    const combinedData = films.map((film: any) => {
      const actorList = actors
        .filter((actor: any) => actor.film_id === film.film_id)
        .map((actor: any) => `${actor.first_name} ${actor.last_name}`);
      film.actors = actorList.join(', ');
      return film;
    });

    return combinedData;
  }
}