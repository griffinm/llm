import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { urls } from './utils/urls'
import { MainLayout } from './layouts/MainLayout';

import './index.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={urls.home()} element={<HomePage />} />
          <Route path={urls.chat(':id')} element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
