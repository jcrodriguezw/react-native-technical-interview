import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useEffect} from 'react/cjs/react.development';
import {palette} from '../../styles/palette';
import {useSelector} from 'react-redux';

const renderItem = ({itemKey: {item}, navigation}) => (
  <View>
    <TouchableOpacity
      onPress={() => navigation.navigate('BookDetail', {item: {...item}})}>
      <Image
        style={styles.suggestionListWrapper}
        source={{
          uri: item.image_url,
        }}
      />
    </TouchableOpacity>
  </View>
);

function BookDetail(props) {
  const booksData = useSelector(state => state.books);

  const {books} = booksData;

  const {
    route: {
      params: {item},
    },
    navigation,
  } = props;

  const {title, image_url, author, publisher, year, genre, comments} = item;

  const [suggestionBooks, setSuggestionBooks] = useState([]);

  useEffect(() => {
    const suggestion = books?.filter(
      book => book.id !== item.id && book.genre === genre,
    );

    setSuggestionBooks(suggestion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, genre]);

  const suggestionList = () => {
    if (!suggestionBooks.length) {
      return (
        <View style={styles.suggestionEmpty}>
          <Text>No suggestons</Text>
        </View>
      );
    }

    return (
      <View style={styles.marginHV}>
        <Text style={styles.normalTitle}>Suggestion List</Text>
        <FlatList
          horizontal={true}
          data={suggestionBooks}
          renderItem={itemKey => renderItem({itemKey, navigation})}
          keyExtractor={itemKey => itemKey.id}
        />
      </View>
    );
  };

  const commentsList = () => {
    if (!comments || !comments.length) {
      return (
        <View style={styles.suggestionEmpty}>
          <Text>No comments</Text>
        </View>
      );
    }

    return (
      <View style={styles.marginHV}>
        <Text style={styles.normalTitle}>Comments</Text>

        <View>
          {comments?.map(comment => (
            <View key={comment.id} style={styles.commentItemWrap}>
              <Image
                source={{
                  uri: comment.img,
                }}
                style={styles.commentImage}
              />
              <View style={styles.commentDescriptionWrap}>
                <Text style={styles.commentAuthor}>{comment.name}</Text>
                <Text style={styles.commentDescription}>
                  {comment.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detail}>
        <View style={styles.item}>
          <Image
            style={styles.logo}
            source={{
              uri: image_url,
            }}
          />
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>Available</Text>
            <Text style={styles.description}>{author}</Text>
            <Text style={styles.description}>{year}</Text>
            <Text style={styles.description}>{publisher}</Text>
          </View>
        </View>
        <View style={styles.actionsWrapper}>
          <View style={styles.buttonAdd}>
            <Text style={styles.buttonAddText}>ADD TO WISHLIST</Text>
          </View>

          <View style={styles.buttonRent}>
            <Text style={styles.buttonRentText}>RENT</Text>
          </View>
        </View>
      </View>

      {suggestionList()}

      {commentsList()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.blue.extraLight,
  },
  detail: {
    backgroundColor: palette.white,
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    borderRadius: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: palette.black,
    width: 200,
  },
  description: {
    fontFamily: 'ViaodaLibre-Regular',
    fontSize: 18,
  },
  logo: {
    width: 82,
    height: 120,
    borderWidth: 1,
    borderColor: palette.green.medium,
    marginRight: 20,
  },
  actionsWrapper: {
    padding: 10,
    margin: 10,
    height: 100,
    justifyContent: 'space-between',
  },
  buttonAdd: {
    padding: 15,
    borderWidth: 2,
    borderColor: palette.blue.medium,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonAddText: {
    color: palette.blue.medium,
    fontWeight: 'bold',
  },
  buttonRent: {
    padding: 15,
    marginTop: 10,
    borderWidth: 2,
    borderColor: palette.blue.medium,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: palette.blue.medium,
  },
  buttonRentText: {
    color: palette.white,
    fontWeight: 'bold',
  },
  suggestionListWrapper: {
    height: 95,
    width: 65,
    marginHorizontal: 10,
  },
  suggestionEmpty: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginHV: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  normalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  commentItemWrap: {
    backgroundColor: palette.white,
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
  },
  commentDescription: {
    fontSize: 14,
  },
  commentAuthor: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  commentImage: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: palette.green.medium,
    marginRight: 20,
    borderRadius: 50,
  },
  commentDescriptionWrap: {
    width: 250,
  },
});

export default BookDetail;
