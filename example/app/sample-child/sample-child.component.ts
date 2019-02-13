import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OnDestroyMixin, Mixin, unsubscribe } from '../../../src';

@Component({
    selector: 'app-sample-child',
    templateUrl: './sample-child.component.html',
    styleUrls: ['./sample-child.component.scss']
})
@Mixin([OnDestroyMixin])
export class SampleChildComponent implements OnDestroy {

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

    public readonly destroyStream!: Subject<boolean>;

    public name = 'sampleChild';

    public tick = 0;

    public ngOnDestroy(): void {
        console.log(`on destroy from child '${this.name}' (<- testing 'this')`);
    }
}
