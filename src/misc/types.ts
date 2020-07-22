export interface Navigation {
    navigation: {
        navigate: (route: string, params?: any) => void;
        push: (route: string) => void;
        goBack: () => void;
    };
    route: {
        params: any;
    };
}

export type Item = {
    id: string;
    title: string;
    date: string;
};

