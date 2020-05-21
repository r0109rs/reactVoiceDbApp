import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import TopNavBar from "./components/TopNavBar"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Page, PageHeader, PageMain, PageFooter} from "./components/Page";
import RegCentersMapTable from "./components/RegCentersMapTable";
import UnregisteredPhonesPage from "./components/UnregistredPhonesPage";
import {DICT_REG_CENTERS_MAPPING, UNREGISTERED_PHONES} from "./constants/urls";


function App() {
  return (
      <Router>
        <Page>
            <PageHeader>
                <TopNavBar />
            </PageHeader>
            <PageMain>
                <Switch>
                    <Route path={DICT_REG_CENTERS_MAPPING} exact>
                        {/*<UnregisteredPhonesPage/>*/}
                        <RegCentersMapTable/>
                    </Route>
                    <Route path={UNREGISTERED_PHONES} exact>
                        <UnregisteredPhonesPage/>
                    </Route>
                </Switch>
            </PageMain>
            <PageFooter />
        </Page>
      </Router>
  );
}

export default App;