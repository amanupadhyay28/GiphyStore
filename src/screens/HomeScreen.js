import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import GifCard from '../components/GifCard';
import {fetchTrendingGIFs} from '../services/giphyAPI';
import {useTheme} from '../Context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

const HomeScreen = () => {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const {theme, colors, toggleTheme} = useTheme();

  const CARD_WIDTH = width * 0.45;
  const CARD_SPACING = width * 0.05;

  const loadGifs = async (reset = false) => {
    try {
      setLoading(true);
      const newGifs = await fetchTrendingGIFs(reset ? 0 : page * 20);
      setGifs(prevGifs => (reset ? newGifs : [...prevGifs, ...newGifs]));
      if (reset) setPage(1);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    } finally {
      setLoading(false);
      if (reset) setRefreshing(false);
    }
  };

  useEffect(() => {
    loadGifs();
  }, [page]);

  const handleEndReached = () => {
    if (!loading) setPage(prevPage => prevPage + 1);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadGifs(true);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={styles.loader}
      />
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={[styles.title, {color: '#ffff'}]}>Trending GIFs</Text>

          <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
            <Icon
              name={
                theme === 'light'
                  ? 'moon-waning-crescent'
                  : 'white-balance-sunny'
              }
              size={24}
              color="#ffff"
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={gifs}
        renderItem={({item}) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBackground,
                width: CARD_WIDTH,
                margin: CARD_SPACING / 2,
              },
            ]}>
            <GifCard gif={item} textColor={colors.cardText} />
          </View>
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        numColumns={2}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 0,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#662d91',
    paddingTop: 40,
    paddingBottom: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  themeToggle: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(184, 233, 9, 0.1)',
  },
  listContainer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  loader: {
    marginVertical: 20,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
});

export default HomeScreen;
