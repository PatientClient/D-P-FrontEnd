import { Outlet } from "react-router";
import { NavBar } from "./components/Bars/NavBar/NavBar";
import { UsersList } from "./components/Users/UsersList/UsersList";
import { AddUser } from "./components/Users/AddUser/AddUser";
import ActivitiesPage from "./pages/activities/activitiesPage";
import { AddActivity } from "./components/activity/add/AddActivity";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import { ActivityDetails } from "./components/activity/details/ActivityDetails";
import { DashBoard } from "./pages/dashboard/Dashboard";
import { UserProfile } from "./pages/userProfile/UserProfile";

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
      { path: 'dashboard', element: <DashBoard /> },
      { path: 'user', element: <UsersList /> },
      { path: 'user/add', element: <AddUser /> },
      { path: 'user/Profile/:id', element: <UserProfile /> },
      { path: 'activity', element: <ActivitiesPage /> },
      { path: 'activity/details/:id', element: <ActivityDetails /> },
      { path: 'activity/add', element: <AddActivity /> },
      { path: 'login', element: <LoginPage /> }
    ]
  }
]);
