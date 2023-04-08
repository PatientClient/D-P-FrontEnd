import { Outlet } from "react-router";
import { NavBar } from "./components/Bars/NavBar/NavBar";
import { UsersList } from "./components/Users/UsersList/UsersList";
import { AddUser } from "./components/Users/AddUser/AddUser";
import ActivitiesPage from "./pages/activities/activitiesPage";
import { AddActivity } from "./components/activity/add/AddActivity";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import { ActivityDetails } from "./components/activity/details/ActivityDetails";

export const router = createBrowserRouter([
  {
    path: '',
    element:
      <div>
        <NavBar />
        <Outlet />
      </div>
    ,
    children: [
      { path: '', element: <UsersList /> },
      { path: 'user', element: <UsersList /> },
      { path: 'user/add', element: <AddUser /> },
      { path: 'activity', element: <ActivitiesPage /> },
      { path: 'activity/details/:id', element: <ActivityDetails /> },
      { path: 'activity/add', element: <AddActivity /> },
      { path: 'login', element: <LoginPage /> }
    ]
  }
]);
