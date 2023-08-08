import validateEmail from '../app/form/validate';

describe('validateEmail', () => {
  let formData: FormData;

  beforeEach(() => {
    formData = new FormData();
  });

  test('mis-matching emails should return false', () => {
    formData.append('email', 'abc123');
    formData.append('confirm-email', '123abc');
    expect(validateEmail(formData)).false;
  });

  test('matching emails should return true', () => {
    const email = 'e`!@#$$%^&*(())_+{}|asdf aef qwr ';
    formData.append('email', email);
    formData.append('confirm-email', email);
    expect(validateEmail(formData)).true;
  });
});
