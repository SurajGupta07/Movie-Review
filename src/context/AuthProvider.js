import React, { createContext, useContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [formData, setData] = useState({
        email: "",
        password: "",
        check_textInputChange: false,
        isValidUser: true,
        isValidPassword: true,
    });
    const [authType, setAuthType] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [userProfileData, setUserProfileData] = useState(null);
    const [imageURL, setImageURL] = useState("");
    const [firstName, setFirstName] = useState("");
    const [valid, setValid] = useState(true);
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                formData,
                setData,
                passwordError,
                setPasswordError,
                userProfileData,
                setUserProfileData,
                imageURL,
                setImageURL,
                firstName,
                setFirstName,
                valid,
                setValid,
                authType,
                setAuthType,
                login: async (email, password) => {
                    try {
                        setAuthType("Email");
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch (err) {
                        return err;
                    }
                },
                register: async (email, password) => {
                    try {
                        setAuthType("Email");
                        await auth().createUserWithEmailAndPassword(email, password);
                        firestore()
                            .collection("users")
                            .doc(auth().currentUser.uid)
                            .set({
                                firstName: email.substring(0, email.lastIndexOf("@")),
                                lastName: "",
                                email: email,
                                createdAt: firestore.Timestamp.fromDate(new Date()),
                                userImage:
                                    "https://firebasestorage.googleapis.com/v0/b/mini-project-894dd.appspot.com/o/profile.jpeg?alt=media&token=8183cb02-30c6-491a-9e80-d62e6198a411",
                                userId: auth().currentUser.uid,
                            });
                    } catch (err) {
                        return err;
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (err) {
                        return err;
                    }
                },
                updateUser: async ({ currentPassword, newPassword }) => {
                    const user = auth().currentUser;
                    try {
                        const credential = auth.EmailAuthProvider.credential(
                            user.email,
                            currentPassword,
                        );
                        await user.reauthenticateWithCredential(credential);
                        await user.updatePassword(newPassword);
                        setPasswordError("");
                    } catch (err) {
                        setPasswordError(err.message);
                        return err;
                    }
                },
                fetchUserData: async () => {
                    const userId = auth().currentUser.uid;
                    try {
                        const userDetails = [];
                        const snapshot = await firestore()
                            .collection("users")
                            .where("userId", "==", userId)
                            .get();
                        snapshot.forEach((doc) => {
                            let data = doc.data();
                            data.id = doc.id;
                            userDetails.push(data);
                        });
                        setUserProfileData(userDetails);
                    } catch (err) {
                        return err;
                    }
                },
                updateUserProfile: async ({ image, firstName, userId }) => {
                    try {
                        await firestore().collection("users").doc(userId).update({
                            firstName: firstName,
                            userImage: image,
                        });
                    } catch (err) {
                        setPasswordError(err.message);
                        return err;
                    }
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
