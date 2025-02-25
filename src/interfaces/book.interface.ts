export interface Book {
  id?: number;
  title: string;
  author: string;
  author_two?: string;
  author_three?: string;
  publisher: string;
  collection: number;
  copies: number;
  available: boolean;
}
