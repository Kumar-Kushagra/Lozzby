import React, {useMemo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet, TouchableOpacity, Text, View} from 'react-native';

import {getScreenHeight} from '../utils/domUtils';
import {useSelector} from 'react-redux';
import Home from '../containers/Home';
import UserOrders from '../containers/orders/UserOrders';
import UserProfile from '../containers/profile/UserProfile';
import FastImage from 'react-native-fast-image';
import Setting from '../containers/Setting';

const Tab = createBottomTabNavigator();

const TabButton = (props: any) => {
  const {item, onPress, accessibilityState, styles,theme } = props;
  const focused = accessibilityState.selected;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={styles.contanier}>
        <FastImage
        tintColor={focused ? theme.primary : theme.black}
        resizeMode="contain"
        style={styles.icon}
        source={item.icon}
      />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const BottomBar = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const TabBarArr = [
    {
      route: 'Home',
      component: Home,
      name: 'Home',
      icon: require('../assets/images/home.png'),
    },
    {
      route: 'Orders',
      component: UserOrders,
      name: 'Orders',
      icon: require('../assets/images/order.png'),
    },
    {
      route: 'Profile',
      component: UserProfile,
      name: 'Profile',
      icon: require('../assets/images/profile.png'),
    },
    {
      route: 'Setting',
      component: Setting,
      name: 'Setting',
      icon: require('../assets/images/setting.png'),
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabbar,
      }}>
      {TabBarArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => (
                <TabButton {...props} item={item} theme={theme} styles={styles} />
              ),
            }}
            name={item.route}
            component={item.component}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.primary,
      height: Platform.OS === 'ios' ? getScreenHeight(8) : getScreenHeight(8),
    },
    title: {
      fontSize: getScreenHeight(1.5),
      color: 'black',
      marginTop: getScreenHeight(0.5),
    },
    tabbar: {
      height: Platform.OS === 'ios' ? getScreenHeight(8) : getScreenHeight(8),
      backgroundColor: 'white',
    },
    icon: {
      width: getScreenHeight(3),
      height: getScreenHeight(3),
    },
    homeicon: {
      width: getScreenHeight(10),
      height: getScreenHeight(10),
      bottom: getScreenHeight(3),
    },
    outerContanier: {
      borderColor: 'white',
      borderWidth: getScreenHeight(1),
      borderRadius: getScreenHeight(100),
      bottom: getScreenHeight(4),
      position: 'absolute',
      zIndex: 1000,
      backgroundColor: 'white',
    },
    innerContanier: {
      backgroundColor: theme.primary,
      padding: getScreenHeight(1),
      borderRadius: getScreenHeight(100),
    },
  });

export default BottomBar;
