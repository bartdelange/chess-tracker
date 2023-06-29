import React, { useState } from 'react';
import { View, StyleSheet, Share, SafeAreaView, FlatList } from 'react-native';
import { Appbar, Modal, Portal, Button, Text, TextInput } from 'react-native-paper';
import { Chess } from 'chess.js';
import Chessboard from './Chessboard';
import Keyboard from './Keyboard';

const ChessApp: React.FC = () => {
  const [move, setMove] = useState<string>('');
  const [game, setGame] = useState<Chess>(new Chess());
  const [currentTurn, setCurrentTurn] = useState('White');
  const [showBoard, setShowBoard] = useState(false);

  const toggleBoard = () => {
    setShowBoard(!showBoard);
  };

  const handleMove = () => {
    const isValidMove = validateMove(move);

    if (isValidMove) {
      makeMove(move);
      setMove('');

      setCurrentTurn(game.turn() === 'w' ? 'White' : 'Black');
    } else {
      alert('Invalid move!');
    }
  };

  const validateMove = (move: string): boolean => {
    const legalMoves = game.moves();
    return legalMoves.includes(move);
  };

  const makeMove = (move: string): Chess => {
    game.move(move);
    return game;
  };

  const exportToPGN = () => {
    const pgn = game.pgn();

    Share.share({
      title: 'Export PGN',
      message: pgn,
    });
  };

  const handleKeyPress = (key: string) => {
    if (key === 'Delete') {
      setMove((prevMove) => prevMove.slice(0, -1));
    } else {
      setMove((prevMove) => prevMove + key);
    }
  };

  function getGameStateText(): string | undefined {
    if (game.isStalemate()) {
      return 'Stalemate'
    }
    if (game.isCheckmate()) {
      return `Checkmate! ${game.turn() === 'w' ? 'Black won!' : 'White won!'}`
    }
    if (game.isDraw()) {
      const draw = 'Draw: '
      if (game.isThreefoldRepetition()) {
        return `${draw} Threefold repetition rule`
      }
      if (game.isInsufficientMaterial()) {
        return `${draw} Insufficient material`
      }
      return `${draw} 50-move rule`
    }
    if (game.inCheck()) {
      return '♚ Check!'
    }
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { }} />
        <Appbar.Content title="Title" />
        <Appbar.Action icon="calendar" onPress={() => { }} />
        <Appbar.Action icon="magnify" onPress={() => { }} />
      </Appbar.Header>

      <Portal>
        <Modal visible={showBoard} onDismiss={toggleBoard}>
          <Chessboard board={game.board()} />
        </Modal>
      </Portal>

      <SafeAreaView style={styles.container}>
        <Button onPress={toggleBoard}>Show Board</Button>

        <View style={styles.chessboard}>
          <Text style={styles.turnText}>Turn: {currentTurn}</Text>
        </View>
        <FlatList
          data={game.history()}
          renderItem={({ item, index }) =>
            <Text key={index}>{item}</Text>
          }
          numColumns={2}
          keyExtractor={(_, index) => `${index}`}
        />
        <Text style={styles.gameState}>{getGameStateText()}</Text>
        <TextInput
          style={styles.input}
          value={move}
          onChangeText={setMove}
          placeholder="Enter move..."
          placeholderTextColor="gray"
        />
        <Keyboard onKeyPress={handleKeyPress} onMove={handleMove} />
        <Button style={styles.exportButton} onPress={exportToPGN}>
          Export to PGN
        </Button>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  chessboard: {
    marginBottom: 20,
  },
  movesList: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  moveButton: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  moveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  gameState: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'purple',
  },
  exportButton: {
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  turnText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ChessApp;
