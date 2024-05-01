import React, { createContext, useEffect, useState } from 'react';
import rootRoutes from './components/admin/rootRoutes';
import Auth from './components/auth';
import NoMatch from './components/nomatch';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
// import PrivateRoute from './components/auth/PrivateRoute';
import { getCookie } from './function';
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import get_info_user from './api/get_info_user';
import "./index.css"

export const AppContext= createContext()
const App = () => {
	const [change, setChange]= useState(false)
	const [dataUser, setDataUser]= useState({avatar: undefined, address: "", email: "", phone: ""})
	const [dataUserManager, setDataUserManager]= useState({avatar: undefined, address: "", email: "", phone: ""})
	useEffect(()=> {
		(async ()=> {
			const result= await get_info_user()
			if(result.ok== true) {
				setDataUser(result.data)
				setDataUserManager(result.dataManager)
			}
		})()
	}, [change])

    return (
        <AppContext.Provider value={{user: dataUser, userManager: dataUserManager, change, setChange}}>
			<div className="App">
				<BrowserRouter>
					<NotificationContainer />
					<Switch>
						<Route path='/auth' component={Auth} />
						{getCookie('token') ? <Route path='/admin' component={rootRoutes} /> : <Redirect to={"/auth/login"} />}
						{getCookie('token') ? <Redirect to={"/admin"} /> : <Redirect to={"/auth/login"} />}
						<Route component={NoMatch} />
					</Switch>
				</BrowserRouter>
        	</div>
		</AppContext.Provider>
    );
}

export default App;
