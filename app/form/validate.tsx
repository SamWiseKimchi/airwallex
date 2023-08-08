export default function validateEmail(formData: FormData) {
  return formData.get('email') === formData.get('confirm-email');
}
