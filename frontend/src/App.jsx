import { useState } from 'react'
import './App.css'
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Onboarding from './components/onboarding/Onboarding';
import Landing from './components/landing/Landing';
import Picture from './components/picture/picture';

function App() {
  const [account, setAccount] = useState(null);
  const [allAccounts, setAllAccounts] = useState([]);
  const [isShowingLogin, setIsShowingLogin] = useState(false);
  const [isStudentSignUp, setIsStudentSignUp] = useState(false);
  const [isTutorSignUp, setIsTutorSignUp] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const convertAccount = (account) => {
    const subjects = (account.subjects || '').split(' ').filter(i => i);
    return {
      ...account,
      matched_list: (account.matched_list || '').split(' ').filter(i => i),
      subjects
    };
  };

  const handleLogin = (allAccounts, account) => {
    if (!account) {
      alert('Sorry, that account does not exist or the password was wrong.');
      return;
    }
    account = convertAccount(account);
    setAccount(account);
    setAllAccounts(allAccounts.map(convertAccount));
    setIsEditingProfile(account.subjects.length === 0);
    setIsStudentSignUp(false);
    setIsTutorSignUp(false);
    setIsShowingLogin(false);
  };

  return (
    <div className="App">
      <div className="logo">
        <a href="">
          <img src="/logo.png" height={150} />
        </a>
      </div>
      <h1>Hi! I'm the Study Buddy.</h1>

      <div>
        <img src="/buddy.png" height={350}/>
      </div>
      <div className="login-outer">
        {account ? <div className="logout-outer">
          <Picture account={account} size={80} />
          <button onClick={() => setAccount(null)} className="LogoutButton">Log Out</button>
        </div> : (
          <button onClick={() => setIsShowingLogin(!isShowingLogin)} className="LoginButton">Log In</button>
        )}
        {isShowingLogin && <div>
          <Login onLogin={handleLogin}/>
        </div>}
      </div>

      {account ? (
        isEditingProfile ? (
          <Onboarding account={account} onFinishEditing={(account) => {
            setAccount(account);
            setIsEditingProfile(false);
          }} />
        ) : (
          <Landing
            account={account}
            allAccounts={allAccounts}
            onEditProfile={() => setIsEditingProfile(true)}
          />
        )
      ) : (
        <>
          {isStudentSignUp ? (
            <SignUp isStudent onLogin={handleLogin} />
          ) : isTutorSignUp ? (
            <SignUp isTutor onLogin={handleLogin} />
          ) : (
            <>
              <h2>Welcome! My job is to connect students and tutors.</h2>
              <h2>Are you a student or a tutor?</h2>
              <div className='create-buttons'>
                <button onClick={() => setIsStudentSignUp(true)} className="Student">I am a student</button>
                <button onClick={() => setIsTutorSignUp(true)} className="Tutor">I am a tutor</button>
              </div>
            </>
          )}
        </>
      )}

      <div className='filler'>
        <h2>Inspiration</h2>
        <p>An important facet of civic participation is volunteering and elevating everyone in the community. One way to do this is through improving the education level of one’s community. Study Buddy facilitates this by providing a convenient way to connect students to tutors specific to their needs. We believe that many people both have the knowledge, skills, and time to be tutors who can make a difference in someone’s education, but have trouble connecting with students, and vice-versa. We strive to resolve this gap.</p>
        <h2>What is Study Buddy?</h2>
        <p>Study Buddy is a website that connects students with tutors who choose to volunteer their time to support better education within their community. Our algorithms help students find the perfect tutor who is skilled at the topic they are looking for, but also who has hobbies and interests in common with the student. Students and tutors can have conversations with our live chat feature.</p>
        <p>Built for Minnehack 2023.</p>
      </div>
    </div>
  );
}

export default App
