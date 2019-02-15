
import { ApplyDestroyMixin } from '../../src/mixin/on-destroy-mixin';
import { OnDestroy } from '@angular/core';

describe('on-destroy-mixin', () => {

    it('should create observable on mixed in class', () => {

        class Empty {}
        class Mixed extends ApplyDestroyMixin(Empty) {}

        const instance = new Mixed();

        expect(instance.destroyStream).toBeDefined();
    });

    it('should create nDestroy function on mixed in class', () => {

        class Empty {}
        class Mixed extends ApplyDestroyMixin(Empty) {}

        const instance = new Mixed();

        expect(instance.ngOnDestroy).toBeDefined();
    });

    it('destroyStream should pass a value when ngOnDestroy called', () => {
        class Empty {}
        class Mixed extends ApplyDestroyMixin(Empty) {}

        const instance = new Mixed();

        const destroyValues: boolean[] = [];
        let complete = false;

        instance.destroyStream.subscribe(
            destroyed => destroyValues.push(destroyed),
            undefined,
            () => complete = true
        );

        expect(destroyValues).toEqual([]);
        expect(complete).toBeFalsy();

        instance.ngOnDestroy();

        expect(destroyValues).toEqual([true]);
        expect(complete).toBeTruthy();
    });

    it('when ngOnDestroy exists on super class it should be called', () => {
        let superDestroyCalled = false;

        class Destroyable implements OnDestroy {
            public ngOnDestroy() {
                superDestroyCalled = true;
            }
        }
        class Mixed extends ApplyDestroyMixin(Destroyable) {}

        const instance = new Mixed();

        instance.ngOnDestroy();

        expect(superDestroyCalled).toBeTruthy();
    });

});
