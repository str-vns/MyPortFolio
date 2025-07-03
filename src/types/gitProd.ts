export interface gitProd {
    title: string;
    desc: string;
    gitUrl: string;
    tools: string[];
    image: string[];
    planguages: string[];
    features: string[];
    category: string;
    favorite: boolean;
}

export type getGitProd = {
    title: string;
    description: string;
    gitUrl: string;
    tools: string[];
    images: images[];
    planguages: string[];
    features: string[];
    category: string;
    favorite: boolean;
}

export interface images {
    public_id: string;
    url: string;
    original_name: string;
}