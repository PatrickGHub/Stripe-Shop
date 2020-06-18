import React, { useState } from 'react';

const RegisterForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
  }

  return (
    <div>
      <form
        id="myForm"
        onSubmit={handleSubmit}
      >
        <fieldset>
        <div className='formTitle'>Register</div>

          <div className="formItem">
            <label
              htmlFor="email"
            >Email Address</label>
            <input
              id="email"
              type="text"
              placeholder="Email address"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="formItem">
            <label
              htmlFor="password"
            >Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="formItem">
            <label
              htmlFor="passwordConfirmation"
            >Password Confirmation</label>
            <input
              id="passwordConfirmation"
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, passwordConfirmation: e.target.value })}
            />
          </div>

        </fieldset>
        <button
          form="myForm"
          key="submit"
          type="submit"
        >Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;