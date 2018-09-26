import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Main from '../contents/Main'
import AvailShifts from '../contents/AvailShifts'
import Nav from '../contents/Nav'
import PageNotFound from '../contents/PageNotFound'


const AppRouter = () => {
    const suppoertsHisotry = 'pushState' in window.history
    return(
        <div>
            <BrowserRouter forceRefresh={!suppoertsHisotry}>
                <div>
                    <Route path="/(myshift|availshift)/" component={Nav}/>
                    <Switch>
                        <Route
                            path='/myshift'
                            component={Main}
                        />
                        <Redirect exact from='/' to='/myshift' />

                        <Route
                            path='/availshift/(Helsinki|Tampere|Turku)'
                            component={AvailShifts}
                        />


                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    )
}


export default AppRouter
