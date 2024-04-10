import React, { Fragment } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Header from './header';
// import Home from './dashboard';
import SideBar from './sidebar';
// import Shop from './view/shop';
import Product from './view/product';
import Category from './view/category';
import Areas from './view/tours';
import Location from './view/location';
import Order from './view/order';
import Customer from './view/customer';
import User from './view/user';
import Payment from './view/payment';
import VendorProduct from './view/shop/product';
import Voucher from './view/voucher';
import Contact from './view/contact';
import Tours from './view/tours';
import Blogs from './view/blog';
import { getCookie } from '../../function';
import GuardPage from './view/guard';
import RealEstate from './view/realestate';
import Hotel from './view/hotel';
import Ticket from './view/wrap-ticket';
import WrapTour from './view/wrap-tour';
import WrapBlog from './view/wrap-blog';
import WrapContact from './view/wrap-contact';
import Tickets from './view/ticket';
import NotFound from '../notfound';
import Profile from './view/profile';
import Index from './view/index';
import IndexAlertAirplane from './view/alert-airplane';

const RootRoutes = () => {
    const match = useRouteMatch();

    return (
        <main>
            {/* <Header /> */}
            <div id="layoutSidenav">
                <SideBar />
                <Switch>
                    {getCookie("role") === "admin" && (
                        <Fragment>
                            {/* <Route path={`${match.path}/`} component={Index} /> */}
                            <Route exact path={[`${match.path}/home`, `${match.path}`]} component={Index} />
                            {/* <Route path={`${match.path}/shop`} component={Shop} /> */}
                            <Route path={`${match.path}/user`} component={User} />
                            <Route path={`${match.path}/product`} component={Product} />
                            <Route path={`${match.path}/category`} component={Category} />
                            <Route path={`${match.path}/area`} component={Areas} />
                            <Route path={`${match.path}/location`} component={Location} />
                            <Route path={`${match.path}/order`} component={Order} />
                            <Route path={`${match.path}/customer`} component={Customer} />
                            <Route path={`${match.path}/payment`} component={Payment} />
                            <Route path={`${match.path}/vendor`} component={VendorProduct} />
                            <Route path={`${match.path}/voucher`} component={Voucher} />
                            <Route path={`${match.path}/realestate`} component={RealEstate} />
                            <Route path={`${match.path}/hotel`} component={Hotel} />
                            <Route path={`${match.path}/ticket`} component={Ticket} />
                            <Route path={`${match.path}/tour`} component={WrapTour} />
                            <Route path={`${match.path}/blog`} component={WrapBlog} />
                            <Route path={`${match.path}/contact`} component={WrapContact} />
                            <Route path={`${match.path}/p/:id/:subid`} component={Product} />
                            <Route path={`${match.path}/t/:id`} component={Tours} />
                            <Route path={`${match.path}/tk/:id`} component={Tickets} />
                            <Route path={`${match.path}/b/:id`} component={Blogs} />
                            <Route path={`${match.path}/c/:id`} component={Contact} />
                            <Route path={`${match.path}/profile`} component={Profile} />
                            <Route path={`${match.path}/custom`} component={IndexAlertAirplane} />
                            
                            {/* <Route path={`/admin/*`} >
                              <NotFound />
                            </Route> */}
                        </Fragment>
                    )}
                    {getCookie("role") === "fulltime" && (
                        <Fragment>
                            <Route exact path={[`${match.path}/home`, `${match.path}`]} component={Index} />
                            {/* <Route path={`${match.path}/shop`} component={Shop} /> */}
                            <Route path={`${match.path}/product`} component={Product} />
                            <Route path={`${match.path}/category`} component={Category} />
                            <Route path={`${match.path}/area`} component={Areas} />
                            <Route path={`${match.path}/location`} component={Location} />
                            <Route path={`${match.path}/order`} component={Order} />
                            <Route path={`${match.path}/customer`} component={Customer} />
                            <Route path={`${match.path}/payment`} component={Payment} />
                            <Route path={`${match.path}/vendor`} component={VendorProduct} />
                            <Route path={`${match.path}/voucher`} component={Voucher} />
                            <Route path={`${match.path}/realestate`} component={RealEstate} />
                            <Route path={`${match.path}/hotel`} component={Hotel} />
                            <Route path={`${match.path}/ticket`} component={Ticket} />
                            <Route path={`${match.path}/tour`} component={WrapTour} />
                            <Route path={`${match.path}/blog`} component={WrapBlog} />
                            <Route path={`${match.path}/contact`} component={WrapContact} />
                            <Route path={`${match.path}/p/:id/:subid`} component={Product} />
                            <Route path={`${match.path}/t/:id`} component={Tours} />
                            <Route path={`${match.path}/tk/:id`} component={Tickets} />
                            <Route path={`${match.path}/b/:id`} component={Blogs} />
                            <Route path={`${match.path}/c/:id`} component={Contact} />
                            <Route path={`${match.path}/profile`} component={Profile} />
                            <Route path={`${match.path}/custom`} component={IndexAlertAirplane} />
                        </Fragment>
                    )}
                    {getCookie("role") === "parttime" && (
                        <Fragment>
                            <Route exact path={[`${match.path}/home`, `${match.path}`]} component={Index} />
                            {/* <Route path={`${match.path}/shop`} component={Shop} /> */}
                            <Route path={`${match.path}/product`} component={GuardPage} />
                            <Route path={`${match.path}/category`} component={GuardPage} />
                            <Route path={`${match.path}/area`} component={GuardPage} />
                            <Route path={`${match.path}/tour`} component={GuardPage} />
                            <Route path={`${match.path}/location`} component={GuardPage} />
                            <Route path={`${match.path}/order`} component={GuardPage} />
                            <Route path={`${match.path}/customer`} component={GuardPage} />
                            <Route path={`${match.path}/payment`} component={GuardPage} />
                            <Route path={`${match.path}/vendor`} component={GuardPage} />
                            <Route path={`${match.path}/voucher`} component={GuardPage} />
                            <Route path={`${match.path}/contact`} component={GuardPage} />
                            <Route path={`${match.path}/user`} component={GuardPage} />
                            <Route path={`${match.path}/t/:id`} component={Tours} />
                            <Route path={`${match.path}/tk/:id`} component={Tickets} />
                            <Route path={`${match.path}/b/:id`} component={Blogs} />
                            <Route path={`${match.path}/c/:id`} component={Contact} />
                            <Route path={`${match.path}/profile`} component={Profile} />
                            <Route path={`${match.path}/blog`} component={WrapBlog} />
                        </Fragment>
                    )}
                </Switch>
            </div>
        </main>
    );
};

export default RootRoutes;
