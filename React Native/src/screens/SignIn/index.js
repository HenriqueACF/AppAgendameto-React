import React, {useState, useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { UserContext } from '../../contexts/UserContext';

import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';

//api
import Api from '../../Api';

//components
import SignInput from '../../components/SignInput';

//svg
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () =>{
  const { dispatch: userDispatch } = useContext(UserContext);
  //navigation
  const navigation = useNavigation();

  //states
  const [emaiField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  //functions
  const handleSignClick = async() =>{
    if(emaiField != '' && passwordField != ''){
      let json = await Api.signIn(emaiField, passwordField);
      if(json.token){
        await AsyncStorage.setItem('token', json.token);

        userDispatch({
          type: 'setAvatar',
          payload:{
            avatar:json.data.avatar
          }
        })

        navigation.reset({
          routes:[{name:'MainTab'}]
        })

      }else{
        alert('E-mail e/ou senha errados!')
      }
    }else{
      alert('Preencha os campos!')
    }
  }

  const handleMessageButtonClick = () =>{
    navigation.reset({
      routes: [{name: 'SignUp'}]
    });
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160"/>

      <InputArea>
        
        <SignInput 
          IconSvg={EmailIcon}
          placeholder="Digite seu e-mail" 
          value={emaiField}
          onChangeText={t => setEmailField(t)}
        />

        <SignInput 
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={t => setPasswordField(t)}
          password={true}
        />

        <CustomButton>
            <CustomButtonText onPress={handleSignClick}>
              Login
            </CustomButtonText>
        </CustomButton>

      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
          <SignMessageButtonText>Ainda nao possui uma conta?</SignMessageButtonText>
          <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>

    </Container>
  )
}