
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

type Constructor<T = {}> = new (...args: any[]) => T;

interface OptionalDestroy {
    ngOnDestroy?(): void;
}

export function ApplyDestroyMixin<TBase extends Constructor<OptionalDestroy>>(Base: TBase) {
    return class extends Base implements OnDestroy {

        public readonly destroyStream = new Subject<boolean>();

        public ngOnDestroy(): void {
            if (super.ngOnDestroy != null) {
                super.ngOnDestroy();
            }

            this.destroyStream.next(true);
            this.destroyStream.complete();
        }
    };
}
