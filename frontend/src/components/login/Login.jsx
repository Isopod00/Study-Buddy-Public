import { useState } from 'react'
import fetchAPI from '../../fetch-api';
import './login.css';

const Login = (props) => {
    const [email, setEmail] = useState('test@gmail.com');
    const [password, setPassword] = useState('');
    const submit = () => {
        // YES WE KNOW THIS IS HORRIBLE
        const passwordParams = new URLSearchParams();
        passwordParams.set('email', email);
        passwordParams.set('password', password);
        fetchAPI(`api/verifyPassword?${passwordParams}`)
            .then((res) => res.json())
            .then((text) => {
                if (text !== true) {
                    alert('Incorrect password');
                    throw new Error('Incorrect password');
                }
                return fetchAPI('api/profiles/');
            })
            .then((res) => res.json())
            .then((data) => {
                const user = data.find(i => i.email === email);
                props.onLogin(data, user);
            });
    };
    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            submit();
        }
    };
    return <div className="login-menu">
        <label>
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} onKeyUp={onKeyDown} />
        </label>
        <label>
            Password
            <input value={password} onChange={(e) => setPassword(e.target.value)}  onKeyUp={onKeyDown} type="password" />
        </label>
        <button onClick={submit}>Sign In</button>
    </div>
};

export default Login;
