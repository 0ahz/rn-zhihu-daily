import React from 'react';
import { StatusBar, StyleSheet, ScrollView, View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper'

import Router from '../navigation/Router';
import { getNewsLatest } from '../api/daily';

const { width } = Dimensions.get('window');

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      tops: [],
      scrollTop: 0,
      headerBgColor: 'rgba(2, 182, 243, 0)',
    }
  }

  static route = {
    navigationBar: {
      visible: false,
      title: 'Home',
    },
  };

  componentWillMount() {
    let _this = this;
    getNewsLatest().then(function (data) {
      _this.setState({
        list: data.stories,
        tops: data.top_stories,
      });
    });
  }

  _goToDetail = (id) => {
    this.props.navigator.push(Router.getRoute('detail', { id: id }));
  }

  _onScroll = (event) => {
    let y = event.nativeEvent.contentOffset.y;
    let opacity = y >= 200 ? 1: 0;
    this.setState({
      headerBgColor: `rgba(2, 182, 243, ${opacity})`,
    });
  }

  _renderItem = (item) => {
    return (
      <TouchableOpacity key={item.id} activeOpacity={.8} onPress={() => { this._goToDetail(item.id) }}>
        <View style={styles.itemCont}>
          <Text style={styles.itemTitle} key={item.id}>{item.title}</Text>
          <Image resizeMode={Image.resizeMode.cover} style={styles.itemImage} source={{ uri: item.images[0] }} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={[styles.header, {backgroundColor: this.state.headerBgColor}]}>
          <View style={styles.headerTop}></View>
          <View style={styles.headerCont}>
            <TouchableOpacity>
              <SimpleLineIcons name="menu" size={20} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerText}>今日热文</Text>
            <TouchableOpacity>
              <SimpleLineIcons name="emotsmile" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <ScrollView onScroll={this._onScroll} scrollEventThrottle={100} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <Swiper height={220} paginationStyle={styles.slidePage}
              dotStyle={{ height: 6, width: 6, borderRadius: 3 }}
              activeDotStyle={{ height: 6, width: 6, borderRadius: 3, backgroundColor: '#FFF' }} autoplay>
              {
                this.state.tops.map(item => {
                  return (
                    <View key={item.id} style={styles.slide}>
                      <Image resizeMode={Image.resizeMode.cover} style={styles.slideImage} source={{ uri: item.image }} />
                      <Text style={styles.slideTitle}>{item.title}</Text>
                    </View>
                  )
                })
              }
            </Swiper>
            <View style={styles.listCont}>
              {
                this.state.list.map(item => {
                  return this._renderItem(item);
                })
              }
            </View>
          </ScrollView>
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 60,
    // backgroundColor: 'transparent',
    // backgroundColor: 'rgba(2, 182, 243, .4)',
    zIndex: 9,
  },
  headerTop: {
    height: 22,
    backgroundColor: 'transparent',
    // backgroundColor: '#02b6f3',
  },
  headerCont: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  scrollContainer: {
    overflow: 'visible',
  },


  slide: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  slidePage: {
    bottom: 8,
  },

  slideDot: {
    height: 6,
    width: 6,
    borderRadius: 3,
  },

  slideActiveDot: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: '#FFF',
  },

  slideImage: {
    width,
    flex: 1
  },

  slideTitle: {
    position: 'absolute',
    bottom: 25,
    left: 15,
    right: 15,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  },

  listCont: {
    paddingBottom: 15,
  },

  itemCont: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderStyle: 'solid',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E8E8E8',
  },

  itemTitle: {
    flex: 1,
    fontSize: 18,
    paddingRight: 10,
    lineHeight: 24,
    color: '#000',
  },

  itemImage: {
    width: 80,
    height: 60,
  },

});