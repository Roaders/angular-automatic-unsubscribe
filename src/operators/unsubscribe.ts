import { OperatorFunction, Observable } from 'rxjs';

export function unsubscribe<T>(unsubStream: Observable<any>): OperatorFunction<T, T> {
    return (source: Observable<T>): Observable<T> => {
        return new Observable<T>( observer => {

            const subscription = source.subscribe({
                next: (value: T) => observer.next(value),
                error: (err: any) => observer.error(err),
                complete: () => observer.complete(),
              });

            unsubStream.subscribe(() => {
                subscription.unsubscribe();
                observer.complete();
            });

            return subscription;
        });
    };
}
