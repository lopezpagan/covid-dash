import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
    public sliders: Array<any> = [];
    public cards: Array<any> = [];
    public alerts: Array<any> = [];
    showNavigationArrows = false;

    constructor(config: NgbCarouselConfig) {
        config.showNavigationArrows = this.showNavigationArrows;
    }

    ngOnInit() {

        this.alerts.push(
            {
                id: 1,
                type: 'message',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Voluptates est animi quibusdam praesentium quam, et perspiciatis.`,
                link: '#',
            },
        );

        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text: 'Nulla vitae elit libero, a pharetra augue mollis interdum consectetur adipiscing elit. ',
                link: '#',
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit.  ',
                link: '#',
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur consectetur adipiscing elit. ',
                link: '#',
            }
        );

        this.cards.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text: 'Nulla vitae elit libero, a pharetra augue mollis interdum consectetur adipiscing elit. ',
                link: '#',
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit.  ',
                link: '#',
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur consectetur adipiscing elit. ',
                link: '#',
            },
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'Fourth slide label',
                text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur consectetur adipiscing elit. ',
                link: '#',
            }
        );
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
