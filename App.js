import React from 'react';
import { StyleSheet, Text, View, Platform, Image, TextInput, Picker, PixelRatio, Button, FlatList, ActivityIndicator, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { white } from 'ansi-colors';
// import { Table, Row, Rows } from 'react-native-table-component';

const movies = [];
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      isLoading: false,
      tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
      tableData: [
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']],
      refreshing: false,
    }
  }

  test = () => {

    this.setState({ refreshing: true });
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        movies = responseJson.movies;
        console.log('movies:refresh');
        this.setState({ refreshing: false });
      })
      .catch((error) => {
        console.error(error);
      });
    console.log('test');
  }
  itemSelected = (item) => {
    console.log(item);
  }
  renderItem = (item) => {
    return (
      <View
        onPress={(item) => {
          console.log(item);
        }}
        key={item.title}
        style={{ flex: 1, backgroundColor: 'crimson', borderColor: 'white', borderRadius: 5, margin: 10, alignItems: 'center', justifyContent: 'center', alignItems: 'center', justifyContent: 'center', height: 50 }}>
        <Text>{item.releaseYear} - {item.title} </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#00738c', marginTop: Platform.OS == 'ios' ? 21 : 0 }}>
        <View style={{
          flex: 1, alignItems: 'center', justifyContent: 'center'
        }}>
          <ScrollView style={{ marginTop: 10, flexDirection: 'row' }} refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.test.bind(this)}
            />
          }>
            {
              movies.map((item) => this.renderItem(item))
            }
          </ScrollView>

          {/* <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={state.tableData} textStyle={styles.text} />
          </Table> */}
          {/* <Image source={require('./src/img/main-logo.png')} style={{ width: 128, height: 128, marginTop: 100 }} /> */}
        </View>
        <View style={{ flex: 1, backgroundColor: '#00738c', padding: 50 }}>
          <View style={{ flex: 1, alignItems: 'center', borderColor: 'white', borderRadius: 5 }}>
            <Picker
              selectedValue={this.state.userId}
              style={{
                color: 'white',
                borderRadius: 14,
                borderWidth: 1,

                borderColor: 'white',
                width: 250,
                height: 40,
                marginRight: 16
              }}
              onValueChange={(itemValue, itemIndex) => this.setState({ userId: itemValue })}>
              <Picker.Item label="- Seçiniz -" value="0" />
              <Picker.Item label="Ali Töre" value="1" />
              <Picker.Item label="Halime Candan" value="2" />
            </Picker>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={this.test}>
              <Text style={styles.text}>
                Fetch Getir
            </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>userId:{this.state.userId}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  text: {
    borderWidth: 1,
    padding: 25,
    borderColor: 'black',
    backgroundColor: '#DDDDDD',
    borderRadius:5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center'
  }
});
