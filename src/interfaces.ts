export interface Data {
    content: string;
    thumbnail: string;
    heading: string;
    subheading: string;
}

export interface ImageProps {
    url?: string;
    height?: number;
    width?: number;
    size?: number;
    duration?: number;
    data: Object;
}