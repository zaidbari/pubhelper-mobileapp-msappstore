import React from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { LoginScreenWrapper } from './LoginScreen.styles';
import { Form, Item, Input, Label, Icon, Button, Text, Toast } from 'native-base';
import { Keyboard, TouchableWithoutFeedback, AsyncStorage } from 'react-native'
import axios from 'axios'
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import * as EmailValidator from 'email-validator';

class LoginScreen extends React.Component {
  constructor ( props ) {
    super( props );
    this.state = {
      secure: true,
      email: '',
      error: null,
      showToast: false,
      data: null,
      loginIn: false,
      disabled: true
    }

    this._changeIcon = this._changeIcon.bind( this )
    this._handleChange = this._handleChange.bind( this )
    this._handleLogin = this._handleLogin.bind( this )
  }

  _handleChange ( text, name ) {
    this.setState( {
      [ name ]: text
    } )
  }
  _handelValidation  () {
     AsyncStorage.setItem( 'Auth', null )
    
    if ( EmailValidator.validate( this.state.email ) ) {
      this.setState({disabled: false})
    } else {
      this.setState( { disabled: true } )
      Toast.show({
        text: "Please input a valid email address",
        buttonText: "Okay",
        position: "top",
        type: "danger",
        duration: 3000

      })
    }
  }

  async componentDidMount () {
    await AsyncStorage.setItem( 'Auth', null )

  }

  _handleLogin = async () => {

    this.setState({loginIn: true})
     axios.post( 'http://pubhelper.objapptive.com/login/pwdless ', JSON.stringify( { email: this.state.email } ) )
      .then( response => {
        if ( response.data.success !== undefined ) {
          
          AsyncStorage.setItem( 'Auth', JSON.stringify( response.data.success ) )
          this.props.navigation.navigate( 'DashboardScreen')
          this.setState({loginIn: false})
          
        } else {
          this.setState( { error: response.data.error, showToast: true, disabled: true, loginIn: false }, () => {
            Toast.show({
              text: "Input correct email address",
              buttonText: "Okay",
              position: "top",
              type: "warning",
              duration: 3000
            })
          } )
        }

      } )
      .catch( error => {
        console.log( error );
        this.setState( { error: "Something Went wrong. Please contact Administartor", showToast: true }, () => {
          Toast.show({
            text: this.state.error,
            buttonText: "Okay",
            position: "top",
            type: "danger",
            duration: 3000

          })
        })
      } )
  }

  _changeIcon () {
    this.setState( prevState => ( {
      icon: prevState.icon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      secure: !prevState.secure
    } ) )
  }

  render () {
    return (
      <>
      <HeaderComponent title="Login" />
      <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
        <LoginScreenWrapper>
        <Image
          source={ require( '../../assets/bg.png' ) }
          style={ { position: 'absolute', top: -600, right: -160, width: 300 } }
          resizeMode="contain"
        />
          <Form style={ { width: 300, paddingTop: 30 } }>
            <Item floatingLabel>
              <Label >Email</Label>
              <Input
                type="email"
                onChangeText={ ( text ) => this._handleChange( text, 'email' ) }
                name="email"
                autoCapitalize="none"
                keyboardType="email-address"
                onSubmitEditing={ Keyboard.dismiss }
                autoCorrect={ false }
                required
                onBlur={ ( text ) =>this._handelValidation(text)}
              />
              <Icon style={ { color: '#2096F3' } } name="ios-mail" />
            </Item>
            <Button
              bordered
              rounded
              block
              iconRight
              style={ {
                marginTop: 30,
                width: '60%',
                marginLeft: '20%',
                opacity: this.state.disabled ? 0.6 : 1,
                backgroundColor: this.state.disabled ? '#999' : '#2096F3'
              } }
              onPress={ this._handleLogin }
              disabled={this.state.disabled}
            >
              { !this.state.loginIn ? <Text style={{color: "#fff"}}>Login</Text> : <ActivityIndicator size="large" color="#fff" /> }
              { !this.state.loginIn ? <Icon name='ios-log-in' style={{color: "#fff"}} /> : null }

            </Button>
          </Form>
        </LoginScreenWrapper>
        </TouchableWithoutFeedback>
        </>
    );
  }
}

export default LoginScreen;
