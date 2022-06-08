/**
 * Adapted from: https://stackoverflow.com/questions/51022834/react-jsx-make-substring-in-bold
 */
import { StyleSheet, Text, TextStyle } from 'react-native';

interface BoldedTextProps {
  text: string;
  nonBoldedSubstring: string;
  style: TextStyle;
}

export default function BoldedText({ text, nonBoldedSubstring, style }: BoldedTextProps) {
  const textArray = text.split(RegExp(nonBoldedSubstring, 'ig'));
  const match = text.match(RegExp(nonBoldedSubstring, 'ig'));

  return (
    <Text style={StyleSheet.flatten([styles.fullText, style])}>
      {textArray.map((item, index) => (
        <>
          {item}
          {index !== textArray.length - 1 && match && (
            <Text style={styles.nonBold}>{nonBoldedSubstring}</Text>
          )}
        </>
      ))}
    </Text>
  );
}

const styles = StyleSheet.create({
  fullText: {
    fontWeight: '600',
  },
  nonBold: {
    fontWeight: '400',
  },
});
