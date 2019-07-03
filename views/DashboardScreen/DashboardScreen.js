import React from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { DashboardScreenWrapper, DashboardCard } from './DashboardScreen.styles';
import { AsyncStorage, Dimensions, Image, View } from 'react-native'
import axios from 'axios';
import { Content,Text, Button } from 'native-base';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
var { width } = Dimensions.get( 'window' )
import {NavigationEvents} from 'react-navigation';

class DashboardScreen extends React.Component {
  constructor ( props ) {
    super( props );
    this.state = {
      name: 'Customer',
      leads: [],
      isLoading: true
    }

    this._timeConverter = this._timeConverter.bind( this )
    this._servicesConverter = this._servicesConverter.bind( this )
    this._handleFetch = this._handleFetch.bind( this )
  }

  _handleFetch = async () => {
     this.setState({leads: [], isLoading: true})
    const currentUser = await AsyncStorage.getItem( 'Auth' )
    const user = JSON.parse( currentUser )
    const customerId = user.customerId
    axios.get( `http://pubhelper.objapptive.com/customers/leads/${ customerId }` )
      .then( response => {
        this.setState( {
          leads: response.data,
          isLoading: false
        } )
      } )
  }
  
   componentDidMount () {

    this._handleFetch()


  }

  _timeConverter ( UNIX_timestamp ) {
    if ( UNIX_timestamp == null ) { return "N/A" } else {
      var a = new Date( UNIX_timestamp * 1000 );
      var months = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ];
      var year = a.getFullYear();
      var month = months[ a.getMonth() ];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      // var sec = a.getSeconds();
      if ( hour < 10 ) { hour = '0' + hour }
      if ( min < 10 ) { min = '0' + min }
      var time = date + '/' + month + '/' + year + ' @ ' + hour + ':' + min
      return time;
    }
  }
  _servicesConverter ( serviceList ) { return serviceList.split( ',' ) }

  render () {
    return (
      <>
        <NavigationEvents onDidFocus={ this._handleFetch } />

        { this.state.isLoading ?
          <DashboardScreenWrapper>
            <ActivityIndicator size="large" color="#2096f3" />
          </DashboardScreenWrapper> :
          <>
            <Image
              source={ require( '../../assets/bg.png' ) }
              style={ { position: 'absolute', top: -600, right: -160, width: 300 } }
              resizeMode="contain"
            />
            <HeaderComponent title="Dashboard" />
            <ScrollView>
          
              <Content padder>
                { this.state.leads.map( ( lead, index ) => (
                  <DashboardCard key={ index } style={ { marginLeft: ( width / 2 ) - 160 } }>
                    <Text style={ { color: "#2096f3", fontSize: 18 } }>
                      Created @:
                    <Text style={ { color: "#444" } }>{ ' ' }{ this._timeConverter( lead.createDate ) }</Text>
                    </Text>
              
                    <Text style={ { color: "#2096f3", marginTop: 10 } }>
                      Required Services:
                </Text>
                
                    { this._servicesConverter( lead.message ).map( ( service, index ) => (
                      <Text key={ index } style={ { color: "#444" } }>{ index + 1 }:{ ' ' }{ service }</Text>
                    ) )
                    }
                    <View style={ { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } }>
                  
                      <Text style={ {
                        color:
                          lead.status === "Pending" ? "#f0ad4e" : null ||
                            lead.status === "In Negotiation" ? "#62B1F6" : null ||
                              lead.status === "Project Initiat" ? "#5cb85c" : null ||
                                lead.status === "Project Initiated" ? "#5cb85c" : null ||
                                  lead.status === "Closed" ? "#d9534f" : null ||
                                    lead.status === "Completed" ? "#2096f3" : null
                        ,
                        marginTop: 20,
                        fontSize: 26
                      } }>
                        { lead.status }
                      </Text>
                      <Button onPress={() => this.props.navigation.navigate('Details', {leadid: lead.id})} style={ { backgroundColor: '#2096f3', marginTop: 20 } } small rounded>
                        <Text>Details</Text>
                      </Button>
                    </View>
                  </DashboardCard>

                ) ) }

              </Content>
            </ScrollView>
          </>
        }
        </>
    );
  }
}

export default DashboardScreen;
