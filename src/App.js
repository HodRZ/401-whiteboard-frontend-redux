import React from 'react';
import './App.css';
import PostsList from './features/posts/PostsList';
import Hero from './layour/Heros';

function App() {
  return (
    <div className="App">
      <Hero />
      <PostsList />
    </div>
  );
}

export default App;
