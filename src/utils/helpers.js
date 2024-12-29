import {PermissionsAndroid, Platform, Alert} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const downloadGif = async (gifUrl, setDownloading) => {
  try {
    setDownloading(true);

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Needed',
          message: 'This app needs storage access to download GIFs.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Storage permission is required.');
        setDownloading(false);
        return;
      }
    }

    const fileName = gifUrl.split('/').pop().split('?')[0];
    const uniqueFileName = `${
      fileName.split('.')[0]
    }_${new Date().getTime()}.${fileName.split('.').pop()}`;
    const path = `${RNFetchBlob.fs.dirs.DownloadDir}/${uniqueFileName}`;

    const response = await RNFetchBlob.config({
      fileCache: true,
      path: path,
    }).fetch('GET', gifUrl);

    if (response.info().status === 200) {
      Alert.alert('Download Successful', `GIF saved to: ${response.path()}`);
    } else {
      throw new Error('Download failed');
    }
  } catch (error) {
    console.error('Download error:', error);
    Alert.alert(
      'Download Failed',
      'An error occurred while downloading the GIF.',
    );
  } finally {
    setDownloading(false);
  }
};
