declare module "*.scss" {
    const content: { [className: string]: string };
    export default content;
}

declare module "*.css" {
    const content: { [className: string]: string };
    export default content;
}

declare module "*/notes.json" {
    import {INote} from "./types/INote";
    const content: INote[];
    export default content;
}