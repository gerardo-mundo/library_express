export interface Publication {
  id?: number;
  type: PublicationTypes;
  title: string;
  author: string;
  author_two?: string;
  author_three?: string;
  copies: number;
  ISBN: number;
  ISSN?: number;
}

export enum PublicationTypes {
  article = 1,
  magazine = 2,
  newpaper = 3,
}
