import React from 'react';
import styled from 'styled-components';

const Area = styled.View `
    background-color:#FFF;
    padding:15px;
    margin-bottom:20px;
    border-radius:20px;
`;

const UserArea = styled.View `
    flex:1;
    flex-direction:row;
    align-items:center;
`;

const Avatar = styled.Image `
    width:56px;
    height:56px;
    border-radius:20px;
    margin-right:20px;
`;

const UserName = styled.Text `
    font-size:18px;
    font-weight:bold;
    color:#000;
`;

const SplitArea = styled.View `
    flex-direction: row;
    justify-content:space-between;
    margin-top:10px;
`;

const ServiceText = styled.Text `
    font-size:16px;
    font-weight:bold;
    color:#000;
`;

const DateText = styled.Text `
    font-size:16px;
    font-weight:bold;
    color:#FFF;
    padding:10px 15px;
    border-radius:10px;
    background-color:#4EADBE;
`;

export default ({data}) => {
    return (
        <Area>
            <UserArea>
                <Avatar source={{uri:data.barber.avatar}} />
                <UserName>{data.barber.name}</UserName>
            </UserArea>

            <SplitArea>
                <ServiceText> {data.service.name} </ServiceText>
                <ServiceText>R${data.service.price.toFixed(2)}</ServiceText>
            </SplitArea>

            <SplitArea>
                <DateText> 99/99/9999 </DateText>
                <DateText>99:99</DateText>
            </SplitArea>
        </Area>
    )
}