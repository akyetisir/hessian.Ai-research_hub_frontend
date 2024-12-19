
// Interface for Papers
export interface Paper {
    id: string;
    title: string;
    date: Date;
    authors: string[];
    relevance: number;
    tags: string[];
    abstract?: string;
    views: number;
    pdfUrl?: string;
    source?: string;
    citationCount?: number;
}