export enum CategoryType {
  PERSON = 'PERSON',
  CONCEPT = 'CONCEPT',
  LOCATION = 'LOCATION',
  ORGANIZATION = 'ORGANIZATION',
  EVENT = 'EVENT',
  TECHNOLOGY = 'TECHNOLOGY',
  GENERAL = 'GENERAL'
}

export interface ExternalLink {
  title: string;
  url: string;
}

export interface AIAnalysisResult {
  title: string;
  category: CategoryType;
  summary: string[];
  tags: string[];
  externalLinks: ExternalLink[];
}

export interface HighlightCoordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}
