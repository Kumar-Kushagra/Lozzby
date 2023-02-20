import {useFocusEffect} from '@react-navigation/native';
import React, {useMemo, useRef} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomHeader,
  CustomStatusBar,
  CustomInput,
  CustomAvatar,
  CustomButton,
} from '../../components';
import CartCount from '../../components/CartCount';
import {becomeSellerManager, logoutManager} from '../../redux/auth';
import {navigate} from '../../services/Routerservices';
import {getScreenHeight} from '../../utils/domUtils';

const UserProfile = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const userData = useSelector((state: any) => state.auth.userData);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();

  const emailRef: any = useRef();
  const nameRef: any = useRef();
  const profileRef: any = useRef();
  const phoneNumberRef: any = useRef();

  useFocusEffect(
    React.useCallback(() => {
      emailRef.current.setValue(userData.email);
      nameRef.current.setValue(userData.name);
      profileRef.current.setValue(userData.profile);
      phoneNumberRef.current.setValue(userData?.phoneNumber);
    }, [
      userData.email,
      userData.name,
      userData?.phoneNumber,
      userData.profile,
    ]),
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader hide title="Profile" cart={<CartCount/>}/>

        <ScrollView contentContainerStyle={styles.contanier}>
          <View style={styles.item}>
            <CustomAvatar disabled={true} ref={profileRef} />
          </View>

          <View style={styles.item}>
            <CustomInput editable={false} ref={emailRef} label={'Email'} />
          </View>
          <View style={styles.item}>
            <CustomInput editable={false} ref={nameRef} label={'Name'} />
          </View>

          <View style={styles.item}>
            <CustomInput
              editable={false}
              ref={phoneNumberRef}
              label={'Phone Number'}
            />
          </View>
          <View style={styles.item}>
            <CustomButton
              action={() => {
                navigate('EditUserProfile', {});
              }}
              title="Edit Profile"
            />
          </View>

          {/* <View style={styles.item}>
            {userData.type === 'seller' ? (
              <CustomButton
                action={() => {
                  navigate('ManageProducts', {});
                }}
                title="Manage Products"
              />
            ) : (
              <CustomButton
                action={() => {
                  dispatch<any>(becomeSellerManager());
                }}
                title="Become Seller"
              />
            )}
          </View>

          <View style={styles.item}>
            <CustomButton
              action={() => {
                dispatch<any>(logoutManager());
              }}
              title="Logout"
            />
          </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: theme.white,
      flex: 1,
    },
    safe: {
      backgroundColor: theme.primary,
      flex: 1,
    },
    item: {
      marginTop: getScreenHeight(2),
    },
    contanier: {
      paddingHorizontal: getScreenHeight(2),
    },
  });

export default UserProfile;
