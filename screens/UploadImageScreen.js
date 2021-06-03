import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import appColors from "../config/appColors";
import { HP, WP } from "../config/responsive";
import * as ImagePicker from "expo-image-picker";
import { db } from "../firebase";

const UploadImageScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.base64);
    }
  };

  const next = () => {
    db.collection("patients")
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          try {
            let response = await fetch("http://127.0.0.1:8080/predict", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                covid: doc.data().disease,
                img: image,
              }),
            });
            let json = await response.json();
            if (json["status"] === "success") {
              console.log(json);
              navigation.navigate("Thank You");
            } else {
              console.log("Could not get a response");
            }
          } catch (error) {
            alert(
              "Error",
              "There was an error uploading your image. Please try again."
            );
          }
        });
      })
      .catch(() => {
        alert("Failure", "Could not find any records");
      });
  };

  return (
    <View style={uploadImageStyles.container}>
      <Text style={uploadImageStyles.title}>Upload Image</Text>
      <Text style={uploadImageStyles.description}>
        Upload a scan of your damaged organ
      </Text>
      <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
        <View style={uploadImageStyles.button}>
          <Text style={uploadImageStyles.buttonText}>Upload your Scan</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={next}>
        <View
          style={[
            image ? uploadImageStyles.button : uploadImageStyles.disabledButton,
          ]}
        >
          <Text
            style={[
              image
                ? uploadImageStyles.buttonText
                : uploadImageStyles.disabledButtonText,
            ]}
          >
            Continue
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UploadImageScreen;

const uploadImageStyles = StyleSheet.create({
  container: {
    backgroundColor: appColors.backgroundColor,
    paddingTop: HP(9.82),
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(4.7),
    color: appColors.primary,
    marginBottom: HP(2),
  },
  description: {
    textAlign: "center",
    color: appColors.darkGray,
    fontFamily: "Roboto_Regular",
    fontSize: HP(2),
    marginBottom: HP(8),
    width: WP(80),
  },
  button: {
    width: WP(58),
    height: HP(6.25),
    borderRadius: 12,
    backgroundColor: appColors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: HP(15),
  },
  disabledButton: {
    width: WP(58),
    height: HP(6.25),
    borderRadius: 12,
    backgroundColor: appColors.darkGray,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(2),
    color: appColors.primary,
  },
  disabledButtonText: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(2),
    color: appColors.lightGray,
  },
});
