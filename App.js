import React, { useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import Button from "./src/Components/Button";
import Display from "./src/Components/Display";

export default App = () => {
  const [displayValue, setDisplayValue] = useState({
    initial: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
  });

  function addDigit(n) {
    if (n === "." && !clearDisplay && displayValue.initial.includes(".")) {
      return;
    }

    const clearDisplay =
      displayValue.initial === "0" || displayValue.clearDisplay;

    const currentValue = clearDisplay ? "" : displayValue.initial;
    const initial = currentValue + n;
    setDisplayValue({ ...displayValue, initial, clearDisplay: false });

    if (n !== ".") {
      const newValue = parseFloat(initial);
      const values = [...displayValue.values];
      values[displayValue.current] = newValue;
      setDisplayValue({
        ...displayValue,
        initial,
        values,
        clearDisplay: false,
      });
    }
  }

  function clearMemory() {
    setDisplayValue({
      initial: "0",
      clearDisplay: false,
      operation: null,
      values: [0, 0],
      current: 0,
    });
  }

  const setOperation = (operation) => {
    if (displayValue.current === 0) {
      setDisplayValue({
        ...displayValue,
        operation,
        current: 1,
        clearDisplay: true,
      });
    } else {
      const equals = operation === "=";
      const values = [...displayValue.values];
      try {
        values[0] = eval(`${values[0]} ${displayValue.operation} ${values[1]}`);
      } catch (e) {
        values[0] = displayValue.values[0];
      }
      values[1] = 0;
      setDisplayValue({
        initial: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Display value={displayValue.initial} />
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={setOperation} />
        <Button label="8" onClick={addDigit} />
        <Button label="7" onClick={addDigit} />
        <Button label="9" onClick={addDigit} />
        <Button label="*" operation onClick={setOperation} />
        <Button label="4" onClick={addDigit} />
        <Button label="5" onClick={addDigit} />
        <Button label="6" onClick={addDigit} />
        <Button label="-" operation onClick={setOperation} />
        <Button label="1" onClick={addDigit} />
        <Button label="2" onClick={addDigit} />
        <Button label="3" onClick={addDigit} />
        <Button label="+" operation onClick={setOperation} />
        <Button label="0" double onClick={addDigit} />
        <Button label="." onClick={addDigit} />
        <Button label="=" operation onClick={setOperation} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
