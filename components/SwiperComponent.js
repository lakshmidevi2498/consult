import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { colors } from '../utilities/GlobalColors';
import { SafeAreaView } from 'react-native';
import { Imports } from '../utilities/GlobalImports';


const content = [
  
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwExBG8SNJ5EPH7aneFIFCh2g9Fyk8DlHXxEiVFc2StblraGWaR1oFjFAZvKW5eG2jv70&usqp=CAU',
  },
  {
    image: 'https://media.licdn.com/dms/image/v2/D5612AQE6tRJj7cNY3w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1693324437512?e=2147483647&v=beta&t=H7q4UEegm1z1fV15QStDUSj2abMB6Upel-WGVoVlyXU',
  },
  {
    image: 'https://ezovion.com/wp-content/uploads/2023/06/1000-x-600px_Features-of-Hospital-Management-System-01.jpg',
  },
  {
    image: 'https://hatiintl.com/wp-content/uploads/2017/01/The-integrations-that-matter-for-a-Hospital-Management-System-1024x483.jpg',
  },
  {
    image: 'https://uniwides.wordpress.com/wp-content/uploads/2015/09/scn1.jpg',
  },
];


const SwiperComponent = () => {

  const [isReady, setIsReady] = React.useState(false);

  return (
    <Imports.SafeAreaView onLayout={() => setIsReady(true)}>
  {isReady && (
    <View style={styles.container}>
      <Swiper
        style={{ height: 250 }}
        autoplay
        autoplayTimeout={2}
        showsPagination={true}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        loop
      >
        {content.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
          </View>
        ))}
      </Swiper>
    </View>
  )}
</Imports.SafeAreaView>
  );
};
export default SwiperComponent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: 'center',
    height: 250,
  },
  slide: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
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
