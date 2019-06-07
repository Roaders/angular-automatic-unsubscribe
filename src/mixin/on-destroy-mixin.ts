
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

type Constructor = new (...args: any[]) => any;

export function isOnDestroy(value: any): value is OnDestroy {
    return value != null && (value as Partial<OnDestroy>).ngOnDestroy != null;
}

export function ApplyDestroyMixin<TBase extends Constructor>(Base: TBase) {
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
