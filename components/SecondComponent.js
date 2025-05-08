import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { colors } from '../utilities/GlobalColors';
import { images } from '../dummy-data';

const SecondComponent = () => {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay
        autoplayTimeout={2}
        showsPagination={false}
        // dotStyle={styles.dot}
        // activeDotStyle={styles.activeDot}
        loop
      >
        {images.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default SecondComponent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: 'center',
    height: 250,
    borderColor:"red",
    borderWidth:2
  },
  slide: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  
    borderColor:"green",
    borderWidth:2
  },
  image: {
    width: '100%',
    height: '100%',
    padding:100,
  },
  dot: {
    backgroundColor: 'gray',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor:colors.primary300,
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
});
