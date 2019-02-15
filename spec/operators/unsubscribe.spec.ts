
import { unsubscribe } from '../../src/operators/unsubscribe';
import { Subject, Observable, observable, Observer } from 'rxjs';
import { tap } from 'rxjs/operators';

describe('unsubscribe operator', () => {

    let source: Subject<string>;
    let unsubscribeSource: Subject<boolean>;

    beforeEach(() => {
        source = new Subject<string>();
        unsubscribeSource = new Subject<boolean>();
    });

    describe('should maintain normal operation', () => {

        it('should pass items to next operator', () => {
            const tapItems: string[] = [];
            const subscribeItems: string[] = [];

            source.pipe(
                unsubscribe(unsubscribeSource),
                tap(item => tapItems.push(item))
            ).subscribe(item => subscribeItems.push(item));

            expect(tapItems).toEqual([]);
            expect(subscribeItems).toEqual([]);

            source.next('one');

            expect(tapItems).toEqual(['one']);
            expect(subscribeItems).toEqual(['one']);

            source.next('two');

            expect(tapItems).toEqual(['one', 'two']);
            expect(subscribeItems).toEqual(['one', 'two']);
        });

        it('should pass errors to next operator', () => {

            const tapErrors: Error[] = [];
            const subscribeErrors: Error[] = [];

            source.pipe(
                unsubscribe(unsubscribeSource),
                tap(undefined, error => tapErrors.push(error))
            ).subscribe(undefined, error => subscribeErrors.push(error));

            expect(tapErrors).toEqual([]);
            expect(subscribeErrors).toEqual([]);

            source.error(new Error('something bad happened'));

            expect(tapErrors).toEqual([new Error('something bad happened')]);
            expect(subscribeErrors).toEqual([new Error('something bad happened')]);
        });

        it('should pass complete to next operator', () => {

            let tapComplete = false;
            let subscribeComplete = false;

            source.pipe(
                unsubscribe(unsubscribeSource),
                tap(undefined, undefined, () => tapComplete = true)
            ).subscribe(undefined, undefined, () => subscribeComplete = true);

            expect(tapComplete).toBeFalsy();
            expect(subscribeComplete).toBeFalsy();

            source.complete();

            expect(tapComplete).toBeTruthy();
            expect(subscribeComplete).toBeTruthy();
        });
    });

    describe('on unsubscribe', () => {

        it('should unsubscribe from the source observable', () => {
            let sourceUnsubscribed = false;

            new Observable<string>(observer => {
                return () => {
                    sourceUnsubscribed = true;
                    return source.subscribe(observer);
                };
            }).pipe(
                unsubscribe(unsubscribeSource),
            ).subscribe();

            expect(sourceUnsubscribed).toBeFalsy();

            unsubscribeSource.next(true);

            expect(sourceUnsubscribed).toBeTruthy();

        });

        it('should complete downstream observables', () => {
            let tapComplete = false;
            let subscribeComplete = false;

            source.pipe(
                unsubscribe(unsubscribeSource),
                tap(undefined, undefined, () => tapComplete = true)
            ).subscribe(undefined, undefined, () => subscribeComplete = true);

            expect(tapComplete).toBeFalsy();
            expect(subscribeComplete).toBeFalsy();

            unsubscribeSource.next(true);

            expect(tapComplete).toBeTruthy();
            expect(subscribeComplete).toBeTruthy();
        });

    });

});
