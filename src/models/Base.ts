import { Record } from 'immutable';

export const Base = <TClass>(defaultValues: TClass) =>
  class extends Record(defaultValues) {
    constructor(params: Partial<TClass> = defaultValues) {
      params ? super(params) : super();
    }

    with(values: Partial<TClass>) {
      return this.merge(values) as this;
    }
  };
