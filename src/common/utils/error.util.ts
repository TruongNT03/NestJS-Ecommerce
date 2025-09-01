import * as _ from 'lodash';

export const convertErrorToObject = (error: any) => {
  if (!error) {
    return null;
  }
  return _.pick(error, Object.getOwnPropertyNames(error));
};
