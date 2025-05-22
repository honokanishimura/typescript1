// src/types/global.d.ts
export {};

import * as THREE from 'three';

// refで使う型を直接定義（importしない）
type WaveShaderMaterialType = THREE.ShaderMaterial & {
  uTime: number;
  uMouse: THREE.Vector2;
  uTexture: THREE.Texture;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      waveShaderMaterial: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        ref?: React.Ref<WaveShaderMaterialType>;
        attach?: string;
        args?: any;
        uTexture?: THREE.Texture;
      };
    }
  }
}
