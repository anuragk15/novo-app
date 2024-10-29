
export interface Recommendation {
    id: string;
    projectId: string;
    title: string;
    description: string;
    marketingFunnel?: string; // Optional if not always present
    type?: string; // Optional if not always present
    keywords: string;
    accepted: boolean;
  }
  