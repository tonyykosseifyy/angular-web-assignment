export interface Movie {
    title: string;
  }
  
  export interface Actor {
    id: number;
    name: string;
    profile_path: string;
    known_for: Movie[];
    knownForTitles?: string; // This is optional as we will add it later
  }
  