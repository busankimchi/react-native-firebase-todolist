export interface Navigation {
    navigation: {
        navigate: (route: string, params?: any) => void;
        push: (route: string) => void;
        goBack: () => void;
        addListener: (focus: string, callback: () => void) => void;
    };
    route: {
        params: any;
    };
}

export type Item = {
    id: string;
    text: string;
    date: string;
    time: string;
};
