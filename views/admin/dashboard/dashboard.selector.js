import { createSelector } from 'reselect';
import { get } from 'lodash';

const accountSelector = createSelector(
  (state) => { return get(state, 'auth.account'); },
  (account) => { return account; },
);

const dashboardSelector = createSelector(
  (state) => { return get(state, 'dashboardReducer'); },
  (widget) => { return widget; },
);

export { accountSelector, dashboardSelector };
