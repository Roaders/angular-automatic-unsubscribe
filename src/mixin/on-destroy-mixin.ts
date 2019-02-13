
import { Subject } from 'rxjs';

export class OnDestroyMixin {

    public sampleProp = 'Hello from mixin';

    private _destroyStream!: Subject<boolean>;

    public get destroyStream(): Subject<boolean> {
        if (this._destroyStream == null) {
            this._destroyStream = new Subject<boolean>();
        }

        return this._destroyStream;
    }

    // tslint:disable-next-line: use-life-cycle-interface
    public ngOnDestroy(): void {
        console.log(`on destroy from mixin`);

        this.destroyStream.next();
        this.destroyStream.complete();
    }
}
