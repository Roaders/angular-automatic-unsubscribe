import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ComponentRef, ComponentFactory, Injector, ComponentFactoryResolver } from '@angular/core';

import { AppComponent } from './app.component';
import { SampleChildOneComponent } from './sample-child-one/sample-child-one.component';
import { SampleChildTwoComponent } from './sample-child-two/sample-child-two.component';
import { SampleParentComponent } from './sample-parent/sample-parent.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleChildOneComponent,
    SampleChildTwoComponent,
    SampleParentComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [
    SampleChildOneComponent,
    SampleChildTwoComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
