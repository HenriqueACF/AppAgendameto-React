import React, {useState} from 'react';
import { 
    Container,
    SearchArea,
    SearchInput,
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

    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [emptyList, setEmptyList] = useState(false);
    const [list, setList] = useState([])

    const searchBarbers = async () =>{
        setEmptyList(false);
        setLoading(true);
        setList([]);

        if(searchText != ''){
            let res = await Api.search(searchText);
            if(res.error == ''){
                if(res.list.length > 0){
                    setList(res.list);
                }else{
                    setEmptyList(true);
                }
            }else{
                alert('Error: ' + res.error);
            }
        }

        setLoading(false);
    }

    return (
        <Container>
            <SearchArea>
                <SearchInput 
                    placeholder="Digite aqui..."
                    placeholderTextColor="#FFF"
                    value={searchText}
                    onChangeText={t =>setSearchText(t)}
                    onEndEditing={searchBarbers}
                    returnKey="search"
                    autoFocus
                    selectTextOnFocus
                />
            </SearchArea>

            <Scroller>
                {loading &&
                    <LoadingIcon size="large" color="#000" />
                }

                {emptyList &&
                    <EmptyWarning>'Não encontramos nenhum: '${searchText}</EmptyWarning>
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