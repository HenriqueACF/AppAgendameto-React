import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
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
    LoadingIcon
} from './styles';

//svg
import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

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
        let result = await request(
            Platform.OS === 'ios' 
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION 
        );

        if(result === 'granted'){

            setLoading(true);
            setLocationText('');
            setList([]);

            Geolocation.getCurrentPosition((info)=>{
                setCoords(info.coords);
                getBarbers();
            })
        }
    }

    const getBarbers = async() => {
        setLoading(true);
        setList([]);

        let res = await Api.getBarbers();
        if(res.error == ''){

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

            </Scroller>
        </Container>    
    );
}