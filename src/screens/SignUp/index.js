import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';

//components
import SignInput from '../../components/SignInput';

//svg
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';

export default () =>{
  //navigation
  const navigation = useNavigation();

  //states
  const [nameField, setNameField] = useState('');
  const [emaiField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  //functions
  const handleSignClick = () =>{

  }

  const handleMessageButtonClick = () =>{
    navigation.reset({
      routes: [{name: 'SignIn'}]
    });
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160"/>

      <InputArea>
        <SignInput 
          IconSvg={PersonIcon}
          placeholder="Digite seu nome" 
          value={nameField}
          onChangeText={t => setNameField(t)}
        />
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
              Cadastrar
            </CustomButtonText>
        </CustomButton>

      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
          <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
          <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
      </SignMessageButton>

    </Container>
  )
}