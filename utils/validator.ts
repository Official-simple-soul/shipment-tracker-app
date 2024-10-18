import { Alert } from 'react-native';

interface FormData {
  [key: string]: string;
}

export const validateField = (key: string, value: string): string => {
  let errorMessage = '';
  switch (key) {
    case 'email':
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMessage = 'Please enter a valid email address.';
      }
      break;
    case 'password':
      if (!value) {
        errorMessage = 'Password is required.';
      } else {
        if (value.length < 6) {
          errorMessage += 'Password must be at least 6 characters long. ';
        }
        if (!/[a-z]/.test(value)) {
          errorMessage +=
            'Password must contain at least one lowercase letter. ';
        }
        if (!/\d/.test(value)) {
          errorMessage += 'Password must contain at least one digit. ';
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          errorMessage +=
            'Password must contain at least one special character. ';
        }
      }
      break;
    case 'username':
      if (value.length < 3) {
        errorMessage = 'Username must be at least 3 characters long.';
      }
      break;
    case 'phone_number':
      if (!/^\+?[1-9]\d{1,14}$/.test(value)) {
        errorMessage = 'Please enter a valid phone number. Should start with +';
      }
      break;
    case 'url':
      if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value)) {
        errorMessage = 'Please enter a valid URL. Include http:// or https://';
      }
      break;
    case 'name':
      if (!value) {
        errorMessage = 'Fields are required';
      }
      break;
    case `${key}`:
      if (!value) {
        errorMessage = 'Fields are required';
      }
      break;
    default:
      errorMessage = 'Fields are required';
      break;
  }
  return errorMessage;
};

export const validateAndHandleErrors = (formData: FormData): boolean => {
  const newErrors: FormData = {};

  for (const key in formData) {
    if (formData.hasOwnProperty(key)) {
      const errorMessage = validateField(key, formData[key]);
      if (errorMessage) {
        newErrors[key] = errorMessage;
      }
    }
  }

  if (Object.keys(newErrors).length > 0) {
    const errorMessages = Object.keys(newErrors)
      .map((key) => `${key}: ${newErrors[key]}`)
      .join('\n');
    Alert.alert('Validation Errors', errorMessages);
    return true;
  }

  return false;
};
