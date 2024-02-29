import { useAuth } from "../context/AuthProvider";

export const useValidate = () => {
    const { formData, setData, setValid } = useAuth();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleEmailChange = (val) => {
        if (re.test(val)) {
            setData({
                ...formData,
                email: val,
                check_textInputChange: true,
                isValidUser: true,
            });
            setValid(false);
        } else {
            setData({
                ...formData,
                email: val,
                check_textInputChange: false,
                isValidUser: false,
            });
            setValid(true);
        }
    };

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 6) {
            setData({
                ...formData,
                password: val,
                isValidPassword: true,
            });
            setValid(false);
        } else {
            setData({
                ...formData,
                password: val,
                isValidPassword: false,
            });
            setValid(true);
        }
    };

    const handleRePasswordChange = (val) => {
        if (val === formData.password) {
            setData({
                ...formData,
                reTypePassword: val,
                isValidRePassword: true,
            });
        } else {
            setData({
                ...formData,
                reTypePassword: val,
                isValidRePassword: false,
            });
        }
    };

    const handleValidEmail = (val) => {
        if (re.test(val)) {
            setData({
                ...formData,
                isValidUser: true,
            });
        } else {
            setData({
                ...formData,
                isValidUser: false,
            });
        }
    };

    const handleValidPassword = (val) => {
        if (val.length > 6) {
            setData({
                ...formData,
                isValidPassword: true,
            });
        } else {
            setData({
                ...formData,
                isValidPassword: false,
            });
        }
    };

    const handleValidRePassword = () => {
        if (formData.password === formData.reTypePassword) {
            setData({
                ...formData,
                isValidRePassword: true,
            });
        } else {
            setData({
                ...formData,
                isValidRePassword: false,
            });
        }
    };
    return {
        handleEmailChange,
        handlePasswordChange,
        handleRePasswordChange,
        handleValidEmail,
        handleValidPassword,
        handleValidRePassword,
    };
};
