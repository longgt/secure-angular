import { Observable, race, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Cache decorator
 * @param options cache options. Default is 60s.
 */
export function Cache(options: CacheOptions = { ttl: 60 }) {
  let lastCallArguments: any[] = [];
  const ttl = options.ttl * 1000;

  return (target: any, propertyKey: string, descriptor) => {
    const originalFunction = descriptor.value;

    target[`${propertyKey}_cached`] = new ReplaySubject(1, ttl);

    descriptor.value = function (...args) {
      let argsNotChanged = true;

      for (let i = 0; i < lastCallArguments.length; i++) {
        argsNotChanged = argsNotChanged && (lastCallArguments[i] === args[i]);
      }

      if (!argsNotChanged) {
        // Clear old cache before creating new one
        if (this[`${propertyKey}_cached`]) {
          const oldCached = this[`${propertyKey}_cached`] as ReplaySubject<any>;
          oldCached.complete();
          oldCached.unsubscribe();
        }
        // args change
        this[`${propertyKey}_cached`] = new ReplaySubject(1, ttl);
      }

      lastCallArguments = args;

      const req: Observable<any> = originalFunction.apply(this, args).pipe(
        tap((response) => {
          this[`${propertyKey}_cached`].next(response);
        })
      );

      // despite what the documentation says i can't find that the complete is ever called
      return race(this[`${propertyKey}_cached`], req);
    };

    return descriptor;
  };
}

export interface CacheOptions {
    /** Time to live */
  ttl: number;
}
