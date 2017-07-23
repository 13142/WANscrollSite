declare interface jBoxSettings {
    attach?: string | object,
    content?: string | object,
    title?: string,
    trigger?: string,
    getTitle?: string,
    getContent?: string,
    position?: { x: string, y: string }
    outside?: string;
    adjustPosition?: boolean;
    adjustTracker?: boolean;
    pointer?: string;
    animation?: string;
    onCreated?: Function;
    onOpen?: Function;
    onClose?: Function;
}
declare class jBox {
    constructor(type: string, settings?: jBoxSettings);

    open(): jBox;

    close(): jBox;

    toggle(): jBox;

    setTitle(title: string): jBox;

    setContent(content: string): jBox;

}