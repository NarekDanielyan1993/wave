export type NotificationMessageTypesUnion =
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
export type NotificationTypes = {
    message: string;
    type: NotificationMessageTypesUnion;
};
