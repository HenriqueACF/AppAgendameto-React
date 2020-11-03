import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView `
    flex:1;
    background-color:#63C2D1;
`;

export const SearchArea = styled.View `
    background-color:#4EADBE;
    height:40px;
    border-radius:20px;
    padding:0 20px;
    margin:20px;
`;

export const SearchInput = styled.TextInput `
    flex:1;
    font-size:16px;
    color:#FFF;
`;