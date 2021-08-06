import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {


  heroes: Hero[] = [];

  message: string[] = [];

  constructor(
              private heroService: HeroService,
              private messageService: MessageService)
              {
                this.messageService;
              }

  ngOnInit() {
    this.getHeroes();
  }

  

  getHeroes(): void {
    this.heroService.getHeroes()
                    .subscribe(heroes => this.heroes = heroes);
  }


  messageLength(){
  this.message.length;

  }

  messageClear(){
  this.messageService.clear();

  }
}
