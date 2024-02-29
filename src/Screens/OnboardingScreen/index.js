import React from "react";
import { Image } from "native-base";
import Onboarding from "react-native-onboarding-swiper";

import { SCREEN_TABS } from "../../navigators/constants";

export const OnboardingScreen = ({ navigation }) => {
    return (
        <Onboarding
            onSkip={() => navigation.navigate(SCREEN_TABS.Localization)}
            onDone={() => navigation.navigate(SCREEN_TABS.Localization)}
            pages={[
                {
                    backgroundColor: "#fff",
                    image: (
                        <Image
                            source={require("../../assets/image-one.png")}
                            size="2xl"
                            alt="Movies Review"
                        />
                    ),
                    title: "Join us now",
                    subtitle: "Only what you like",
                },
                {
                    backgroundColor: "#fff",
                    image: (
                        <Image
                            source={require("../../assets/image-two.png")}
                            size="2xl"
                            alt="Movies Review"
                        />
                    ),
                    title: "Share with friends",
                    subtitle: "All Reviews at one stop!",
                },
            ]}
        />
    );
};
