import React, {useState} from 'react';
import { 
    Container,
    SearchArea,
    SearchInput,
} from './styles';

export default () =>{

    const [searchText, setSearchText] = useState('');

    const searchBarbers = () =>{

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
        </Container>    
    );
}