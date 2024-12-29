import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {useTheme} from '../Context/ThemeContext';

const SearchBar = ({onSearch}) => {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <TextInput
        style={[styles.input, {color: colors.text, borderColor: colors.text}]}
        placeholder="Search for GIFs..."
        placeholderTextColor={colors.text}
        onChangeText={onSearch}
        autoCorrect={false}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 30,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 12,
    marginHorizontal: 10,
    marginTop: 20,

    fontSize: 16,
  },
});

export default SearchBar;
