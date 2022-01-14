import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import store from '@/redux'
import ModelList from '@/pages/ModelList'
import ModelCreate from '@/pages/ModelCreate'
import ModelEdit from '@/pages/ModelEdit'
import View from '@/pages/ModelEdit/View/ViewEdit'
import FieldOperation from './pages/ModelEdit/Field/FieldOperation'
import CustomOperation from '@/pages/ModelEdit/Operation/CustomOperation'

function App () {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter basename={process.env.PUBLIC_URL} >
          <Switch>
            <Route path="/model/list" component={ModelList} exact></Route>
            <Route path="/model/create" component={ModelCreate} exact></Route>
            <Route path="/model/edit/:modelId" component={ModelEdit} exact></Route>
            {/* View component carry modelId expect viewId, in order to solve the problem when need reload TODO: 嵌套路由 */}
            <Route path="/model/edit/:modelId/view/:viewId" component={View} exact></Route>
            <Route path="/model/edit/:modelId/field" component={FieldOperation} exact></Route>
            <Route path="/model/edit/:modelId/operation" component={CustomOperation} exact></Route>
            <Redirect from="/" to="/model/list" />
          </Switch>
        </BrowserRouter>
      </DndProvider>
    </Provider>
  )
}

export default App
