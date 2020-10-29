import React,{ useState, useEffect } from 'react';
import { Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Container } from './styles';

//Api
import Api from '../../Api';

export default () =>{
    const navigation = useNavigation();
    const route = useRoute();

    //states
    const [ userInfo, setUserInfo ] = useState({
        id:route.params.id,
        avatar:route.params.avatar,
        name:route.params.name,
        stars:route.params.stars,
    });

    const [ loading, setLoading ] = useState(false);

    useEffect(()=>{
        const getBarberInfo = async() =>{
            setLoading(true);

            let json = await Api.getBarber(userInfo.id);
            if(json.error == ''){
                setUserInfo(json.data);
            }else{
                alert(`Erro: ${json.error}`);
            }
            setLoading(false);
        }
        getBarberInfo();
    }, [])

    return (
        <Container>
            <Text>  Barbeeiro: {userInfo.name} </Text>
        </Container>    
    );
}