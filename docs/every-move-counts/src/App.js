import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from "./pages/auth/Login";
import PrivateLayout from "./layouts/PrivateLayout";
import DashboardPage from "./pages/Dashboard";
import AnnualDashboard from "./pages/AnnualDashboard";
import WeeklyDashboard from "./pages/WeeklyDashboard";
import SpringDashboard from "./pages/SpringDashboard";
import SummerDashboard from "./pages/SummerDashboard";
import AutumnDashboard from "./pages/AutumnDashboard";
import WinterDashboard from "./pages/WinterDashboard";
import RegisterAccount from "./pages/Register";
import SettingsPage from "./pages/Settings";
import CalendarPage from "./pages/Calendar";
import EventPage from "./pages/EMCEvent";
import HomePage from "./pages/Home"
import PrivacyPage from "./pages/Privacy"
import MembersPage from "./pages/MembersPage"
import ProfilePage from "./pages/ProfilePage"
import ActivitiesPage from "./pages/ActivitiesPage"

function PrivateRoute({ children, ...rest }) {
  return (
      <Route
          {...rest}
          render={({ location }) =>
              localStorage.getItem('token') === 'emc2021' ? (
                  <PrivateLayout>{children}</PrivateLayout>
              ) : (
                  <Redirect
                      to={{
                        pathname: '/',
                        state: { from: location },
                      }}
                  />
              )
          }
      />
  );
}

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/">
                <LoginPage/>
              </Route>
              <Route exact path="/privacy">
                <PrivacyPage/>
              </Route>
              <PrivateRoute path="/register">
                  <RegisterAccount/>
              </PrivateRoute>
              <PrivateRoute path="/home">
                  <HomePage/>
              </PrivateRoute>
              <PrivateRoute path="/members">
                  <MembersPage/>
              </PrivateRoute>
              <PrivateRoute path="/activities">
                  <ActivitiesPage/>
              </PrivateRoute>
              <PrivateRoute path="/yearly">
                  <AnnualDashboard />
              </PrivateRoute>
              <PrivateRoute path="/weekly">
                  <WeeklyDashboard />
              </PrivateRoute>
              <PrivateRoute path="/spring">
                  <SpringDashboard />
              </PrivateRoute>
              <PrivateRoute path="/summer">
                  <SummerDashboard />
              </PrivateRoute>
              <PrivateRoute path="/autumn">
                  <AutumnDashboard />
              </PrivateRoute>
              <PrivateRoute path="/winter">
                  <WinterDashboard />
              </PrivateRoute>
              <PrivateRoute path="/dashboard">
                  <DashboardPage />
              </PrivateRoute>
              <PrivateRoute path="/settings">
                  <SettingsPage />
              </PrivateRoute>
              <PrivateRoute path="/calendar">
                  <CalendarPage />
              </PrivateRoute>
              <PrivateRoute path="/events">
                  <EventPage />
              </PrivateRoute>
              <PrivateRoute path="/profile">
                  <ProfilePage/>
              </PrivateRoute>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
