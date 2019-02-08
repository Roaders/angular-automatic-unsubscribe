import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-sample-child',
    templateUrl: './sample-child.component.html',
    styleUrls: ['./sample-child.component.scss']
})
export class SampleChildComponent {

    private _ticks: Observable<number>

    public get ticks(): Observable<number> {
        return this._ticks;
    }

    public set ticks(value: Observable<number>){
        this._ticks = value;

        this._ticks.subscribe(value => this.tick = value)
    }

    public tick: number;

}
