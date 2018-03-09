export interface Notification {
  ID?: number;
  NotificationTypeID: number;
  Description?: string;
  Date?: Date;
  ElementID?: number;
}

export interface NotificationType {
  ID?: number;
  Name?: number;
  URL?: string;
  Icon?: string;
}
