'use client';

import { FormEvent, useState } from 'react';
import { send } from './actions';

type State = 'none' | 'sending' | 'error' | 'sent';

type FormProps = {
  closeForm: () => void;
};

export default function Form(props: FormProps) {
  const [state, setState] = useState<State>('none');
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const sendForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('sending');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('confirm-email', confirmEmail);

    send(formData)
      .then((_) => {
        setState('sent');
      })
      .catch((e: Error) => {
        setState('error');
        setError(e.message);
      });
  };

  return (
    <div
      className='m-3 border-2 bg-white p-8'
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {state !== 'sent' ? (
        <form className='flex flex-col' onSubmit={sendForm}>
          <h3 className='text-center text-xl'>
            <b>Request an invite</b>
          </h3>
          <input
            className='m-3 p-2 border-2'
            id='name'
            type='text'
            name='name'
            placeholder='Full name'
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='m-3 p-2 border-2'
            id='email'
            name='email'
            type='email'
            placeholder='Email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='m-3 p-2 border-2'
            id='confirm-email'
            name='confirm-email'
            type='email'
            placeholder='Confirm email'
            required
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
          <button
            className='m-3 p-2 border-2 disabled:text-slate-500'
            type='submit'
            disabled={state === 'sending'}
          >
            <b>{state !== 'sending' ? 'Send' : 'Sending, please wait...'}</b>
          </button>
          {state === 'error' && (
            <h3 className='text-center'>
              <b>
                <i>{error}</i>
              </b>
            </h3>
          )}
        </form>
      ) : (
        <div className='flex flex-col items-center align-middle'>
          <h3 className='my-3 text-center text-xl'>
            <b>
              <i>ALL done!</i>
            </b>
          </h3>
          <p className='my-3 p-2 text-center'>
            You will be one of the first to experience Broccoli & Co. when we
            launch.
          </p>
          <button
            className='w-full my-3 p-2 border-2'
            onClick={props.closeForm}
          >
            <b>OK</b>
          </button>
        </div>
      )}
    </div>
  );
}
