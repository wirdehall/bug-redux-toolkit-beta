import { createSlice, PayloadAction, createAction, nanoid } from '@reduxjs/toolkit';
import { NotificationState, FullNotificationActionPayload, NotificationHelperActionPayload, NotificationActionPayload } from './notification.types';

export const addSuccess = createAction('notification/addSuccess', function prepare({ notification, autoDismissInMs }: NotificationHelperActionPayload) {
  return { payload: { notificationType: 'success', notification, autoDismissInMs } };
});

export const addNotice = createAction('notification/addNotice', ({ notification, autoDismissInMs }: NotificationHelperActionPayload) => {
  return { payload: { notificationType: 'notice', notification, autoDismissInMs } };
});

export const addError = createAction('notification/addError', ({ notification, autoDismissInMs }: NotificationHelperActionPayload) => {
  return { payload: { notificationType: 'error', notification, autoDismissInMs } };
});


const initialState: NotificationState = {
  error: [],
  notice: [],
  success: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: {
      reducer: (state, { payload: { notificationType, notification, autoDismissInMs, id } }: PayloadAction<FullNotificationActionPayload>) => {
        state[notificationType].push({ notification, autoDismissInMs, id });
      },
      prepare: (payload: NotificationActionPayload) => ({ payload: { ...payload, id: nanoid() } })
    },
    dismiss: (state, { payload: { notificationType, id }}: PayloadAction<{ notificationType: keyof NotificationState; id: string }>) => {
      state[notificationType] = state[notificationType].filter((notification) => notification.id !== id);
    },
  }
})

export const { addNotification, dismiss } = notificationSlice.actions;
export default notificationSlice.reducer;
