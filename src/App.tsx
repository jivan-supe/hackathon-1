import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './layouts/MainLayout';
import LoginForm from './components/Auth/LoginForm';
import { PrivateRoute } from './routes/PrivateRoute';
import './styles/main.scss';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<div>Dashboard Content</div>} />
            <Route path="users" element={<div>Users Management</div>} />
            <Route path="roles" element={<div>Roles Management</div>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;