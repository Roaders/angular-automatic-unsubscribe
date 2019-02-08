import { Component, ComponentFactory, ComponentFactoryResolver, Injector, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { SampleChildComponent } from '../sample-child/sample-child.component';
import { interval, Observable } from 'rxjs';
import { refCount, publish } from "rxjs/operators";

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

        this.connected = interval(500).pipe(
            publish(),
            refCount()
            );
    }

    private connected: Observable<number>;

    @ViewChild('childContainer', { read: ViewContainerRef })
    entry: ViewContainerRef;

    public children: ComponentRef<SampleChildComponent>[] = [];

    public addChild() {
        const child = this.entry.createComponent(this.factory);
        this.children.push(child);

        child.instance.ticks = this.connected;
    }

    public removeChild() {
        this.entry.remove();
    }
}
