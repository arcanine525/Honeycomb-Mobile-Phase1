import { createStackNavigator } from 'react-navigation'
import DrawerNav from '../Navigation/ManagerAppNavigation'
import UserNav from '../Navigation/UserAppNavigation'
import Login from '../Login'

const MainStack = createStackNavigator(
  {
    "Login":
    {
      screen: Login
    },
    ManagerNav:
    {
      screen: DrawerNav
    },
    UserNav:
    {
      screen: UserNav
    }
  },
  {
    initialRouteName: "Login",
    headerMode: 'none'
  }
)

export default MainStack