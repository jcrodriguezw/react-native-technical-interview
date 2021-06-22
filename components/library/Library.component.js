import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {palette} from '../../styles/palette';
import {allBooksAction} from '../../redux/actions';

const Item = ({item, navigation}) => {
  const {title, image_url, author} = item;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('BookDetail', {item: {...item}})}>
      <View style={styles.item}>
        <Image
          style={styles.logo}
          source={{
            uri: image_url,
          }}
        />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text> {author} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function Library({navigation}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const booksData = useSelector(state => state.books);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const {books} = booksData;

  useEffect(() => {
    async function getBooks() {
      if (!books.length) {
        setLoading(true);
        const response = await axios
          .get('http://10.0.2.2:3000/books')
          .catch(err => console.log(err));

        const {data, status} = response || {};

        if (!response || status !== 200) {
          return Alert.alert('something is wrong, try again');
        }

        dispatch(allBooksAction(data));
        setLoading(false);
      }
    }

    getBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, books]);

  const renderItem = ({item}) => <Item item={item} navigation={navigation} />;

  const filterBooks = books?.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Animated.View style={{...styles.container, opacity: fadeAnim}}>
      <SafeAreaView>
        <View style={styles.inputSearchWrapper}>
          <TextInput placeholder="Search" onChangeText={setSearch} />
        </View>
        <Text style={styles.screenTitle}>Books</Text>
        <FlatList
          data={filterBooks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.blue.extraLight,
  },
  item: {
    backgroundColor: palette.white,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    borderRadius: 5,
    width: 350,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logo: {
    width: 66,
    height: 78,
    borderWidth: 1,
    borderColor: palette.green.medium,
    marginRight: 10,
  },
  inputSearchWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: palette.grey.medium,
  },
  indicatorWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
});

export default Library;
