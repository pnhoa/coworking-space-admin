import CategoryList from 'containers/Category/List'
import CustomerList from 'containers/Customer/List'
import DashboardPage from 'containers/Dashboard'
import EmployeeList from 'containers/Employee/List'
import SpaceList from 'containers/Space/List'
import Profile from 'containers/Profile/Show'
import PrivateLayout from 'layouts/PrivateLayout'
import { flatMap, map } from 'lodash'
import { Redirect, Switch } from 'react-router-dom'
import { IBasePrivateRoute, IPrivateRoute, TPrivateRoutes } from 'routes/interface'
import PrivateRoute from './PrivateRoute'
import ServicePackList from 'containers/ServicePack/List'
import SpaceDetail from 'containers/Space/Show'
import BookingList from 'containers/Booking/List'

const routes: TPrivateRoutes = [
  {
    path: '/',
    Component: DashboardPage,
    exact: true,
    title: 'Dashboard',
  },
  {
    path: '/profile',
    Component: Profile,
    exact: true,
    title: 'Profile',
  },
  {
    path: '/spaces',
    routes: [
      {
        path: '/',
        Component: SpaceList,
      },
      {
        path: '/:id/show',
        Component: SpaceDetail,
      },
    ],
    exact: true,
    title: 'Spaces',
  },
  {
    path: '/categories',
    Component: CategoryList,
    exact: true,
    title: 'Categories',
  },
  {
    path: '/servicePacks',
    Component: ServicePackList,
    exact: true,
    title: 'servicePacks',
  },
  {
    path: '/bookings',
    Component: BookingList,
    exact: true,
    title: 'Bookings',
  },
  {
    path: '/customers',
    Component: CustomerList,
    exact: true,
    title: 'Customers',
  },
  {
    path: '/employees',
    Component: EmployeeList,
    exact: true,
    title: 'Employees',
  },
]

const wrappedRoutes = map(
  flatMap(routes, (route: IPrivateRoute & IBasePrivateRoute) => {
    if (route.routes) {
      return map(route.routes, (subRoute) => ({
        exact: subRoute.path === '/',
        ...subRoute,
        path: route.path + subRoute.path,
        Component: subRoute.Component,
        title: subRoute.title || route.title,
      }))
    }
    return route
  }),
  (route: IBasePrivateRoute) => <PrivateRoute {...route} key={route.path} />
)

const PrivateRoutes = () => {
  return (
    <>
      <PrivateLayout>
        <Switch>
          {wrappedRoutes}
          <Redirect to={{ pathname: '/404' }} />
        </Switch>
      </PrivateLayout>
    </>
  )
}

export default PrivateRoutes
