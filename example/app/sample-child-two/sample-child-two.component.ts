import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApplyDestroyMixin, unsubscribe } from '../../../src';

class SampleChildTwo {

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
}

@Component({
    selector: 'app-sample-child-two',
    templateUrl: './sample-child-two.component.html',
    styleUrls: ['./sample-child-two.component.scss']
})
export class SampleChildTwoComponent extends ApplyDestroyMixin(SampleChildTwo) {}
