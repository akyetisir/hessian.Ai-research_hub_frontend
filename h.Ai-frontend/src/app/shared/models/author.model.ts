
// Interface for Author model
export interface Author {
    authorId: string;
    name: string;
    h_index: number;
    citations: number;
    highly_influential_citations: number;
    image_path: string;
  }