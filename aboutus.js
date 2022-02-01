import React, {useState, createRef} from 'react';
import {auth} from './firebase';
import {signInWithEmailAndPassword} from  "firebase/auth";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

export default function aboutus() {
    return (
        <View style={styles.mainBody}>
          
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <View>
              <KeyboardAvoidingView enabled>
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={require('./logo_seule.png')}
                    style={{
                      width: '50%',
                      height: 100,
                      resizeMode: 'contain',
                      margin: 30,
                    }}
                  />
                </View>
                <View style={styles.SectionStyle}>
                    <Text style={{textAlign:"center"}}>Weather App this application is designed and develooped byABC Company @2002</Text>
                </View>
            </KeyboardAvoidingView>
            </View>
        </ScrollView>
        </View>
    )
    
}
const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
     backgroundColor: '#FFFFFF',
      alignContent: 'center',
    },
    SectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
    },
    buttonStyle: {
      backgroundColor: '#307ecc',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#307ecc',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 25,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
    inputStyle: {
      flex: 1,
      color: 'black',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#dadae8',
    },
    registerTextStyle: {
      color: '#307ecc',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14,
      alignSelf: 'center',
      padding: 10,
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 14,
    }
})

