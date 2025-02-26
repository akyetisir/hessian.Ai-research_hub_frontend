
// Interface for Papers
export interface Paper {
    id: string;
    title: string;
    date: Date;
    authors: string[];
    relevance: number;
    tags: string[];
    abstract: string;
    citations: number;
    views: number;
    pdfUrl: string;
    source: string;
    content: string;
    image: string;
    is_hess_paper: string;
}