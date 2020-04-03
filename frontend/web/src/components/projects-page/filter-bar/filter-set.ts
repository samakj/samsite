export class FilterSet<T = any> extends Set {
    constructor(values?: T[] | null) {
        super(values);
    }

    hasAny(values: Iterable<any>): boolean {
        for (const value of values) {
            if (this.has(value)) return true;
        }
        return false;
    }

    stateChangeAdd(value: T): FilterSet<T> {
        if (this.has(value)) return this;

        return new FilterSet([...this, value]);
    }

    stateChangeDelete(value: T): FilterSet<T> {
        if (!this.has(value)) return this;

        const f = new FilterSet([...this]);
        f.delete(value);
        return f;
    }
}
