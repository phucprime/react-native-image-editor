import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  Edit(
    props: Object,
    onDone: (imagePath: string) => void,
    onCancel: (resultCode: number) => void,
  ): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNPhotoEditor');
