import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticleListPage from './pages/ArticlesListPage';
import Layout from './Layout';
import NotFound from './pages/NotFoundPage';

//define : what page we are gonna add to the react dom with specific paths
const routes = [{
  path: '/',
  element: <Layout />,      //display in all the pages
  errorElement: <NotFound />, //this is also just element but its display only there is an error on a page
  children: [{
  path: '/',              //element path
  element: <HomePage />   //what to display
}, {
  path: '/about',              
  element: <AboutPage />   
}, {
  path: '/articles/:name', //URL/route parameter  ex - /articles/learn-react             
  element: <ArticlePage />   
}, {
  path: '/articles',              
  element: <ArticleListPage />   
}]
}]

//create brwoser router
const router = createBrowserRouter(routes);

function App() {
  return (  //we cannot use elements outside the RouterProvider thats why we cannot add NavBar outside
    <RouterProvider router={router} />    
  )
}

export default App
