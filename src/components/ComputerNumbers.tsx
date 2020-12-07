import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, View, StyleSheet, ScrollView } from "react-native";
import ComputerNumber from "./ComputerNumber";
import { evaluate } from "mathjs";
import FlatButton from "./customComponents/FlatButton";
import { GlobalStyles } from "../styles/global";

interface ComputerNumbersProps {
  db: firebase.firestore.Firestore;
}

const ComputerNumbers: React.FC<ComputerNumbersProps> = ({ db }) => {
  const [sign0, setSign0] = useState<string>("+");
  const [sign1, setSign1] = useState<string>("+");
  const [sign2, setSign2] = useState<string>("+");
  const [sign3, setSign3] = useState<string>("+");
  const [number0, setNumber0] = useState<string>("");
  const [number1, setNumber1] = useState<string>("");
  const [number2, setNumber2] = useState<string>("");
  const [number3, setNumber3] = useState<string>("");

  const [pictureNumbers, setPictureNumbers] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);
  const [finalNumbers, setFinalNumbers] = useState<string[]>(["", "", "", ""]);

  const i0Ref = useRef<TextInput>(null);
  const i1Ref = useRef<TextInput>(null);
  const i2Ref = useRef<TextInput>(null);
  const i3Ref = useRef<TextInput>(null);

  useEffect(() => {
    const doc = db.collection("computerNumbers").doc("MPwIVjaOiKJqMxGiK5oe");
    doc.onSnapshot((docSnapshot) => {
      let data = docSnapshot.data();
      setSign0(data?.sign0);
      setSign1(data?.sign1);
      setSign2(data?.sign2);
      setSign3(data?.sign3);
      setNumber0(data?.number0);
      setNumber1(data?.number1);
      setNumber2(data?.number2);
      setNumber3(data?.number3);
      setPictureNumbers(data?.pictureNumbers);
      setFinalNumbers(data?.finalNumbers);
    });
  }, []);

  const updateSigns = async (
    _sign0: string,
    _sign1: string,
    _sign2: string,
    _sign3: string
  ) => {
    if (_sign0 && _sign1 && _sign2 && _sign3) {
      try {
        await db
          .collection("computerNumbers")
          .doc("MPwIVjaOiKJqMxGiK5oe")
          .update({
            sign0: _sign0,
            sign1: _sign1,
            sign2: _sign2,
            sign3: _sign3,
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const updateNumbers = async (
    _number0: string,
    _number1: string,
    _number2: string,
    _number3: string
  ) => {
    if (_number0 && _number1 && _number2 && _number3) {
      try {
        await db
          .collection("computerNumbers")
          .doc("MPwIVjaOiKJqMxGiK5oe")
          .update({
            number0: _number0,
            number1: _number1,
            number2: _number2,
            number3: _number3,
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const updatePictureNumbers = async (_pictureNumbers: string[]) => {
    if (
      _pictureNumbers[0] &&
      _pictureNumbers[1] &&
      _pictureNumbers[2] &&
      _pictureNumbers[3]
    ) {
      try {
        await db
          .collection("computerNumbers")
          .doc("MPwIVjaOiKJqMxGiK5oe")
          .update({
            pictureNumbers: [
              _pictureNumbers[0],
              _pictureNumbers[1],
              _pictureNumbers[2],
              _pictureNumbers[3],
            ],
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const updateFinalNumbers = async (_finalNumbers: string[]) => {
    if (
      _finalNumbers[0] &&
      _finalNumbers[1] &&
      _finalNumbers[2] &&
      _finalNumbers[3]
    ) {
      try {
        await db
          .collection("computerNumbers")
          .doc("MPwIVjaOiKJqMxGiK5oe")
          .update({
            finalNumbers: [
              _finalNumbers[0],
              _finalNumbers[1],
              _finalNumbers[2],
              _finalNumbers[3],
            ],
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const resetData = async () => {
    setSign0("+");
    setSign1("+");
    setSign2("+");
    setSign3("+");
    setNumber0("");
    setNumber1("");
    setNumber2("");
    setNumber3("");
    setPictureNumbers(["", "", "", ""]);
    setFinalNumbers(["", "", "", ""]);
    await db
      .collection("computerNumbers")
      .doc("MPwIVjaOiKJqMxGiK5oe")
      .update({
        finalNumbers: ["", "", "", ""],
        number0: "",
        number1: "",
        number2: "",
        number3: "",
        pictureNumbers: ["", "", "", ""],
        sign0: "+",
        sign1: "+",
        sign2: "+",
        sign3: "+",
      });
  };
  const sendComputerNumbers = () => {
    updateSigns(sign0, sign1, sign2, sign3);
    updateNumbers(number0, number1, number2, number3);
  };

  const getFinalNumber = () => {
    if (
      pictureNumbers[0] &&
      pictureNumbers[1] &&
      pictureNumbers[2] &&
      pictureNumbers[3] &&
      sign0 &&
      sign1 &&
      sign2 &&
      sign3 &&
      number0 &&
      number1 &&
      number2 &&
      number3
    ) {
      setFinalNumbers((finalNumbers) => [
        (finalNumbers[0] = evaluate(
          `${pictureNumbers[0]}${sign0}${number0}`
        ).toString()),
        (finalNumbers[1] = evaluate(
          `${pictureNumbers[1]}${sign1}${number1}`
        ).toString()),
        (finalNumbers[2] = evaluate(
          `${pictureNumbers[2]}${sign2}${number2}`
        ).toString()),
        (finalNumbers[3] = evaluate(
          `${pictureNumbers[3]}${sign3}${number3}`
        ).toString()),
      ]);
      updatePictureNumbers(pictureNumbers);
      updateFinalNumbers(finalNumbers);
    } else {
      setFinalNumbers([]);
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <Text style={GlobalStyles.label}>Computer Numbers</Text>
        <View style={styles.computerNumbersContainer}>
          <ComputerNumber
            sign={sign0}
            setSign={setSign0}
            number={number0}
            setNumber={setNumber0}
            inputRef={i0Ref}
            focusInput={i1Ref}
          />
          <ComputerNumber
            sign={sign1}
            setSign={setSign1}
            number={number1}
            setNumber={setNumber1}
            inputRef={i1Ref}
            focusInput={i2Ref}
          />
          <ComputerNumber
            sign={sign2}
            setSign={setSign2}
            number={number2}
            setNumber={setNumber2}
            inputRef={i2Ref}
            focusInput={i3Ref}
          />
          <ComputerNumber
            sign={sign3}
            setSign={setSign3}
            number={number3}
            setNumber={setNumber3}
            inputRef={i3Ref}
          />
        </View>
        <View style={styles.sendComputerNumbers}>
          <FlatButton
            onPress={sendComputerNumbers}
            title="send computer numbers"
          />
        </View>
        <View style={styles.pictureNumbersContainer}>
          <Text style={GlobalStyles.label}>Picture Number</Text>
          <TextInput
            style={{
              ...GlobalStyles.pictureNumberInput,
              fontFamily: "RobotoBold",
              fontWeight: "normal",
            }}
            onChangeText={(_pictureNumbers: any) => {
              setPictureNumbers(() => [..._pictureNumbers]);
            }}
            keyboardType="numeric"
            maxLength={4}
          >
            {pictureNumbers}
          </TextInput>
          <Text style={GlobalStyles.label}>Final Number</Text>
          <Text
            style={{
              ...styles.finalNumber,
              fontFamily: "RobotoBold",
              fontWeight: "normal",
            }}
          >
            {finalNumbers}
          </Text>
          <FlatButton onPress={getFinalNumber} title="Get Final Number" />
        </View>
        <FlatButton onPress={resetData} title="Reset Data" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  computerNumbersContainer: { flexDirection: "row" },
  pictureNumbersContainer: { flexDirection: "column", alignItems: "center" },
  holder: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    marginRight: 20,
  },
  finalNumber: {
    color: "#E4E6EB",
    backgroundColor: "#3A3B3C",
    padding: 8,
    borderRadius: 10,
    textAlign: "center",
    width: 180,
    fontSize: 40,
    marginBottom: 10,
  },
  sendComputerNumbers: {
    marginTop: 8,
  },
});

export default ComputerNumbers;
