import { StatusBar } from 'expo-status-bar';
import { StyleSheet,FlatList, Text, View ,Button,TextInput,ImageBackground} from 'react-native';
import { db } from "./firebase";
import DateTime from './DateTime'
//import WeatherScroll from './WeatherScroll'
import { useHistory } from 'react-router';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect, useState}from 'react';
import {collection, addDoc, Timestamp, query, orderBy, onSnapshot} from 'firebase/firestore'


const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
function tellWeatherPage({route}) {
  const img = require('./image.png')
  console.log(img)
console.log(route.params.location.key.name)
 
const [data, setData] = useState({});
const [currentLongitude,setCurrentlongitude]=useState();
useEffect(() => {

    fetchDataFromApi(route.params.location.key.latitude, route.params.location.key.longitude);

}, [])
  const fetchDataFromApi = (latitude,longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
      console.log("data")
      console.log(data)
      setData(data)
      })
    }
    
  }

  return (
    <View style={styles.container}>
            <ImageBackground source={img} style={styles.image} >

        <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
        </ImageBackground>
       
     
    </View>
  );
}
function citiesList({navigation}) {
  const [cities_list, setCities_list] = useState(null);
  const [cities,setcities]=useState([]);
  const [location,setLocation]=useState([]);
  
  //const [cities,setcities]=useState([]);


  useEffect(() => {
   // fetchDataFromApi("34.0181", "5.0078");

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
  
  //handlecitiesChange();
  cities_list.forEach(function(element){
    
  
      cities.push({key:element.data});
      

  
   
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

const addLocation=function(){
  navigation.navigate('addLocation')
  
}

  const tellWeather=function(location){
    console.log("location")
    console.log(location)
    navigation.navigate("tellWeather",{
      location:location
  

    });
    console.log("done")
  }

  
  return (
    <View style={styles.container}>
    
    <FlatList
      data={cities}
      renderItem={({item}) => <Text onPress={newText => tellWeather(item) }
      style={styles.item}>{item.key.name}</Text>}
    />
    <Button onPress={addLocation} title='add location'/>
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
function addLocationPage({navigation}){
  const [location_name, setName] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);


  const goToHomeScreen = function(){
      navigation.navigate("Home");
  }
  const onChangeName=function(e){
    setName(e.target.value);  }
  const onChangeLongitude=function(e){
    setLongitude(e.target.value);  }
  const onChangeLatitude=function(e){
    setLatitude(e.target.value);  }

  const save=function(){
    let element={
      name:location_name,
      longitude:longitude,
      latitude:latitude
    };
    addDoc(collection(db, 'city'), element);
    navigation.navigate("Home");
    

  }
  


  return(
    
      <View>
         
          <Text>Add New Location</Text>
          <TextInput
        style={styles.input}
        onChangeText={newText => setName(newText)}
        value={location_name}
        placeholder="enter the name of the location"
        
      />
          <TextInput
        style={styles.input}
        onChangeText={newText => setLongitude(newText)}
        value={longitude}
        placeholder="enter the longitude of the location"
        
      />
      <TextInput
        style={styles.input}
        onChangeText={newText => setLatitude(newText)}
        value={latitude}
        placeholder="enter the latitude of the location"
        
      />
     
          <Button onPress={save} title="Go To Home Screen" />
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
                <Stack.Screen name="addLocation" component={addLocationPage}/>
                <Stack.Screen name="tellWeather" component={tellWeatherPage}/>

    

                

                
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
  image:{
    flex:1, 
    resizeMode:"cover", 
    justifyContent:"center"
  }
});
