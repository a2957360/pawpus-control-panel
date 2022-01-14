import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import Media from './Media';
import Store from './Store';
// import Attribute from './Attribute';
import Category from './Category';
// import Item from './ItemFood';
import spot from './spot';
// import Order from './Order';
import User from './User';
// import Statistics from './Statistics';
import admin from './admin';

import HomePage from './homePage';
import Blog from './blog';
import Social from './social';
import Gallery from './gallery';
import Server from './Server';
import Service from './Service';
import Pet from './pet';
import post from './post';
import item from './item';
import itemOption from './itemOption';
import itemOrder from './itemOrder';
import serviceOrder from './serviceOrder';
import review from './review';
import coupon from './coupon';
import moment from './moment';
import exchange from './exchange';
import config from './config';
import deliver from './deliver';



export default combineReducers({
    theme: Theme,
    auth: Auth,
    mediaData: Media,
    storeData: Store,
    // attributeData: Attribute,
    categoryData: Category,
    // itemData: Item,
    spotData: spot,
    // orderData: Order,
    userData: User,
    // statisticsData: Statistics,
    adminData: admin,
    homePageData: HomePage,
    blogData: Blog,
    socialData: Social,
    galleryData: Gallery,
    serverData: Server,
    serviceData: Service,
    petData: Pet,
    postData: post,
    itemData: item,
    itemOptionData: itemOption,
    itemOrderData: itemOrder,
    serviceOrderData: serviceOrder,
    reviewData: review,
    couponData: coupon,
    momentData: moment,
    exchangeData: exchange,
    configData: config,
    deliverData: deliver,
    
});

// export default reducers;