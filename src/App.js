import React, {useEffect, useRef, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import TopNavBar from "./components/TopNavBar"
import {BrowserRouter as Router, Redirect, Route, Switch, useLocation} from "react-router-dom";
import {Page, PageFooter, PageHeader, PageMain} from "./components/Page";
import RegCentersMapTable from "./components/RegCentersMapTable";
import UnregisteredPhonesPage from "./components/UnregistredPhonesPage";
import CucmRoutingPage from "./components/CucmRoutingPage";
import TestToolsPage from "./components/TestToolsPage";
import SignIn from "./components/LoginPageMU";
import {
  CUCM_ROUTES,
  DICT_REG_CENTERS_MAPPING,
  LOGIN_PAGE,
  LOGOUT_ERROR_PAGE,
  LOGOUT_PAGE,
  MAX_REFRESH_ATTEMPTS,
  RECORDABLE_PHONES,
  RECORDABLE_PHONES_V2,
  TEST_TOOLS,
  UNREGISTERED_PHONES
} from "./constants";
import PageNotFound from "./components/Page404"
import {
  clearToken,
  getTokenInfo,
  getTokenTimeBeforeRefresh,
  isLoggedIn,
  refreshTimeout_ms,
  refreshToken,
  setToken,
  setTokenInfo
} from "./helpers";
import LogoutPage from "./components/LogoutPage";
import LogoutError from "./components/LogoutError";
import AgGridTable from "./components/RecordablePhonesAgGrid";
import MUITable from "./components/RecordablePhonesMaterialUi";

const PrivateRoute = ({children, ...rest}) => {
  const location = useLocation()
  return (
    <Route {...rest} render={({match}) => {
      return isLoggedIn() ? children : <Redirect to={{pathname: LOGIN_PAGE, state: {from: location}}} />
    }} />
  )
}

function App() {
  const [tokenState, setTokenState] = useState({expTime: 0, resCode: 200, refreshAttempts: MAX_REFRESH_ATTEMPTS})
  const timerId = useRef(null)
  useEffect(() => {
    const {expTime, resCode, refreshAttempts} = tokenState

    async function tokenRefreshHandler() {
      const {token, tokenPayload, errorCode, errorMessage} = await refreshToken()
      if (!errorCode) {
        setToken(token)
        setTokenInfo(JSON.stringify(tokenPayload))
        setTokenState({expTime: tokenPayload.exp, resCode: 200, refreshAttempts: MAX_REFRESH_ATTEMPTS})
      } else if (errorCode === 401) {
        clearToken()
        console.log(`Auth error ${errorCode}: ${errorMessage}`)
        setTokenState({expTime: false, resCode: errorCode, refreshAttempts: MAX_REFRESH_ATTEMPTS})
      } else {
        console.log(`Auth error ${errorCode}: ${errorMessage}`)
        const tokenPayload = JSON.parse(getTokenInfo())

        if (getTokenTimeBeforeRefresh(tokenPayload) > 0) {
          setTokenState({expTime, resCode: errorCode, refreshAttempts: refreshAttempts - 1})
        } else {
          clearToken()
          setTokenState({expTime: false, resCode: errorCode, refreshAttempts: MAX_REFRESH_ATTEMPTS})
        }
      }
    }

    const scheduler = (timeout_ms) => setTimeout(() => tokenRefreshHandler(), timeout_ms)

    if (expTime === false) return

    if (expTime === 0) {
      if (refreshAttempts > 0) {
        if (refreshTimeout_ms(refreshAttempts) > 0) {
          setTokenState({...tokenState, expTime: 1})
        } else {
          timerId.current = scheduler(0)
        }
      } else {
        clearToken()
        setTokenState({expTime: false, resCode, refreshAttempts: MAX_REFRESH_ATTEMPTS})
      }
    } else if (refreshAttempts > 0) {
      timerId.current = scheduler(refreshTimeout_ms(refreshAttempts))
    } else {
      clearToken()
      setTokenState({expTime: false, resCode, refreshAttempts: MAX_REFRESH_ATTEMPTS})
    }

    return () => {
      clearTimeout(timerId.current)
    }
  }, [tokenState])

  const setLoggedOutState = () => {
    if (timerId.current) clearTimeout(timerId.current)
    clearToken()
    setTokenState({expTime: false, resCode: 200, refreshAttempts: MAX_REFRESH_ATTEMPTS})
  }
  const clearFunction = () => {
    if (timerId.current) clearTimeout(timerId.current)
    clearToken()
  }

  return (
      <Router>
        <Page>
            <PageHeader>
              {isLoggedIn() ? <TopNavBar setLoggedOutState={setLoggedOutState}  /> : null}
            </PageHeader>
            <PageMain>
              {tokenState.expTime === 0 ? <h5 className='text-center'>Please wait...</h5> :
                <Switch>
                  <PrivateRoute path={DICT_REG_CENTERS_MAPPING} exact>
                    <RegCentersMapTable/>
                  </PrivateRoute>
                  <PrivateRoute path={UNREGISTERED_PHONES} exact>
                    <UnregisteredPhonesPage/>
                  </PrivateRoute>
                  <PrivateRoute path={CUCM_ROUTES} exact>
                    <CucmRoutingPage/>
                  </PrivateRoute>
                  <PrivateRoute path={TEST_TOOLS} exact>
                    <TestToolsPage/>
                  </PrivateRoute>
                  <PrivateRoute path={RECORDABLE_PHONES} exact>
                    <AgGridTable />
                  </PrivateRoute>
                  <PrivateRoute path={RECORDABLE_PHONES_V2} exact>
                    <MUITable />
                  </PrivateRoute>
                  <Route path={LOGIN_PAGE}>
                    <SignIn setTokenState={setTokenState} />
                  </Route>
                  <Route path={LOGOUT_PAGE}>
                    <LogoutPage clearFunction={clearFunction} setLoggedOutState={setLoggedOutState} />
                  </Route>
                  <Route path={LOGOUT_ERROR_PAGE}>
                    <LogoutError />
                  </Route>
                  <Route path='*'>
                    <PageNotFound/>
                  </Route>
                </Switch>
              }
            </PageMain>
            <PageFooter />
        </Page>
      </Router>
  );
}

export default App;
