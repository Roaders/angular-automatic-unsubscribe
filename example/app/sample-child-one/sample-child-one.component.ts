import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApplyDestroyMixin, unsubscribe } from '../../../src';

class SampleChildOne implements OnDestroy {

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

    public readonly destroyStream!: Observable<boolean>;

    public name = 'sampleChild';

    public tick = 0;

    public ngOnDestroy(): void {
        console.log(`on destroy from child '${this.name}' (<- testing 'this')`);
    }
}

@Component({
    selector: 'app-sample-child-one',
    templateUrl: './sample-child-one.component.html',
    styleUrls: ['./sample-child-one.component.scss']
})
export class SampleChildOneComponent extends ApplyDestroyMixin(SampleChildOne) {}
