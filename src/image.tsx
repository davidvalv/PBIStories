import * as React from "react";
import Stories from 'react-insta-stories';
import { ImageProps } from "./interfaces";
import { Story } from "react-insta-stories/dist/interfaces";
import { initialData } from "./data";


export const initialState: ImageProps = {
    height: 720,
    width: 1280,
    duration: 3000,
    data: [initialData]
}

export class ImageComponent extends React.Component<{}> {
    private static updateCallback: (data: object) => void = null;

    public static update(newState: ImageProps) {
        if (typeof ImageComponent.updateCallback === 'function') {
            ImageComponent.updateCallback(newState);
        }
    }

    public state: ImageProps = initialState;

    constructor(props: any) {
        super(props);
        this.state = initialState;
    }

    public componentDidMount() {
        ImageComponent.updateCallback = (newState: ImageProps): void => {
            this.setState(newState);
        };
    }

    public componentWillUnmount() {
        ImageComponent.updateCallback = null;
    }

    render() {
        return (
            <div>
                <App
                    data={this.state.data}
                    height={this.state.height}
                    width={this.state.width}
                    duration={this.state.duration}
                />
            </div>
        )
    }
}

const App: React.FunctionComponent<ImageProps> = (props) => {

    const fillStories = (data) => {

        const stories: Story[] = []

        Object.keys(data)?.map((key) => {

            stories.push({
                "header":
                {
                    heading: data[key]["heading"],
                    subheading: data[key]["subheading"],
                    profileImage: data[key]["thumbnail"]
                },
                "url": data[key]["content"]
            })
        }
        )
        return stories
    }

    const storiesFinal = fillStories(props.data)

    return (
        <>
            <Stories
                stories={storiesFinal}
                defaultInterval={props.duration}
                width={props.width}
                height={props.height}
                loop={true}
            />

        </>
    )

};