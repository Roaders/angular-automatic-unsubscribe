import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ComponentRef, ComponentFactory, Injector, ComponentFactoryResolver } from '@angular/core';

import { AppComponent } from './app.component';
import { SampleChildComponent } from './sample-child/sample-child.component';
import { SampleParentComponent } from './sample-parent/sample-parent.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleChildComponent,
    SampleParentComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [
      SampleChildComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
