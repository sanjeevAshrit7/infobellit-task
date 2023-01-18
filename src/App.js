import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/header';
import AboutUs from './pages/aboutUs';
import Home from './pages/home';
import MyBookings from './pages/myBookings';
import SearchTickets from './pages/searchTickets';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={3000}
      >
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/aboutUs'} element={<AboutUs />} />
            <Route path={'/myBookings'} element={<MyBookings />} />
            <Route path={'/searchTickets'} element={<SearchTickets />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  )
}

export default App