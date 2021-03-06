export interface FeatureEndpoint {
    id: string;
    path: string;
    version: string;
    altContextUrl?: string;
    ui?: {
        visible?: boolean;
        iconName?: string;
        iconInlineImage?: string;
        label?: {
            [lang: string]: string;
        }
        weight?: number;
    };
}

export interface Endpoints {
    [appInstanceName: string]: {
        [featureId: string]: FeatureEndpoint
    }
}

export interface AppEndpointsModel {

    appInstanceName: string;
    endpoints: FeatureEndpoint[];

}