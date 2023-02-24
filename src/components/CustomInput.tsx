import React, {forwardRef, useImperativeHandle, useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getScreenHeight} from '../utils/domUtils';

const CustomInput = forwardRef((props: any, ref: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [text, setText] = useState('');

  useImperativeHandle(ref, () => ({
    getValue() {
      return text;
    },
    setValue(value: any) {
      if (value) {
        setText(value);
      }
    },
  }));

  return (
    <>
      {props.label ? <Text style={styles.text}>{props.label}</Text> : null}
      <View style={styles.screen}>
        <View
          style={[
            styles.textinputcontanier,
            {borderBottomWidth: props.border ? getScreenHeight(0.1) : 0},
          ]}>
          {props.frontIcon ? (
            <View style={styles.iconcontanier}>{props.frontIcon}</View>
          ) : null}
          <TextInput
            maxLength={props.max}
            editable={props.editable}
            {...props}
            ref={props.inputRef}
            onSubmitEditing={props.onSubmit}
            returnKeyType={props.type ? props.type : 'done'}
            style={[
              styles.textinput,
              {
                width: props.icon || props.frontIcon ? '90%' : '100%',
                color: theme.black,
                textAlignVertical : props.multiline ?  "top" : "center" ,
                minHeight : getScreenHeight(5)
              },
            ]}
            keyboardType={props.keyboardType}
            placeholder={props.placeholder}
            placeholderTextColor={theme.black}
            secureTextEntry={props.secure}
            onChangeText={setText}
            value={text}
            multiline = {props.multiline}
          />
          {props.icon ? (
            <TouchableOpacity
              onPress={props.rightAction}
              // disabled={props.rightAction ? false : true}
              style={styles.iconcontanier}>
              <Image
                style={styles.image}
                source={
                  props.secure
                    ? require('../assets/images/hide.png')
                    : require('../assets/images/unhide.png')
                }
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </>
  );
});

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      borderWidth: getScreenHeight(0.1),
      borderBottomColor: theme.black,
      marginTop: 10,
      borderRadius: 10,
    },

    textinputcontanier: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: theme.textinput,
    },
    textinput: {
      flex: 1,
      fontSize: getScreenHeight(1.8),
      // height: getScreenHeight(6),
    },
    label: {
      fontSize: getScreenHeight(1.8),
      color: theme.white,
      marginBottom: getScreenHeight(0.5),
    },
    iconcontanier: {
      width: '10%',
      height: getScreenHeight(5),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight : getScreenHeight(1)
    },
    text: {
      fontSize: getScreenHeight(1.8),
      color: theme.black,
      fontWeight: 'bold',
    },
    image: {
      width: getScreenHeight(3.5),
      height: getScreenHeight(2.5),
      resizeMode: 'contain',
      tintColor: theme.primary,
    },
  });

export default CustomInput;
