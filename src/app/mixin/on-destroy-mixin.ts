import { OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

export class OnDestroyMixin implements OnDestroy {

    private _destroyStream!: Subject<boolean>;

    public get destroyStream(): Subject<boolean>{
        if(this._destroyStream == null){
            this._destroyStream = new Subject<boolean>();
        }

        return this._destroyStream;
    }

    public ngOnDestroy(): void {
        this.destroyStream.next();
        this.destroyStream.complete();
    }
}