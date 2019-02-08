import { Component, ComponentFactory, ComponentFactoryResolver, Injector, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { SampleChildComponent } from '../sample-child/sample-child.component';

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
  }

  @ViewChild('childContainer', { read: ViewContainerRef })
  entry: ViewContainerRef;

  public children: ComponentRef<SampleChildComponent>[] = [];

  public addChild(){
      this.children.push(this.entry.createComponent(this.factory));
  }

  public removeChild(){
      this.entry.remove();
  }
}
