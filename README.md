# angular-rxjs-automatic-unsubscribe

[![Build Status](https://travis-ci.com/Roaders/angular-automatic-unsubscribe.svg?branch=master)](https://travis-ci.com/Roaders/angular-automatic-unsubscribe)

A utility package to automatically unsubscribe from rxjs streams when an angular component is disposed of.

## Features

* Component mixin implements the angular `OnDestroy` interface with an `ngOnDestroy` function - no need to specify or implement yourself
* if you have implemented `ngOnDestroy` it is still called by the mixin as `super.ngOnDestroy()`.
* Observable `unsubscribe` pipe operator means that no rxjs classes are altered or augmented
* `unsubscribe` operator unsubscribes from observable source when compnent is destroyed.
* code fully unit tested and example app demonstrates usage

## Usage

```
npm install angular-rxjs-automatic-unsubscribe
```

### Sample Component

```

import { ApplyDestroyMixin, unsubscribe } from 'angular-rxjs-automatic-unsubscribe';

class ComponentBase {

    constructor(){
        interval(500).pipe(
            unsubscribe(this.destroyStream),
        )
        .subscribe();
    }
    
    public readonly destroyStream!: Observable<boolean>; // set by mixin. Use ! to avoid strict property initialisation errors.
}

@Component({
    selector: 'sample-component',
    templateUrl: './sample-component.html',
    styleUrls: ['./sample-component.scss']
})
export class SampleComponent extends ApplyDestroyMixin(ComponentBase) {}

```

## Example App
To run the example app:

```
git clone https://github.com/Roaders/angular-automatic-unsubscribe.git
cd angular-automatic-unsubscribe
npm install
npm start
```

## Tests
To run unit tests:
```
git clone https://github.com/Roaders/angular-automatic-unsubscribe.git
cd angular-automatic-unsubscribe
npm install
npm test
```
