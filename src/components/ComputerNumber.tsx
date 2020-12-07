import React, { RefObject } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../styles/global";

interface ComputerNumberProps {
  sign: string;
  setSign: React.Dispatch<React.SetStateAction<string>>;
  number: string;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  inputRef: RefObject<TextInput>;
  focusInput?: RefObject<TextInput> | null;
}

const ComputerNumber: React.FC<ComputerNumberProps> = ({
  sign,
  setSign,
  number,
  setNumber,
  inputRef,
  focusInput,
}) => {
  return (
    <View style={styles.holder}>
      <Text
        style={GlobalStyles.sign}
        onPress={() => {
          setSign(sign === "-" ? "+" : "-");
        }}
      >
        {sign}
      </Text>
      <TextInput
        style={{
          ...GlobalStyles.numberInput,
          fontFamily: "RobotoBold",
          fontWeight: "normal",
        }}
        ref={inputRef}
        keyboardType="numeric"
        allowFontScaling={false}
        maxLength={1}
        value={number}
        onChangeText={(_number: any) => {
          setNumber(() => _number);
          if (_number) {
            focusInput?.current!.focus();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  holder: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 10,
  },
});

export default ComputerNumber;
