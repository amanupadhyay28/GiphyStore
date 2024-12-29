import React, {useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import SearchBar from '../components/SearchBar';
import GifCard from '../components/GifCard';
import {searchGIFs} from '../services/giphyAPI';
import {debounce} from '../utils/debounce';

const SearchScreen = () => {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = debounce(async query => {
    setLoading(true);
    const results = await searchGIFs(query);
    setGifs(results);
    setLoading(false);
  }, 500);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fffff',
      }}>
      <SearchBar onSearch={handleSearch} />
      {loading && <ActivityIndicator />}
      <FlatList
        data={gifs}
        renderItem={({item}) => <GifCard gif={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default SearchScreen;
