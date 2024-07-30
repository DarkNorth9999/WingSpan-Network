// types.ts
export interface Position {
    startLat: number;
    startLng: number;
    color: string;
  }
  
  export interface GlobeConfig {
    globeColor: string;
    emissive: string;
    emissiveIntensity: number;
    shininess: number;
    pointSize: number;
  }
  
  export interface WorldProps {
    globeConfig: GlobeConfig;
    data: Position[];
  }
  