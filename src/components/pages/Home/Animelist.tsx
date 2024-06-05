// types.ts
export type RootStackParamList = {
    SelectedAnime: {
      selectedAnimeObj: AnimeObj;
    };
    // other screens
  };
  
  export type AnimeObj = {
    title: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
  };

  
  import { useNavigation, NavigationProp } from '@react-navigation/native';
  import React from 'react';
  import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
  import FastImage from 'react-native-fast-image';
  import { RootStackParamList, AnimeObj } from './types'; // adjust the import path as needed
  
  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      height: 300,
      width: 150,
      borderRadius: 10,
    },
    logo: {
      width: 66,
      height: 58,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.48)',
    },
    pushTextToBottom: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textStyles: {
      color: 'white',
    },
  });
  
  interface AnimeListProps {
    animeObj: AnimeObj;
  }
  
  const AnimeList: React.FC<AnimeListProps> = ({ animeObj }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('SelectedAnime', {
            selectedAnimeObj: animeObj,
          });
        }}>
        <FastImage
          source={{
            uri: animeObj.images.jpg.image_url,
            priority: FastImage.priority.high,
          }}
          style={styles.tinyLogo}>
          <View style={styles.overlay} />
          <View style={styles.pushTextToBottom}>
            <Text
              style={styles.textStyles}
              adjustsFontSizeToFit={true}
              numberOfLines={2}>
              {animeObj.title}
            </Text>
          </View>
        </FastImage>
      </TouchableOpacity>
    );
  };
  
  export default AnimeList;
  