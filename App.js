import React from 'react';
import { createDrawerNavigator, createStackNavigator ,createAppContainer } from "react-navigation";
import HomeScreen from './views/HomeScreen';
import { Ionicons, Entypo } from '@expo/vector-icons';
import * as Font from 'expo-font';
import ServicesScreen from './views/ServicesScreen/ServicesScreen';
import ContactScreen from './views/ContactScreen/ContactScreen';
import AboutScreen from './views/AboutScreen/AboutScreen';
import LoginScreen from './views/LoginScreen/LoginScreen';
import DashboardScreen from './views/DashboardScreen/DashboardScreen';
import { Root } from 'native-base';
import DetailsScreen from './views/DetailsScreen/DetailsScreen';
import DiscountScreen from './views/DiscountScreen';
import ContactDetails from './views/ContactDetails/ContactDetails';

export default class App extends React.Component {
  constructor(props) {
    super( props );
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount () {
    await Font.loadAsync( {
      'Roboto': require( 'native-base/Fonts/Roboto.ttf' ),
      'Roboto_medium': require( 'native-base/Fonts/Roboto_medium.ttf' ),
      ...Ionicons.font,
    } );
    this.setState( { fontLoaded: true } );
  }

  render() {
    return ( this.state.fontLoaded ?
      <Root>
        <AppContainer />
      </Root>
      : null );
  }
}

const AppNavigator = createDrawerNavigator( {
  // mainFlow: {
  //   screen: createDrawerNavigator( {
     
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor }) => (
            <Ionicons name="ios-home" color={tintColor} size={25} />
          ),
        },
      },
      Services: {
        screen: ServicesScreen,
        navigationOptions: {
          drawerLabel: 'Our Services',
          drawerIcon: ({ tintColor }) => (
            <Ionicons name="ios-cog" color={tintColor} size={25} />
          ),
        },
      },
      Contact: {
        screen: ContactScreen,
        navigationOptions: {
          drawerLabel: 'Order now',
          drawerIcon: ({ tintColor }) => (
            <Ionicons name="ios-timer" color={tintColor} size={25} />
          ),
        },
      },
      Discounts: {
        screen: DiscountScreen,
        navigationOptions: {
          drawerLabel: 'Offers & Discounts',
          drawerIcon: ({ tintColor }) => (
            <Ionicons name="ios-basket" color={tintColor} size={25} />
          ),
        },
      },
      About: {
        screen: AboutScreen,
        navigationOptions: {
          drawerLabel: 'About us',
          drawerIcon: ({ tintColor }) => (
            <Ionicons name="ios-information-circle-outline" color={tintColor}  size={25} />
          ),
        },
      },
      ContactDetails: {
        screen: ContactDetails,
        navigationOptions: {
          drawerLabel: 'Contact us',
          drawerIcon: ({ tintColor }) => (
            <Entypo name="old-phone" color={tintColor}  size={25} />
          ),
        },
      },
      // Login: {
      //   screen: LoginScreen,
      //   navigationOptions: {
      //     drawerLabel: 'Dashboard',
      //     drawerIcon: ({ tintColor }) => (
      //       <Ionicons name="ios-contact" color={tintColor}  size={25} />
      //     ),
      //   },
      // },
    },
    {
      contentOptions: {
        activeTintColor: '#2096F3',
        inactiveTintColor: '#333',
        inactiveBackgroundColor: 'transparent',
        labelStyle: {
          fontSize: 16,
        },
      },
      drawerWidth: 280
  //   }
  //   )
  // }
  // , LoginFlow: {
  //   screen: createDrawerNavigator( {
  //     Home: {
  //       screen: HomeScreen,
  //       navigationOptions: {
  //         drawerLabel: 'Home',
  //         drawerIcon: ({ tintColor }) => (
  //           <Ionicons name="ios-home" color={tintColor} size={25} />
  //         ),
  //       },
  //     },
  //     Services: {
  //       screen: ServicesScreen,
  //       navigationOptions: {
  //         drawerLabel: 'Our Services',
  //         drawerIcon: ({ tintColor }) => (
  //           <Ionicons name="ios-cog" color={tintColor} size={25} />
  //         ),
  //       },
  //     },
  //     Contact: {
  //       screen: ContactScreen,
  //       navigationOptions: {
  //         drawerLabel: 'Get a quote',
  //         drawerIcon: ({ tintColor }) => (
  //           <Ionicons name="ios-timer" color={tintColor} size={25} />
  //         ),
  //       },
  //     },
  //     About: {
  //       screen: AboutScreen,
  //       navigationOptions: {
  //         drawerLabel: 'About us',
  //         drawerIcon: ({ tintColor }) => (
  //           <Ionicons name="ios-information-circle-outline" color={tintColor}  size={25} />
  //         ),
  //       },
  //     },
  //     Dashboard: {
  //       screen: createStackNavigator( {
  //         DashboardScreen: {
  //           screen: DashboardScreen,
  //           navigationOptions: {
  //             header: null
  //           }
  //         },
  //         Details: {
  //           screen: DetailsScreen,
  //           navigationOptions: {
  //             header: null
  //           }
  //         },
         
  //       }),
  //       navigationOptions: {
  //         drawerLabel: 'Dashboard',
  //         drawerIcon: ({ tintColor }) => (
  //           <Ionicons name="ios-contact" color={tintColor}  size={25} />
  //         ),
  //       },
  //     },
  //     Login: {
  //       screen: LoginScreen,
  //       navigationOptions: {
  //         drawerLabel: 'Login with different email',
  //         drawerIcon: ({ tintColor }) => (
  //           <Ionicons name="ios-mail" color={tintColor}  size={25} />
  //         ),
  //       },
  //     },
  //   }
  //   )
  // }
}
 
);

const AppContainer = createAppContainer( AppNavigator );
