import React, {useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import { 
    Container,
    HeaderArea,
    HeaderTitle,
    Scroller,
    LoadingIcon,
    ListArea,
    EmptyWarning
} from './styles';

//api
import Api from '../../Api';

//components
import BarberItem from '../../components/BarberItem';

export default () =>{

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    useEffect(()=>{
        getFavorites();   
    }, [])

    const getFavorites = async () =>{
        setLoading(true);
        setList([]);

        let res = await Api.getFavorites();
        if(res.error == ''){
            if(res.list.length > 0){
                setList(res.list);
            }else{
                alert('Error: ' + res.error);
        }

        setLoading(false);
    }

    return (
        <Container>

            <HeaderArea>
                <HeaderTitle>Favoritos</HeaderTitle>
            </HeaderArea>

            <Scroller  refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={getFavorites} /> 
            }>

            {!loading && list.length === 0 &&
                <EmptyWarning>Não há favoritos.</EmptyWarning>
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
}