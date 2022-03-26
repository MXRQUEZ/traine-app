export interface INote {
    id: number | string,
    title: string,
    description: string,
    tags?: string[],
}