export interface Recommendation {
  id: string;
  projectId: string;
  title: string;
  description: string;
  marketingFunnel?: string; // Optional if not always present
  type?: string; // Optional if not always present
  keywords: Keywords[];
  accepted: boolean;
}

export interface Keywords {
  keyword: string;
  searchVolume: number;
  difficulty: number;
}
