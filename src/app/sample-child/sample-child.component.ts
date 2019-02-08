import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-sample-child',
    templateUrl: './sample-child.component.html',
    styleUrls: ['./sample-child.component.scss']
})
export class SampleChildComponent implements OnDestroy {

    private subscription: Subscription;

    private _ticks: Observable<number>

    public get ticks(): Observable<number> {
        return this._ticks;
    }

    public set ticks(value: Observable<number>){
        this._ticks = value;

        this.subscription = this._ticks.subscribe(value => this.tick = value)
    }

    public tick: number;

    public ngOnDestroy(){
        console.log(`destroy child`)
        this.subscription.unsubscribe();
    }

}
