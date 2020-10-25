import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
//import { request, PERMISSIONS } from 'react-native-permissions';
//import Geolocation from '@react-native-community/geolocation';

import * as Location from 'expo-location';
import { Platform } from 'react-native';
import * as Permissions from 'expo-permissions';

//api
import Api from '../../Api';

import { 
    Container ,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationInput,
    LocationFinder,
    LoadingIcon,
    ListArea
} from './styles';

//svg
import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

//components
import BarberItem from '../../components/BarberItem';

export default () =>{
    //navigation
    const navigation = useNavigation();
    //state
    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] =  useState([

    ])
    //functions
    const handleLocationFinder = async () =>{ 
        setCoords(null);
        // let result = await request(
        //     Platform.OS === 'ios' 
        //     ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        //     : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION 
        // );

        const { status } = await Permissions.getAsync(
            Permissions.LOCATION
        );

        if(status === 'granted'){

            setLoading(true);
            setLocationText('');
            setList([]);

            let location = await Location.getCurrentPositionAsync({});

            if (location) {
                setCoords(location.coords);
                getBarbers();
            }
            

            // Geolocation.getCurrentPosition((info)=>{
                
            // })
        }
    }

    const getBarbers = async() => {
        setLoading(true);
        setList([]);

        let res = await Api.getBarbers(locationText);
        if(res.error == ''){
            if(res.loc){
                setLocationText(res.loc)
            }
            setList(res.data);
        }else{
            alert("Erro:"+res.error);
        }

        setLoading(false);
    }

    //useEffect
    useEffect(()=>{
       getBarbers(); 
    },[]);

    return (
        <Container>
            <Scroller>

                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>
                        Encontre o seu barbeiro favorito
                    </HeaderTitle>
                    <SearchButton  onPress={()=>navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26"  fill="#FFF"/>
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput 
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFF"  
                        value={locationText}  
                        onChangeText={t=>setLocationText(t)}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24"  fill="#FFF" />
                    </LocationFinder>
                </LocationArea>

                {loading &&
                    <LoadingIcon size="large" color="#FFF"/>
                }

                <ListArea>
                    {list.map((item, k)=>(
                        <BarberItem key={k} data={item} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>    
    );
}