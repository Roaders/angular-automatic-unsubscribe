import { Component } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { OnDestroyMixin } from '../mixin/on-destroy-mixin';
import { Mixin } from '../decorators/mixin';

@Component({
    selector: 'app-sample-child',
    templateUrl: './sample-child.component.html',
    styleUrls: ['./sample-child.component.scss']
})
@Mixin([OnDestroyMixin])
export class SampleChildComponent {

    public readonly destroyStream!: Subject<boolean>;

    private _ticks: Observable<number> | undefined;

    private subscription: Subscription | undefined;

    public set ticks(value: Observable<number>) {
        this._ticks = value;

        this.subscription = this._ticks.subscribe(value => this.tick = value);

        this.destroyStream.subscribe(() => {
            if(this.subscription != null){
                this.subscription.unsubscribe();
                this.subscription = undefined;
            }
        })
    }

    public name = "sampleChild";

    public ngOnDestroy(): void {
        console.log(`on destroy from child ${this.name}`);

    }

    public tick: number = 0;
}