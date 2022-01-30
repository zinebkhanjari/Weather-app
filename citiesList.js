import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState}from 'react';
import { FlatList,StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useHistory,useLocation } from 'react-router';

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

export default function citiesList() {
  const [data, setData] = useState({});

  let location  = useLocation();
  useEffect(() => {
    fetchDataFromApi(location.latitude, location.longitude);
}, [])
    /*(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("34.0181", "5.0078")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  
*/

const cities=[{key: 'Devin',value:'Devin'},
{key: 'Dan'},
{key: 'Dominic'},
{key: 'Jackson'},
{key: 'James'},
{key: 'Joel'},
{key: 'John'},
{key: 'Jillian'},
{key: 'Jimmy'},
{key: 'Julie'}, ]
  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      // console.log(data)
      setData(data)
      })
    }
    
  }

  return (
    <View style={styles.container}>
    <FlatList
      data={cities}
      renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
    />
  </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    flex:1, 
    resizeMode:"cover", 
    justifyContent:"center"
  }
});
