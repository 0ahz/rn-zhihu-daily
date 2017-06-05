import React from 'react';
import { StatusBar, StyleSheet, View, Text, Dimensions, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import AutoHeightWebView from 'react-native-webview-autoheight';

import { getNewsDetail } from '../api/daily';

const { width } = Dimensions.get('window');

export default class DetailScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cont: {},
      loaded: false,
    }
  }

  static route = {
    navigationBar: {
      visible: false,
    },
  };

  componentWillMount() {
    let _this = this;
    const { id } = _this.props.route.params;

    setTimeout(() => {
      getNewsDetail(id).then(function (data) {
        _this.setState({
          cont: data,
          loaded: true,
        });
      });
    }, 300);

  }

  _goBack = () => {
    this.props.navigator.pop();
  }

  render() {
    const { title, body, image, css } = this.state.cont;
    const detailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <link rel="stylesheet" href="${css}">
      </head>
      <body>
          ${body}
      </body>
      </html>
    `;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        {
          !this.state.loaded ?
            <View style={styles.loadingWrp}>
              <ActivityIndicator size="large" />
            </View>
            :
            <View style={styles.contentWrp}>
              <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={true}>
                <View style={styles.header}>
                  <Image resizeMode={Image.resizeMode.cover} style={styles.banner} source={{ uri: image }} />
                  <Text style={styles.title}>{title}</Text>
                </View>
                <AutoHeightWebView
                  style={styles.webview}
                  startInLoadingState={false}
                  source={{ html: detailHtml }}
                />
              </ScrollView>
            </View>
        }
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={() => { this._goBack() }}>
            <SimpleLineIcons name="arrow-left" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SimpleLineIcons name="arrow-right" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SimpleLineIcons name="like" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SimpleLineIcons name="share" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SimpleLineIcons name="bubble" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const htmlStyles = StyleSheet.create({
  div: {
    fontSize: 15,
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollContainer: {
    overflow: 'visible',
  },

  loadingWrp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentWrp: {
    flex: 1,
  },

  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    borderStyle: 'solid',
    borderTopWidth: 0.5,
    borderTopColor: '#E8E8E8',
  },

  header: {
    height: 220,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    zIndex: 999,
  },

  banner: {
    width,
    flex: 1,
  },

  title: {
    position: 'absolute',
    bottom: 25,
    left: 15,
    right: 15,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  },

  webview: {
    position: 'relative',
    marginTop: -200,
    zIndex: 1,
  }
});