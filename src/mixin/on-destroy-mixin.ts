
import { Subject } from 'rxjs';

type Constructor<T = {}> = new (...args: any[]) => T;

export function ApplyDestroyMixin<TBase extends Constructor>(Base: TBase) {
    return class extends Base {

        public readonly destroyStream = new Subject<boolean>();

        public ngOnDestroy(): void {
            console.log(`on destroy from mixin`);

            this.destroyStream.next();
            this.destroyStream.complete();
        }
    };
}
