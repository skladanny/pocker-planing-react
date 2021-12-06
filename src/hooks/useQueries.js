import { useQuery } from 'react-query';

import { API } from '../api';

export const useGetMeetingsQuery = () => {
  return useQuery('meetings', API.getMeetings);
};

export const useGetProfileQuery = () => {
  return useQuery('profile', API.getProfile);
};

export const useGetTemplatesQuery = () => {
  return useQuery('templates', API.getTemplates);
};
