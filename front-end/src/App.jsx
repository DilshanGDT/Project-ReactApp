import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticleListPage from './pages/ArticleListPage';

//define : what page we are gonna add to the react dom with specific paths
const routes = [{
  path: '/',              //element path
  element: <HomePage />   //what to display
}, {
  path: '/about',              
  element: <AboutPage />   
}, {
  path: '/articles/individual',              
  element: <ArticlePage />   
}, {
  path: '/articles',              
  element: <ArticleListPage />   
}]

//create brwoser router
const router = createBrowserRouter(routes);

function App() {
  return (
    <RouterProvider router={router} />    //
  )
}

export default App
