import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

/**
 * TurboModule codegen spec for RNPhotoEditor.
 *
 * This spec enables proper New Architecture (Fabric + TurboModules) support
 * with compile-time type validation. On Old Architecture, TurboModuleRegistry
 * falls back to the NativeModules bridge automatically.
 */
export interface Spec extends TurboModule {
  Edit(
    props: Object,
    onDone: (result: string) => void,
    onCancel: (result: number) => void,
  ): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNPhotoEditor');
