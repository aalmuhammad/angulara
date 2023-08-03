import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';


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
      });}
      
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