import { Component, OnInit } from '@angular/core';

import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero/hero.service';
import { MessageService } from '../../services/message/message.service';

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
        private messageService: MessageService,
    ){
        this.messageService;
    }

    ngOnInit() {
        this.getHeroes();
    }



    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes);
    }


    messageLength() {
        this.message.length;
    }

    messageClear() {
        this.messageService.clear();
    }

    addHeroName(name:string):void {
        name = name.trim();
        if(!name) { return; }
            this.heroService.addHero({name} as Hero)
                            .subscribe(hero => {
                                this.heroes.push(hero);
                            });
    }

    delete(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroService.deleteHero(hero.id).subscribe();
    }

}




