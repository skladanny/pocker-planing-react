import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

import { API } from '../api';
import { ROUTES } from '../constants';

export const useCreateMeetingMutation = () => {
  const history = useHistory();

  return useMutation(API.createMeeting, {
    onSuccess: ({ data }) => {
      if (data.type === 'RETRO') {
        history.push(ROUTES.home);
      } else {
        history.push(ROUTES.home);
      }
    },
  });
};

export const useRemoveMeetingMutation = () => {
  const queryClient = useQueryClient();

  let meetingId = null;

  return useMutation(
    ({ id }) => {
      meetingId = id;

      return API.removeMeeting(id);
    },
    {
      onSuccess({ status }) {
        if (status === 200) {
          queryClient.setQueryData('meetings', (old) => {
            if (old) {
              old.data = old?.data?.filter(
                (meeting) => meeting.id !== meetingId,
              );
            }

            return old;
          });
        }
      },
    },
  );
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(API.updateProfile, {
    onSuccess({ data, status }) {
      if (status === 200) {
        queryClient.setQueryData('profile', (old) => {
          if (old) {
            old.data = data;
          }

          return old;
        });
      }
    },
  });
};

export const useRemoveAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(API.removeAvatar, {
    onSuccess({ status }) {
      if (status === 200) {
        queryClient.setQueryData('profile', (old) => {
          if (old) {
            old.data.avatar = null;
            old.data.contentType = null;
            old.data.fileName = null;
          }

          return old;
        });
      }
    },
  });
};

export const useImportFromMeetingMutation = (meetingId) => {
  const queryClient = useQueryClient();

  return useMutation(API.importFromMeeting, {
    onSuccess({ status, data }) {
      if (status === 200) {
        queryClient.setQueryData(['issues', meetingId], (old) => {
          if (old) {
            old.data.push(...data);
          }

          return old;
        });
      }
    },
  });
};

export const useCreateParticipantMutation = (id) => {
  return useMutation(() => API.createParticipant(id));
};

export const useUpdateMeetingMutation = (id) => {
  return useMutation((data) => API.updateMeeting(id, data));
};
export const useSaveTemplatesMutation = () => {
  return useMutation(['templates'], API.saveTemplates);
};

export const useCreateStickerMutation = () => {
  return useMutation(['stickers'], API.createSticker);
};

export const useUpdateStickerMutation = (id) => {
  return useMutation(['stickers'], (data) => API.updateSticker(id, data));
};

export const useRemoveStickerMutation = (id) => {
  return useMutation(['removeSticker'], () => API.deleteSticker(id));
};
