import React from "react";
import { Button, FormControl, Text, Modal } from "native-base";

export const CustomModal = ({ showModal, setShowModal, header, message, callback, fontColor }) => {
    return (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>{header}</Modal.Header>
                <Modal.Body>
                    <FormControl>
                        <Text style={{ color: fontColor, fontSize: 14 }}>{message}</Text>
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button onPress={callback}>Close</Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};
