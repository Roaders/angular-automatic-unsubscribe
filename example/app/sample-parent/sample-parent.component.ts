import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { SampleChildOneComponent } from '../sample-child-one/sample-child-one.component';
import { interval, Observable } from 'rxjs';
import { refCount, publish } from 'rxjs/operators';
import { SampleChildTwoComponent } from '../sample-child-two/sample-child-two.component';

@Component({
    selector: 'app-sample-parent',
    templateUrl: './sample-parent.component.html',
    styleUrls: ['./sample-parent.component.scss']
})
export class SampleParentComponent {

    private factoryOne: ComponentFactory<SampleChildOneComponent>;
    private factoryTwo: ComponentFactory<SampleChildTwoComponent>;

    constructor(
        factoryResolver: ComponentFactoryResolver,
    ) {
        this.factoryOne = factoryResolver.resolveComponentFactory(SampleChildOneComponent);
        this.factoryTwo = factoryResolver.resolveComponentFactory(SampleChildTwoComponent);

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

    public children: ComponentRef<SampleChildOneComponent | SampleChildTwoComponent>[] = [];

    public addChildOne() {
        const child = this.entry.createComponent(this.factoryOne);
        this.children.push(child);

        child.instance.ticks = this.ticks;
    }
    public addChildTwo() {
        const child = this.entry.createComponent(this.factoryTwo);
        this.children.push(child);

        child.instance.ticks = this.ticks;
    }

    public removeChild() {
        this.entry.remove();
    }
}
