import { StatusBar } from 'expo-status-bar';
import { StyleSheet,FlatList, Text, View } from 'react-native';
import {collection, addDoc, Timestamp, query, orderBy, onSnapshot,doc, updateDoc, deleteDoc} from 'firebase/firestore'
import { db } from "./firebase";

import { useHistory } from 'react-router';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect, useState}from 'react';


const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
function citiesList() {
  const [data, setData] = useState({});
  const [cities_list, setCities_list] = useState(null);
  const [cities,setcities]=useState([]);

  useEffect(() => {
    fetchDataFromApi("34.0181", "5.0078");

    const q = query(collection(db, 'city'))
    onSnapshot(q, (querySnapshot) => {
      setCities_list(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  
    },[]
  
 )
 console.log('here')
 console.log(cities_list)

if (cities_list!= null) {

  cities_list.forEach(function(element){
    cities.push({key:element.data.name});
});
}


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


console.log(cities)
  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      console.log(data)
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



function HomeScreen({navigation}){

  const goToDetailsScreen = function(){
      navigation.navigate("Details");
  }

  return(
      <View>
          <Text>This is Home Screen</Text>
          <Button onPress={goToDetailsScreen} title="Go To Details Screen" />
      </View>
  )
}

function DetailsScreen({navigation}){

  const goToHomeScreen = function(){
      navigation.navigate("Home");
  }
  
  return(
      <View>
          <Text>This is Details Screen</Text>
          <Button onPress={goToHomeScreen} title="Go To Home Screen" />
      </View>
  )
}

export default function App() {
 /* let history = useHistory();

  const gocities=function(){
    let target = {
      pathname: '/cities'
    };

    history.push(target);
  }*/

    const Stack = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name="Home" component={citiesList}/>
                <Stack.Screen name="Details" component={DetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
