import validateEmail from './validate';

/**
 * @param formData Precondition: contains the keys for 'name', 'email' and 'confirm-email' whose values are non-empty strings.
 */

export async function send(formData: FormData) {
  const validMatchingEmail = validateEmail(formData);

  if (!validMatchingEmail) {
    return Promise.reject(new Error('Emails do not match'));
  } else {
    let body = JSON.stringify({
      name: formData.get('name'),
      email: formData.get('email'),
    });

    let response = await fetch(
      'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }
    );

    if (!response.ok) {
      return Promise.reject(
        new Error(`${response.statusText} status: ${response.status}`)
      );
    } else return Promise.resolve('great success');
  }
}
