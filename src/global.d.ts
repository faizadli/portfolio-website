export {};

declare module "*.glb" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "meshline" {
  import type {
    BufferGeometry,
    Material,
    Texture,
    ColorRepresentation,
    Vector2,
  } from "three";

  export class MeshLineGeometry extends BufferGeometry {
    setPoints(
      points:
        | number[]
        | Array<{ x: number; y: number; z?: number }>
        | Array<{ x: number; y: number }>,
    ): void;
  }

  export interface MeshLineMaterialParameters {
    color?: ColorRepresentation;
    depthTest?: boolean;
    resolution?: Vector2;
    useMap?: boolean;
    map?: Texture;
    repeat?: [number, number];
    lineWidth?: number;
    opacity?: number;
    transparent?: boolean;
  }

  export class MeshLineMaterial extends Material {
    constructor(params?: MeshLineMaterialParameters);
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: Record<string, unknown>;
      meshLineMaterial: {
        color?: string;
        depthTest?: boolean;
        resolution?: [number, number] | import("three").Vector2;
        useMap?: boolean;
        map?: import("three").Texture;
        repeat?: [number, number];
        lineWidth?: number;
        opacity?: number;
        transparent?: boolean;
        [key: string]: unknown;
      };
    }
  }
}
