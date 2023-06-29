import { Square, PieceSymbol, Color } from 'chess.js';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ChessboardProps = {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
};

const Chessboard: React.FC<ChessboardProps> = ({ board }) => {
  const rowIndicators = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const columnIndicators = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  return (
    <View style={styles.container}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <View key={cellIndex} style={[styles.cell, (rowIndex + cellIndex) % 2 === 0 ? styles.lightCell : styles.darkCell]}>
              {cellIndex == 0 && <Text style={[styles.indicator, styles.rowIndicator, (rowIndex + cellIndex) % 2 !== 0 && styles.darkIndicator]}>{rowIndicators[rowIndex]}</Text>}
              {rowIndex == 7 && <Text style={[styles.indicator, styles.cellIndicator, (rowIndex + cellIndex) % 2 !== 0 && styles.darkIndicator]}>{columnIndicators[cellIndex]}</Text>}
              <Text style={styles.cellText}>{getCellEmoticon(cell?.type, cell?.color)}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const getCellEmoticon = (piece?: PieceSymbol, color?: Color): string => {
  if (color == 'w') {
    switch (piece) {
      case 'k':
        return '♔';
      case 'q':
        return '♕';
      case 'r':
        return '♖';
      case 'b':
        return '♗';
      case 'n':
        return '♘';
      case 'p':
        return '♙';
      default:
        return '';
    }
  } else if (color == 'b') {
    switch (piece) {
      case 'k':
        return '♚';
      case 'q':
        return '♛';
      case 'r':
        return '♜';
      case 'b':
        return '♝';
      case 'n':
        return '♞';
      case 'p':
        return '♟';
      default:
        return '';
    }
  } else {
    return '';
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cell: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  lightCell: {
    backgroundColor: 'white',
  },
  darkCell: {
    backgroundColor: 'gray',
  },
  cellText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  indicator: {
    position: 'absolute',
    fontSize: 12,
  },
  darkIndicator: {
    color: 'white'
  },
  rowIndicator: {
    left: 0,
    top: 0,
  },
  cellIndicator: {
    right: 0,
    bottom: 0,
  },
});

export default Chessboard;
