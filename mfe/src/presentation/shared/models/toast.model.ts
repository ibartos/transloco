export enum ToastType {
    SUCCESS,
    WARNING,
    DANGER,
    INFO,
}

export interface Toast {
    id?: string;
    type: ToastType;
    title?: string;
    message?: string;
    link?: string;
    duration?: number;
}
