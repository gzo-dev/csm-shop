import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';
import { setCookie, getCookie, eraseCookie } from '../../../function';

const getUserLogin = async (data) => {
    try {
        let result = await api.post(Apis.GetUserLogin, data, {
            withCredentials: true,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUserRegister = async (data) => {
    try {
        let result = await api.post(Apis.GetUserRegsiter, data, {
            headers: {
                "Authorization": "Bearer " + getCookie("token")
            }
        });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        return error?.response;
    }
};

const getAllUserList = async () => {
    try {
        let result = await api.get(Apis.GetAllUserList);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUserUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetUserUpdate, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getDeleteUserList = async (id) => {
    try {
        let result = await api.post(Apis.GetDeleteUserList, {
            id: id
        });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const authenticate = (user, next) => {
    if (typeof window !== "undefined") {
        if(user.success=== false && user.third !== true) {
            next()
        }
        else if (user.third === true) {
            alert("Bạn không thể đăng nhập trên thiết bị này")
        }
        else if (user.deviceCode) {
            localStorage.setItem("deviceCode", user.deviceCode)
            setCookie('token', user.token, 14400);
            setCookie('role', user.role, 14400);
            setCookie("auid", user.auid, 14400)
            setCookie("name", user.name, 14400)
        }
        else {
            alert("Bạn không thể đăng nhập trên thiết bị này")
        }
        next();
    }
};
const logout = (next) => {
    if (typeof window !== "undefined") {
        eraseCookie('token');
        eraseCookie('role');
        eraseCookie('XSRF-token');
        eraseCookie("auid")
        // window.location.reload();
        window.location.href="/auth/login";
        // next();
    }
};

const isAuthenticate = (next) => {
    if (typeof window !== "undefined") {
        return false
    }
    if (getCookie('token')) {
        return JSON.stringify(getCookie('token'));
    } else {
        return false
    }
};

export default {
    getUserLogin,
    getAllUserList,
    getUserUpdate,
    getDeleteUserList,
    authenticate,
    getUserRegister,
    logout,
    isAuthenticate
};