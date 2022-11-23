import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Auth from './features/auth/Auth';
import { selectUserState } from './features/auth/authSlice';
import PostsList from './features/posts/PostsList';
import Layout from './layout/Layout';

function App() {
  const { loggedUser, isLoggedIn } = useSelector(selectUserState);
  return (
    <div className="App pl-[4.9rem]">
      <Layout>
        {
          ((isLoggedIn && loggedUser) ?
            <PostsList /> :
            <Auth />)
        }
      </Layout>
    </div>
  );
}

export default App;
