import React from 'react';
import { AppContextProvider } from './contexts/app-context';
import { Main } from './components/main/main';

const App = () => {
  return (
    <AppContextProvider>
      <Main></Main>
    </AppContextProvider>    
  )
};

export default App;
