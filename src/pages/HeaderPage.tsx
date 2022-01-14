import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {emails} from '../data/data';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

interface IProps {
  offset: number;
}

const CustomHeaderTitle: FC<IProps> = ({offset}) => {
  const opacity = useDerivedValue(() => (offset > 30 ? 1 : 0), [offset]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value),
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Text>header page</Text>
    </Animated.View>
  );
};

const HeaderPage = () => {
  const navigation = useNavigation();
  const [offset, setOffset] = React.useState(0);
  const translationY = useSharedValue(0);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <CustomHeaderTitle offset={translationY.value} />,
    });
  }, [navigation, translationY.value]);

  const updateState = (value: number) => {
    setOffset(value);
  };

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = withTiming(event.contentOffset.y, {
      duration: 10,
    });
    runOnJS(updateState)(event.contentOffset.y);
  });

  const renderEmails = () => {
    return emails.map(email => {
      return (
        <View style={styles.listItem} key={email.id}>
          <Text>{email.title}</Text>
        </View>
      );
    });
  };

  return (
    <Animated.ScrollView
      style={styles.content}
      onScroll={scrollHandler}
      scrollEventThrottle={16}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>header page</Text>
      </View>
      <View style={styles.listWrapper}>{renderEmails()}</View>
    </Animated.ScrollView>
  );
};

export default HeaderPage;

const styles = StyleSheet.create({
  content: {
    padding: 10,
  },
  titleWrapper: {
    marginBottom: 10,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    height: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listWrapper: {
    marginTop: 10,
  },
  listItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'gray',
    margin: 5,
  },
});
