import { AsyncStorage } from "react-native";

setAuthToken = async (token) => {
    try {
        await AsyncStorage.setItem('@AuthStore:token', token);
    } catch (error) {
        console.log('Setting token', error);
    }
}

getAuthToken = () => {
    try {
        return AsyncStorage.getItem('@AuthStore:token');
    } catch(error) {
        console.log('Getting token', error);
    }
}

clearToken = () => {
    AsyncStorage.removeItem('@AuthStore:token');
}

export { setAuthToken, getAuthToken, clearToken };