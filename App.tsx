import React from 'react';
import ChessApp from './src/ChessApp';
import { PaperProvider } from 'react-native-paper';

function App(): JSX.Element {
  return (
    <PaperProvider>
      <ChessApp />
    </PaperProvider>
  );
}

export default App;
