import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect,HashRouter } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH,AUTH_PREFIX_PATH } from 'configs/AppConfig'
import { useHistory } from "react-router-dom";


export const AppViews = () => {
	let history = useHistory();
  const adminId = localStorage.getItem("adminId");
  const adminType = localStorage.getItem("adminType");
  if(adminId == null){
    history.push(`/auth/login`);
  }
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        {/* <Route path={`${APP_PREFIX_PATH}/statistics`} component={lazy(() => import(`./statistics/Statistics`))} /> */}
        {
          adminType == 1 &&
          <>
            <Route path={`${APP_PREFIX_PATH}/admin`} component={lazy(() => import(`./admin/List`))} />
            <Route path={`${APP_PREFIX_PATH}/admin-add`} component={lazy(() => import(`./admin/Add`))} />
            <Route path={`${APP_PREFIX_PATH}/admin-edit/:params`} component={lazy(() => import(`./admin/Edit`))} />
            <Route path={`${APP_PREFIX_PATH}/user`} component={lazy(() => import(`./user/Users`))} />

            <Route path={`${APP_PREFIX_PATH}/homepage`} component={lazy(() => import(`./homepage/List`))} />
            <Route path={`${APP_PREFIX_PATH}/homepage-add`} component={lazy(() => import(`./homepage/Add`))} />
            <Route path={`${APP_PREFIX_PATH}/homepage-edit/:params`} component={lazy(() => import(`./homepage/Edit`))} />

            <Route path={`${APP_PREFIX_PATH}/coupon`} component={lazy(() => import(`./coupon/List`))} />

            <Route path={`${APP_PREFIX_PATH}/server`} component={lazy(() => import(`./server/List`))} />
            <Route path={`${APP_PREFIX_PATH}/serverBlock`} component={lazy(() => import(`./server/blockList`))} />
            <Route path={`${APP_PREFIX_PATH}/serverWait`} component={lazy(() => import(`./server/WaitList`))} />
            <Route path={`${APP_PREFIX_PATH}/orderList`} component={lazy(() => import(`./server/orderList`))} />
            <Route path={`${APP_PREFIX_PATH}/review`} component={lazy(() => import(`./server/reviewList`))} />
            <Route path={`${APP_PREFIX_PATH}/server-add`} component={lazy(() => import(`./server/Add`))} />
            <Route path={`${APP_PREFIX_PATH}/server-edit/:params`} component={lazy(() => import(`./server/Edit`))} />
            <Route path={`${APP_PREFIX_PATH}/serverExchange`} component={lazy(() => import(`./server/exchange`))} />
            <Route path={`${APP_PREFIX_PATH}/serviceStatistic`} component={lazy(() => import(`./server/serviceStatistic`))} />
            <Route path={`${APP_PREFIX_PATH}/serviceConfig`} component={lazy(() => import(`./server/config`))} />

            <Route path={`${APP_PREFIX_PATH}/service-add`} component={lazy(() => import(`./service/Add`))} />
            <Route path={`${APP_PREFIX_PATH}/service-edit/:params`} component={lazy(() => import(`./service/Edit`))} />

            <Route path={`${APP_PREFIX_PATH}/social`} component={lazy(() => import(`./social/List`))} />
            <Route path={`${APP_PREFIX_PATH}/social-add`} component={lazy(() => import(`./social/Add`))} />
            <Route path={`${APP_PREFIX_PATH}/social-edit/:params`} component={lazy(() => import(`./social/Edit`))} />

            <Route path={`${APP_PREFIX_PATH}/gallery`} component={lazy(() => import(`./gallery/List`))} />
            <Route path={`${APP_PREFIX_PATH}/gallery-add`} component={lazy(() => import(`./gallery/Add`))} />
            <Route path={`${APP_PREFIX_PATH}/gallery-edit/:params`} component={lazy(() => import(`./gallery/Edit`))} />

            <Route path={`${APP_PREFIX_PATH}/media`} component={lazy(() => import(`./media/Media`))} />

            <Route path={`${APP_PREFIX_PATH}/post`} component={lazy(() => import(`./post/List`))} />
            <Route path={`${APP_PREFIX_PATH}/postOtherList`} component={lazy(() => import(`./post/otherList`))} />
            <Route path={`${APP_PREFIX_PATH}/post-add`} component={lazy(() => import(`./post/Add`))} />
            <Route path={`${APP_PREFIX_PATH}/post-edit/:params`} component={lazy(() => import(`./post/Edit`))} />

            <Route path={`${APP_PREFIX_PATH}/moment`} component={lazy(() => import(`./moment/List`))} />
            <Route path={`${APP_PREFIX_PATH}/momentReport`} component={lazy(() => import(`./moment/reportList`))} />
            <Route path={`${APP_PREFIX_PATH}/moment-add`} component={lazy(() => import(`./moment/Add`))} />
            <Route path={`${APP_PREFIX_PATH}/moment-edit/:params`} component={lazy(() => import(`./moment/Edit`))} />

            <Route path={`${APP_PREFIX_PATH}/item`} component={lazy(() => import(`./item/List`))} />
            <Route path={`${APP_PREFIX_PATH}/item-add`} component={lazy(() => import(`./item/Add`))} />
            <Route path={`${APP_PREFIX_PATH}/item-edit/:params`} component={lazy(() => import(`./item/Edit`))} />
            <Route path={`${APP_PREFIX_PATH}/itemCategory`} component={lazy(() => import(`./item/category`))} />
            <Route path={`${APP_PREFIX_PATH}/itemSubCategory`} component={lazy(() => import(`./item/subCategory`))} />
            <Route path={`${APP_PREFIX_PATH}/petCategory`} component={lazy(() => import(`./item/petCategory`))} />
            <Route path={`${APP_PREFIX_PATH}/petSubCategory`} component={lazy(() => import(`./item/petSubCategory`))} />
            <Route path={`${APP_PREFIX_PATH}/itemOrder`} component={lazy(() => import(`./item/itemOrder`))} />
            <Route path={`${APP_PREFIX_PATH}/itemStatistic`} component={lazy(() => import(`./item/itemStatistic`))} />
            <Route path={`${APP_PREFIX_PATH}/itemSummary`} component={lazy(() => import(`./item/itemSummary`))} />

            <Route path={`${APP_PREFIX_PATH}/serviceCategory`} component={lazy(() => import(`./serviceCategory/category`))} />
            <Route path={`${APP_PREFIX_PATH}/serviceSubCategory`} component={lazy(() => import(`./serviceCategory/subCategory`))} />
            <Route path={`${APP_PREFIX_PATH}/serviceExtra`} component={lazy(() => import(`./serviceCategory/extra`))} />
            <Route path={`${APP_PREFIX_PATH}/serviceFacility`} component={lazy(() => import(`./serviceCategory/facility`))} />
            <Route path={`${APP_PREFIX_PATH}/serviceHouseType`} component={lazy(() => import(`./serviceCategory/houseType`))} />

            <Route path={`${APP_PREFIX_PATH}/companyConfig`} component={lazy(() => import(`./company/config`))} />

            <Route path={`${APP_PREFIX_PATH}/deliver`} component={lazy(() => import(`./deliver/List`))} />
            <Route path={`${APP_PREFIX_PATH}/deliver-add`} component={lazy(() => import(`./deliver/Add`))} />
            <Route path={`${APP_PREFIX_PATH}/deliver-edit/:params`} component={lazy(() => import(`./deliver/Edit`))} />

            <Route path={`${APP_PREFIX_PATH}/logout`} component={lazy(() => import(`./logout/Logout`))} />
          </>
          ||
          <>
            <Route path={`${APP_PREFIX_PATH}/item`} component={lazy(() => import(`./item/List`))} />
            <Route path={`${APP_PREFIX_PATH}/item-add`} component={lazy(() => import(`./item/Add`))} />
            <Route path={`${APP_PREFIX_PATH}/item-edit/:params`} component={lazy(() => import(`./item/Edit`))} />
            <Route path={`${APP_PREFIX_PATH}/itemCategory`} component={lazy(() => import(`./item/category`))} />
            <Route path={`${APP_PREFIX_PATH}/itemSubCategory`} component={lazy(() => import(`./item/subCategory`))} />
            <Route path={`${APP_PREFIX_PATH}/petCategory`} component={lazy(() => import(`./item/petCategory`))} />
            <Route path={`${APP_PREFIX_PATH}/petSubCategory`} component={lazy(() => import(`./item/petSubCategory`))} />
            <Route path={`${APP_PREFIX_PATH}/itemOrder`} component={lazy(() => import(`./item/itemOrder`))} />
            <Route path={`${APP_PREFIX_PATH}/itemStatistic`} component={lazy(() => import(`./item/itemStatistic`))} />

            <Route path={`${APP_PREFIX_PATH}/coupon`} component={lazy(() => import(`./coupon/List`))} />
            
            <Route path={`${APP_PREFIX_PATH}/logout`} component={lazy(() => import(`./logout/Logout`))} />
          </>
        }

        {/* <Route path={`${APP_PREFIX_PATH}/order`} component={lazy(() => import(`./orders/Orders`))} />

        // <Route path={`${APP_PREFIX_PATH}/media`} component={lazy(() => import(`./media/Media`))} />

        <Route path={`${APP_PREFIX_PATH}/user`} component={lazy(() => import(`./user/Users`))} />

        <Route path={`${APP_PREFIX_PATH}/food`} component={lazy(() => import(`./food/FoodList`))} />
        <Route path={`${APP_PREFIX_PATH}/food-add`} component={lazy(() => import(`./food/FoodAdd`))} />
        <Route path={`${APP_PREFIX_PATH}/food-edit/:params`} component={lazy(() => import(`./food/FoodEdit`))} />

        <Route path={`${APP_PREFIX_PATH}/qrcode`} component={lazy(() => import(`./qrcode/QRcode`))} />

        <Route path={`${APP_PREFIX_PATH}/specification`} component={lazy(() => import(`./specification/SpecificationList`))} />
        <Route path={`${APP_PREFIX_PATH}/specification-add`} component={lazy(() => import(`./specification/SpecificationAdd`))} />
        <Route path={`${APP_PREFIX_PATH}/specification-edit/:params`} component={lazy(() => import(`./specification/SpecificationEdit`))} />

        <Route path={`${APP_PREFIX_PATH}/category`} component={lazy(() => import(`./category/categoryList`))} />

        <Route path={`${APP_PREFIX_PATH}/store`} component={lazy(() => import(`./store/StoreProfile`))} /> */}

        {/* <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/order`} /> */}
        {/* <Redirect from={`${APP_PREFIX_PATH}`} to={`${AUTH_PREFIX_PATH}/login`} /> */}
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);
