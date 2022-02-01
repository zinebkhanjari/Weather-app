import { StyleSheet,FlatList, Text, ScrollView, TouchableOpacity,View ,Button,TextInput,Image,KeyboardAvoidingView, ImageBackground} from 'react-native';
import { db } from "./firebase";
import DateTime from './DateTime'
import WeatherScroll from './WeatherScroll'
import {NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect, useState}from 'react';
import {collection, addDoc, Timestamp, query, orderBy, onSnapshot} from 'firebase/firestore'
import { ListItem, Avatar } from 'react-native-elements'
import { Icon } from 'react-native-elements';
import SplashScreen from './splashScreen';
import LoginScreen from './login';
import aboutus from './aboutus';
const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
function tellWeatherPage({route}) {
  const img = require('./image.png')
console.log(route.params.location.key.name)
 
const [data, setData] = useState({});
useEffect(() => {

    fetchDataFromApi(route.params.location.key.latitude, route.params.location.key.longitude);

}, [])
  const fetchDataFromApi = (latitude,longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
      console.log(data)
      setData(data)
      })
    }
    
  }

  return (
    <View style={styles.container}>
            <ImageBackground source={img} style={styles.image} >

        <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
        <WeatherScroll weatherData={data.daily}/>

        </ImageBackground>
       
     
    </View>
  );
}
function citiesList({navigation}) {
  const [cities_list, setCities_list] = useState(null);
  const [cities,setcities]=useState([]);
  const [location,setLocation]=useState([]);
  
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

if (cities_list!= null) {
  //handlecitiesChange();
  cities_list.forEach(function(element){
      cities.push({key:element.data});
});
}


const addLocation=function(){
  navigation.navigate('addLocation')
  
}
const aboutus=function(){
  navigation.navigate('aboutus')
  
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
      <Image
                source={require('./logo_seule.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 10,
                  marginBottom:0
                }}
              />
      


  {
          <FlatList
            data={cities}
            renderItem={({item}) => <Text onPress={newText => tellWeather(item) }
            style={styles.item}>
            
            <ListItem bottomDivider>
              <Icon name='location-pin' />
              <ListItem.Content>
                <ListItem.Title>{item.key.name} - MA</ListItem.Title> 
                <ListItem.Subtitle>Latitude : {item.key.latitude}</ListItem.Subtitle>
                <ListItem.Subtitle>Longitude : {item.key.longitude}</ListItem.Subtitle>
                <ListItem.Chevron />
              </ListItem.Content>
            </ListItem>

          </Text>}
          />
  }
  <View  style={{flexDirection: 'row'}}>
<TouchableOpacity
  style={styles.buttonStyle}
  activeOpacity={0.5}
  onPress={addLocation}>
    <Text style={styles.buttonTextStyle}>Ajouter une ville</Text>
</TouchableOpacity>
<TouchableOpacity
  style={styles.buttonStyle}
  activeOpacity={0.5}
  onPress={aboutus}>
    <Text style={styles.buttonTextStyle}>About us</Text>
</TouchableOpacity>
</View>


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

    if(!location_name){
      alert("le nom est vide");
    }
    else if(!longitude){
      alert("la longitude est vide");
    }
    else if (!latitude){
      alert("la latitude est vide");
    }
    else{
      let element={
        name:location_name,
        longitude:longitude,
        latitude:latitude
      };
    addDoc(collection(db, 'city'), element);

    navigation.navigate("Home");
    }
  
  }

  return(
      
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
                margin: 10,
              }}
            />
            <Text style={{fontWeight: 'bold'}}>Ajouter une nouvelle ville</Text>
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={newText => setName(newText)}
              value={location_name}
              placeholder="entez le nom de la ville"
              
            />
            </View>
            <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={newText => setLongitude(newText)}
              value={longitude}
              placeholder="entez la longitude"
            />
            </View>
            <View style={styles.SectionStyle}>

            <TextInput
              style={styles.inputStyle}
              onChangeText={newText => setLatitude(newText)}
              value={latitude}
              placeholder="entez la latitude"
            />
            </View>
            <TouchableOpacity
              style={styles.buttonAddStyle}
              activeOpacity={0.5}
              onPress={save}>
              <Text style={styles.buttonTextStyle}>Ajouter</Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>

          </ScrollView>
      </View>
  )
}

export default function App() {

    const Stack = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='splash'>
                <Stack.Screen name="Home" component={citiesList}/>
                <Stack.Screen name="Details" component={DetailsScreen}/>
                <Stack.Screen name="addLocation" component={addLocationPage}/>
                <Stack.Screen name="tellWeather" component={tellWeatherPage}/>
                <Stack.Screen name="splash" component={SplashScreen}/>
                <Stack.Screen name="login" component={LoginScreen}/>
                <Stack.Screen name="aboutus" component={aboutus}/>                
            </Stack.Navigator>
        </NavigationContainer>
    ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    fontSize:17,
    color:'#FFFFFF',
    fontFamily:'Times New Roman',

  },
  input : {
    margin: 10,
    height: 40,
    borderColor: '#000000',
    borderWidth: 1
  },
  image:{
    flex:1, 
    resizeMode:"cover", 
    justifyContent:"center"
  },
  upText : {
    color: '#307ecc',
    textAlign: 'center',
    fontSize: 10,
    alignSelf: 'center',
    padding: 10,
  },
  item: {
    padding:50,
    paddingTop:0,
    paddingBottom:0,
    fontSize: 18,
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
    marginBottom: 0,
    paddingLeft:10,
    paddingRight:10,
    justifyContent:"center"

  },
  buttonAddStyle: {
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
  mainBody: {
    flex: 1,
    justifyContent: 'center',
   backgroundColor: '#FFFFFF',
    alignContent: 'center',
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
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
});
