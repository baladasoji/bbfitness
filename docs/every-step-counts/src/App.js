import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from "./pages/auth/Login";
import PrivateLayout from "./layouts/PrivateLayout";
import DashboardPage from "./pages/Dashboard";
import AnnualDashboard from "./pages/AnnualDashboard";
import WeeklyDashboard from "./pages/WeeklyDashboard";
import SpringDashboard from "./pages/SpringDashboard";
import SummerDashboard from "./pages/SummerDashboard";
import WinterDashboard from "./pages/WinterDashboard";
import SettingsPage from "./pages/Settings";

function PrivateRoute({ children, ...rest }) {
  return (
      <Route
          {...rest}
          render={({ location }) =>
              localStorage.getItem('token') ? (
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
                  <LoginPage />
              </Route>
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
              <PrivateRoute path="/winter">
                  <WinterDashboard />
              </PrivateRoute>
              <PrivateRoute path="/dashboard">
                  <DashboardPage />
              </PrivateRoute>
              <PrivateRoute path="/settings">
                  <SettingsPage />
              </PrivateRoute>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
