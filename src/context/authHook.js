import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useCallback, useEffect} from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback(async (uid, token) => {
    setToken(token);
    setUserId(uid);
    const jsonValue = JSON.stringify({
      userId: uid,
      token: token,
    });
    await AsyncStorage.setItem('userData', jsonValue);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    AsyncStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const jsonValue = await AsyncStorage.getItem('userData');
        const storedData = jsonValue !== null ? JSON.parse(jsonValue) : null;
        if (storedData && storedData.token) {
          login(storedData.userId, storedData.token);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    }
    fetchUserData();
  }, [login]);

  return {token, userId, login, logout};
};
