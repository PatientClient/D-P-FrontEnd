import { Outlet } from "react-router";
import { NavBar } from "./components/Bars/NavBar/NavBar";
import ActivitiesPage from "./pages/activities/activitiesPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import { ActivityDetails } from "./components/activity/details/ActivityDetails";
import { Tasks } from "./pages/tasks/tasks";

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
      { path: 'activity', element: <ActivitiesPage /> },
      { path: 'activity/details/:id', element: <ActivityDetails /> },
      { path: 'tasks/', element: <Tasks /> },
      { path: 'login', element: <LoginPage /> }
    ]
  }
]);
