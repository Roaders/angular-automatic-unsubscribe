import { Component } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { OnDestroyMixin } from '../mixin/on-destroy-mixin';
import { Mixin } from '../decorators/mixin';
import { unsubscribe } from "../operators/unsubscribe";

@Component({
    selector: 'app-sample-child',
    templateUrl: './sample-child.component.html',
    styleUrls: ['./sample-child.component.scss']
})
@Mixin([OnDestroyMixin])
export class SampleChildComponent {

    public readonly destroyStream!: Subject<boolean>;

    public set ticks(value: Observable<number>) {
        value.pipe(
            unsubscribe(this.destroyStream),
        )
        .subscribe(
            tickValue => this.tick = tickValue, 
            undefined, 
            () => console.log(`child complete`)
        );
    }

    public name = "sampleChild";

    public ngOnDestroy(): void {
        console.log(`on destroy from child '${this.name}' (<- testing 'this')`);

    }

    public tick: number = 0;
}