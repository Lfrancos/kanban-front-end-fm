export interface Board {
    _id: string;
    title: string;
    statuses: string[];
}

export interface Response {
    status: string;
    data: Board[];
}

export interface Statuses {
    _id: number;
    name: string;
}

export interface BoardToDelete {
    _id: string;
    title: string;
}