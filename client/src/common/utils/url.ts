import { SERVER_BASE_URL } from 'common/constants';

export const addServerUrl = (path: string): string => {
  return `${SERVER_BASE_URL}/${path}`;
};
