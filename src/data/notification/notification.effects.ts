import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { addError, addNotice, addNotification, addSuccess, dismiss } from './notification.slice'

const notificationEffects = createListenerMiddleware()

notificationEffects.startListening({
  matcher: isAnyOf(addNotification),
  effect: async (action, listenerApi) => {
    const { autoDismissInMs, notificationType, id } = action.payload;
    if(typeof autoDismissInMs !== 'undefined') {
      setTimeout(() => listenerApi.dispatch(dismiss({ notificationType, id })), autoDismissInMs);
    }
  },
});

notificationEffects.startListening({
  matcher: isAnyOf(addSuccess, addNotice, addError),
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(addNotification(action.payload));
  },
});

export default notificationEffects;
