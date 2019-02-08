import { Component, ComponentFactory, ComponentFactoryResolver, Injector, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { SampleChildComponent } from '../sample-child/sample-child.component';
import { Observable, defer, interval } from 'rxjs';
import { shareReplay } from "rxjs/operators"

@Component({
  selector: 'app-sample-parent',
  templateUrl: './sample-parent.component.html',
  styleUrls: ['./sample-parent.component.scss']
})
export class SampleParentComponent {

  private factory: ComponentFactory<SampleChildComponent>;

  constructor(
      factoryResolver: ComponentFactoryResolver,
      ){
        this.factory = factoryResolver.resolveComponentFactory(SampleChildComponent);

        this.ticks = defer(() => {
            return interval(500)
        }).pipe(
            shareReplay()
        );
  }

  private ticks: Observable<number>;

  @ViewChild('childContainer', { read: ViewContainerRef })
  entry: ViewContainerRef;

  public children: ComponentRef<SampleChildComponent>[] = [];

  public addChild(){
      const child = this.entry.createComponent(this.factory);
      this.children.push(child);

      child.instance.ticks = this.ticks;
  }

  public removeChild(){
      this.entry.remove();
  }
}
