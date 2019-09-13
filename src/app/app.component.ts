import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {fromEvent, Observable, of, throwError} from 'rxjs';
import {exhaustMap, catchError, repeat} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('mainButton', {static: true}) mainButton: ElementRef;
    title = 'ExhaustMapProblem';

    constructor(private http: HttpClient) { }


    public ngOnInit() {
        const click$ = fromEvent(this.mainButton.nativeElement, 'click');
        click$.pipe(
            exhaustMap(() => this.getData()),
            catchError((e) => throwError(e)),
            repeat()
        ).subscribe({
            next: (data) => {
                console.log(data, 'data');
            },
            error: (message) => {
                console.log(message, 'error');
            }
        });
    }

    private getData(): Observable<any> {
        const url = 'https://jsonplaceholder.typicode.com/photos';
        // const url = 'https://jsonplaceholder.typicode.com//photos'; // Uncoment this and comment above url to get error from HTTP
        return this.http.get(url);
    }
}
