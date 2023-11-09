export type NotificationHelperActionPayload = Readonly<{
  notification: string;
  autoDismissInMs?: number;
}>;

export type NotificationActionPayload = NotificationHelperActionPayload & Readonly<{
  notificationType: NotificationTypes;
}>;

export type FullNotificationActionPayload = NotificationActionPayload & Readonly<{
  id: string;
}>;

export type Notification = Readonly<{
  id: string;
  notification: string;
  autoDismissInMs?: number;
}>;

export type NotificationState = Readonly<{
  error: ReadonlyArray<Notification>;
  notice: ReadonlyArray<Notification>;
  success: ReadonlyArray<Notification>;
}>;

export type NotificationTypes = keyof NotificationState;
