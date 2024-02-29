import React from "react";
import { Button } from "native-base";

export const ButtonItem = ({ title, width, callback, leftIcon, disabled }) => {
    return (
        <Button w={width} onPress={callback} leftIcon={leftIcon} isDisabled={disabled}>
            {title}
        </Button>
    );
};
