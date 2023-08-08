'use client';
import { useEffect, useState } from 'react';
import Form from './form/form';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    document.body.classList.remove(theme);

    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.add(newTheme);
  };

  return (
    <>
      <header className='flex justify-between border-b-2 p-4'>
        <h1 className='ml-4'>
          <b>BROCCOLI & CO.</b>
        </h1>
        <button onClick={toggleTheme}>Change Theme</button>
      </header>
      <main className='relative'>
        <section className='h-full flex flex-col items-center justify-center p-8'>
          <h1 className='m-3 text-3xl text-center'>
            <b>A better way to enjoy every day.</b>
          </h1>
          <h2 className='m-3 text-center'>
            Be the first to know when we launch.
          </h2>
          <button
            className='border-2 p-3 m-3'
            onClick={() => setShowForm(true)}
          >
            Request an invite
          </button>
        </section>
      </main>
      <footer className='flex flex-col items-center w-screen border-t-2 p-2'>
        <h3 className='text-center'>
          <i>Made with ♥ in Melbourne.</i>
        </h3>
        <h3 className='text-center'>
          <i>© 2016 Broccoli & Co. ALL rights reserved.</i>
        </h3>
      </footer>
      {showForm && (
        <div
          onClick={() => setShowForm(false)}
          className='absolute bg-opacity-50 bg-black h-screen w-screen top-0 flex justify-center items-center'
        >
          <Form closeForm={() => setShowForm(false)} />
        </div>
      )}
    </>
  );
}
