import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import appColors from "../../../../config/appColors";
import { HP, WP } from "../../../../config/responsive";
import { AntDesign } from "@expo/vector-icons";

const Patient = ({
  name,
  age,
  height,
  weight,
  bmi,
  gender,
  phoneNumber,
  onPress,
}) => {
  const [down, setDown] = useState(false);

  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "+1 " : "";
      return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }
    return null;
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setDown((prev) => !prev)}>
        <View style={styles.patientContainer}>
          {down ? (
            <AntDesign
              name="caretdown"
              size={24}
              color={appColors.darkGray}
              style={styles.icon}
            />
          ) : (
            <AntDesign
              name="caretright"
              size={24}
              color={appColors.darkGray}
              style={styles.icon}
            />
          )}
          <Text style={styles.patientName}>{name}</Text>
        </View>
      </TouchableWithoutFeedback>

      {down ? (
        <View>
          <View style={styles.moreInfoOne}>
            <Text style={styles.unhighlightedText}>
              Age: <Text style={styles.highlightedText}>{age}</Text>
            </Text>
            <Text style={styles.unhighlightedText}>
              Height (in): <Text style={styles.highlightedText}>{height}</Text>
            </Text>
            <Text style={styles.unhighlightedText}>
              Weight (lbs): <Text style={styles.highlightedText}>{weight}</Text>
            </Text>
          </View>
          <View style={styles.moreInfoTwo}>
            <Text style={styles.unhighlightedText}>
              BMI: <Text style={styles.highlightedText}>{bmi}</Text>
            </Text>
            <Text style={styles.unhighlightedText}>
              Gender: <Text style={styles.highlightedText}>{gender}</Text>
            </Text>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.unhighlightedText}>Phone Number:</Text>
              <Text style={styles.highlightedText}>
                {formatPhoneNumber(phoneNumber)}
              </Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <Text style={styles.redirect}>View More Info</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default Patient;

const styles = StyleSheet.create({
  patientContainer: {
    marginVertical: HP(1),
    flexDirection: "row",
    alignItems: "center",
  },
  patientName: {
    color: appColors.primary,
    fontFamily: "Roboto_Regular",
    fontSize: HP(1.67),
  },
  icon: {
    marginRight: WP(4),
  },
  moreInfoOne: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: WP(75),
    height: HP(4),
  },
  moreInfoTwo: {
    flexDirection: "row",
    width: WP(75),
    justifyContent: "space-around",
  },
  unhighlightedText: {
    color: appColors.darkGray,
    fontSize: HP(1.67),
    fontFamily: "Roboto_Regular",
    marginLeft: WP(0.5),
  },
  highlightedText: {
    color: appColors.secondary,
  },
  redirect: {
    color: appColors.secondary,
    fontSize: HP(1.67),
    marginVertical: HP(1),
    fontFamily: "Roboto_Regular",
    left: WP(22),
  },
});
