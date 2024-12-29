import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Share,
  Text,
  StyleSheet,
  Animated,
  Image,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../Context/ThemeContext';
import {downloadGif} from '../utils/helpers';

const GifCard = ({gif}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [scale] = useState(new Animated.Value(1));
  const [isLiked, setIsLiked] = useState(false);
  const [isDownloading, setDownloading] = useState(false);
  const {colors} = useTheme();
  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this GIF! ${gif.url}`,
      });
    } catch (error) {
      console.error('Error sharing GIF:', error);
    }
  };

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleDownload = async () => {
    try {
      await downloadGif(gif.images.original.url, setDownloading);
    } catch (error) {
      console.error('Error downloading GIF:', error);
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {transform: [{scale}], backgroundColor: colors.cardBackground},
      ]}>
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: 'https://placekitten.com/50/50',
          }}
          style={styles.profileImage}
        />
        <Text style={[styles.usernameText, {color: colors.text}]}>
          {gif.username ? gif.username.toUpperCase() : 'Aman'}
        </Text>
        <TouchableOpacity onPress={handleShare}>
          <Icon name="share" size={24} color={colors.IconColor} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={togglePlayPause}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <FastImage
          source={{
            uri: isPlaying
              ? gif.images.original.url
        : gif.images.original_still.url,      
          }}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.gifImage}
        />
        {!isPlaying && (
          <View style={styles.iconOverlay}>
            <Icon
              name="play-circle-outline"
              size={50}
              color="rgba(0, 0, 0, 0.7)"
            />
          </View>
        )}
      </TouchableOpacity>

      {/* Footer Section */}
      <View
        style={[
          styles.footerContainer,
          {backgroundColor: colors.footerContainer},
        ]}>
        <TouchableOpacity onPress={toggleLike}>
          <Icon
            name={isLiked ? 'favorite' : 'favorite-outline'}
            size={24}
            color={isLiked ? 'red' : colors.IconColor}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDownload} disabled={isDownloading}>
          {isDownloading ? (
            <ActivityIndicator size="small" color={colors.IconColor} />
          ) : (
            <Icon name="file-download" size={24} color={colors.IconColor} />
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  usernameText: {
    flex: 1,
    fontWeight: '400',
    fontSize: 15,
  },
  gifImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  iconOverlay: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
});

export default GifCard;
