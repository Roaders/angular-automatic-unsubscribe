import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { SampleChildComponent } from '../sample-child/sample-child.component';
import { interval, Observable } from 'rxjs';
import { refCount, publish } from 'rxjs/operators';

@Component({
    selector: 'app-sample-parent',
    templateUrl: './sample-parent.component.html',
    styleUrls: ['./sample-parent.component.scss']
})
export class SampleParentComponent {

    private factory: ComponentFactory<SampleChildComponent>;

    constructor(
        factoryResolver: ComponentFactoryResolver,
    ) {
        this.factory = factoryResolver.resolveComponentFactory(SampleChildComponent);

        this.ticks = new Observable<number>(observer => {
            console.log('subscribing');
            this.subscribed = true;
            const subscription = interval(500)
                .subscribe(observer);

            return () => {
                this.subscribed = false;
                subscription.unsubscribe();
                console.log('unsubscribed');
            };
        }).pipe(
            publish(),
            refCount()
        );
    }

    public subscribed = false;

    private ticks: Observable<number>;

    @ViewChild('childContainer', { read: ViewContainerRef })
    entry!: ViewContainerRef;

    public children: ComponentRef<SampleChildComponent>[] = [];

    public addChild() {
        const child = this.entry.createComponent(this.factory);
        this.children.push(child);

        child.instance.ticks = this.ticks;
    }

    public removeChild() {
        this.entry.remove();
    }
}
