import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {ImageEditor} from '@phucprime/react-native-image-editor';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-blob-util';

type Props = {
  path: string;
  colors?: string[];
  stickers?: string[];
  hiddenControls?: string[];
  onDone?: (e: any) => void;
  onCancel?: (e: any) => void;
};

export default class App extends Component<Props> {
  _onPress = () => {
    ImageEditor.open({
      path: RNFS.DocumentDirectoryPath + '/photo1.jpg',
      stickers: [
        'sticker0',
        'sticker1',
        'sticker2',
        'sticker3',
        'sticker4',
        'sticker5',
        'sticker6',
        'sticker7',
        'sticker8',
        'sticker9',
        'sticker10',
      ],
      // hiddenControls: [
      //   'clear',
      //   'crop',
      //   'draw',
      //   'save',
      //   'share',
      //   'sticker',
      //   'text',
      // ],
      colors: undefined,
      onDone: () => {
        console.log('on done');
      },
      onCancel: () => {
        console.log('on cancel');
      },
    });
  };

  componentDidMount() {
    let photoPath = RNFS.DocumentDirectoryPath + '/photo1.jpg';
    let binaryFile = Image.resolveAssetSource(require('./assets/photo.jpg'));

    RNFetchBlob.config({fileCache: true})
      .fetch('GET', binaryFile.uri)
      .then((resp: {path: () => string}) => {
        RNFS.moveFile(resp.path(), photoPath)
          .then(() => {
            console.log('FILE WRITTEN!');
          })
          .catch(err => {
            console.log(err.message);
          });
      })
      .catch((err: {message: any}) => {
        console.log(err.message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._onPress}>
          <Text>Click</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
