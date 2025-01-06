
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
<<<<<<< Updated upstream
    pdfUrl?: string;
    source?: string;
    citationCount?: number;
}
=======
    pdfUrl: string;
    source: string;
    citationCount: number;
}
>>>>>>> Stashed changes
