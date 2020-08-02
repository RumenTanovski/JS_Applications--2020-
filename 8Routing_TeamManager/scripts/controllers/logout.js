import * as api from '../data.js';

export default async function () {

    const logoutUser = await api.logout();
    if (logoutUser.code) {
        throw logoutUser;
    }
    
    this.app.userData.loggedIn = false;
    this.app.userData.hasTeam = false;
    this.app.userData.username = undefined;
    this.app.userData.userId = undefined;
    this.app.userData.teamId = undefined;
    
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    
    this.redirect('#/home');
};