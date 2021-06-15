import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome,
  Feather,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import { auth, db } from "../../../firebase";
import { WP, HP } from "../../../config/responsive";
import appColors from "../../../config/appColors";
import { useDispatch } from "react-redux";
import {
  removeInfo,
  removeRole,
  removeUser,
  removeDoctor,
} from "../../../redux/actions/auth";

const ProfileScreen = ({ navigation }) => {
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState();

  useEffect(() => {
    db.collection("patients")
      .doc(user.uid)
      .get()
      .then((user) => {
        setDoctor(user.data().doctor);
      });
  }, []);

  const logout = () => {
    dispatch(removeInfo());
    dispatch(removeRole());
    dispatch(removeUser());
    dispatch(removeDoctor());
    auth.signOut();
  };

  return (
    <View style={profileStyles.container}>
      <Text style={profileStyles.title}>Profile</Text>
      <View style={profileStyles.personalInfoContainer}>
        <Image
          source={{
            uri: user.photoURL,
          }}
          style={profileStyles.userProfilePhoto}
        />
        <View style={profileStyles.textContainer}>
          <Text style={profileStyles.username}>{user.displayName}</Text>
          <View style={profileStyles.genInfoContainer}>
            <Text style={profileStyles.personalInfoText}>
              User ID: {user.uid}
            </Text>
            <Text style={profileStyles.personalInfoText}>Doctor: {doctor}</Text>
          </View>
        </View>
      </View>
      <View>
        <View style={profileStyles.profileSection}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("ChangeDoctor")}
          >
            <View style={profileStyles.leftProfileSection}>
              <FontAwesome5
                name="stethoscope"
                size={26}
                style={profileStyles.icon}
              />
              <Text style={profileStyles.profileSectionText}>
                Change Doctor
              </Text>
            </View>
          </TouchableOpacity>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={26}
            style={profileStyles.arrowIcon}
          />
        </View>
        <View style={profileStyles.profileSection}>
          <View style={profileStyles.leftProfileSection}>
            <Ionicons
              name="shield-checkmark-outline"
              size={26}
              style={profileStyles.icon}
            />
            <Text style={profileStyles.profileSectionText}>Change Info</Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={26}
            style={profileStyles.arrowIcon}
          />
        </View>
        <View style={profileStyles.profileSection}>
          <View style={profileStyles.leftProfileSection}>
            <FontAwesome name="support" size={26} style={profileStyles.icon} />
            <Text style={profileStyles.profileSectionText}>Support</Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={26}
            style={profileStyles.arrowIcon}
          />
        </View>
        <View style={profileStyles.profileSection}>
          <View style={profileStyles.leftProfileSection}>
            <Feather name="mail" size={26} style={profileStyles.icon} />
            <Text style={profileStyles.profileSectionText}>
              Give us feedback
            </Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={26}
            style={profileStyles.arrowIcon}
          />
        </View>
        <View style={profileStyles.profileSection}>
          <View style={profileStyles.leftProfileSection}>
            <Ionicons
              name="document-text-outline"
              size={26}
              style={profileStyles.icon}
            />
            <Text style={profileStyles.profileSectionText}>
              Terms of Service
            </Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={26}
            style={profileStyles.arrowIcon}
          />
        </View>
        <View style={profileStyles.profileSection}>
          <TouchableOpacity activeOpacity={0.7} onPress={logout}>
            <View style={profileStyles.leftProfileSection}>
              <AntDesign name="logout" size={23} style={profileStyles.icon} />
              <Text style={profileStyles.logoutText}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const profileStyles = StyleSheet.create({
  container: {
    paddingLeft: WP(4.83),
    paddingTop: HP(5.58),
    flex: 1,
    backgroundColor: appColors.backgroundColor,
  },
  title: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(3.13),
    top: HP(2.23),
    color: appColors.primary,
  },
  personalInfoContainer: {
    backgroundColor: appColors.secondary,
    borderRadius: 16,
    width: WP(93),
    height: HP(11.12),
    flexDirection: "row",
    marginTop: HP(5.58),
  },
  userProfilePhoto: {
    width: WP(14.49),
    height: HP(6.69),
    borderRadius: 100,
    alignSelf: "center",
    marginLeft: WP(3.62),
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: WP(4.83),
  },
  username: {
    fontFamily: "Roboto_Medium",
    fontSize: HP(2),
    color: appColors.primary,
  },
  genInfoContainer: {
    top: HP(1),
  },
  personalInfoText: {
    fontFamily: "Roboto_Medium",
    fontSize: HP(1.56),
    color: appColors.primary,
  },
  profileSection: {
    marginLeft: HP(2.42),
    marginTop: HP(5.6),
    marginRight: WP(6.04),
    justifyContent: "space-between",
    flexDirection: "row",
  },
  icon: {
    color: appColors.secondary,
  },
  leftProfileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileSectionText: {
    fontFamily: "Roboto_Regular",
    fontSize: HP(1.9),
    marginLeft: WP(4.83),
    color: appColors.primary,
  },
  logoutText: {
    fontFamily: "Roboto_Regular",
    fontSize: HP(1.9),
    marginLeft: WP(4.83),
    color: appColors.secondary,
  },
  arrowIcon: {
    color: appColors.darkGray,
  },
});
