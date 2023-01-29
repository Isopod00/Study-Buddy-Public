import { useState } from "react";
import './signup.css';
import fetchAPI from '../../fetch-api';

const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [birthday, setBirthday] = useState('2004-01-01');

    const createAccount = () => fetchAPI('api/profiles/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            first_name: first,
            last_name: last,
            description: '',
            date_of_birth: birthday,
            student: !!props.isStudent,
            password
        })
    })
        .then(() => fetchAPI('api/profiles/'))
        .then((res) => res.json())
        .then((data) => {
            props.onLogin(data, data.find(i => i.email === email));
        });

    return <div className="signup">
        <h2>I need some of your information to get started.</h2>

        <div className="sign-up-grid">
            <label htmlFor="first">First Name</label>
            <input id="first" value={first} onChange={(e) => setFirst(e.target.value)} className="input" placeholder="Anthony" />
            <label htmlFor="last">Last Name</label>
            <input id="last" value={last} onChange={(e) => setLast(e.target.value)} className="input" placeholder="Brogni" />
            <label htmlFor="birth">Date of Birth</label>
            <input id="birth" value={birthday} onChange={(e) => setBirthday(e.target.value)} type="date" />
            <label htmlFor="email">Email</label>
            <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="example@gmail.com" />
            <label htmlFor="password">Password</label>
            <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        </div>

        <p>You are signing up as a {props.isStudent ? 'student' : 'tutor'}.</p>

        <button
            onClick={createAccount}
            className={"create-account"}
            disabled={
                email === '' ||
                password === '' ||
                first === '' ||
                last === '' ||
                // YES WE KNOW WE SHOULD VALIDATE THIS MORE
                password === ''
            }
        >
            Create Account
        </button>
    </div>
};

export default SignUp;
