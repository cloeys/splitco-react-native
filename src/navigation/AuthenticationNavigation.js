import { StackNavigator } from 'react-navigation';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const AuthenticationNavigation = StackNavigator({
    Home: {
        screen: LoginPage
    },
    Register: {
        screen: RegisterPage
    }
});

export default AuthenticationNavigation;