import { useRef } from 'react';
import { useState } from 'react';
import fetchAPI from '../../fetch-api';
import { GRADES, BROAD_TOPICS, SUBJECTS } from "../../grades";
import Picture from '../picture/picture';
import './onboarding.css';

const StudentOnboarding = props => {
  const [screen, setScreen] = useState('TOPICS');
  const [subjects, setSubjects] = useState(props.account.subjects || []);
  const [grade, setGrade] = useState(props.account.grade || '');
  const [bio, setBio] = useState(props.account.description || '');
  const [location, setLocation] = useState(props.account.location || '');
  const [picture, setPicture] = useState(props.account.picture || '');
  const isStudent = !!props.account.student;
  const photoRef = useRef();

  const finishTopics = () => {
    const params = new URLSearchParams();
    params.set('email', props.account.email);
    params.set('subjects', subjects.join(' '));
    fetchAPI(`api/setSubjects?${params}`, {
      method: 'POST'
    })
      .then(() => {
        setScreen('GRADE');
      });
  };

  const finishGrade = () => {
    const params = new URLSearchParams();
    params.set('email', props.account.email);
    params.set('grade', grade);
    fetchAPI(`api/setGrade?${params}`, {
      method: 'POST'
    })
      .then(() => {
        setScreen('LOCATION');
      });
  };

  const finishLocation = () => {
    const params = new URLSearchParams();
    params.set('email', props.account.email);
    params.set('location', location);
    fetchAPI(`api/setLocation?${params}`, {
      method: 'POST'
    })
      .then(() => {
        setScreen('PHOTO');
      });
  };

  const finishPhoto = () => {
    setScreen('BIO');
  };

  const finishBio = () => {
    const params = new URLSearchParams();
    params.set('email', props.account.email);
    params.set('bio', bio);
    fetchAPI(`api/setBio?${params}`, {
      method: 'POST'
    })
      .then(() => {
        const newAccountObject = {
          ...props.account,
          description: bio,
          subjects,
          grade,
          location,
          picture,
        };
        props.onFinishEditing(newAccountObject);
      });
  };

  return (
    <div>
      {screen === 'TOPICS' && <>
        <h2>
          {isStudent ? 'What subjects are you studying?' : 'What subjects can you teach?'}
        </h2>

        <div className="subjects">
          {Object.entries(BROAD_TOPICS).map(([i, data]) => <div key={i} className="subject">
            <div className="subject-title">
              <b>
                {data.name}
              </b>
            </div>

            <div className="subject-inner-list">
              {data.subjects.map((i2) => (
                <div
                  key={i2}
                  className="specific"
                  tabIndex={0}
                  data-active={subjects.includes(i2)}
                  onClick={() => {
                    if (subjects.includes(i2)) {
                      setSubjects(subjects.filter(a => a !== i2));
                    } else {
                      setSubjects([...subjects, i2]);
                    }
                  }}
                >
                  {SUBJECTS[i2].name}
                </div>
              ))}
            </div>
          </div>)}
        </div>

        <button onClick={finishTopics} className="next" disabled={subjects.length == 0}>Next</button>
      </>}

      {screen === 'GRADE' && <>
        <h2>What level of education are you receiving?</h2>

        <div className="grades">
          {Object.entries(GRADES).map(([i, data]) => (
            <button key={i} tabIndex={0} onClick={() => setGrade(i)} style={{
              backgroundColor: data.color
            }} data-active={grade === i}>
              {data.name}
            </button>
          ))}
        </div>

        <button onClick={finishGrade} className="next" disabled={grade === ''}>Next</button>
      </>}

      {screen === 'LOCATION' && <>
        <h2>Study Buddy wants to know your location.</h2>

        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="E.x. Minneapolis" className="loc"/>

        <button
          onClick={finishLocation}
          className="next"
          disabled={false}
        >Next</button>
      </>}

      {screen === 'PHOTO' && <>
        <h2>Upload a photo of yourself</h2>

        {picture && (
          <div className='edit-image'>
            <Picture account={{picture}} />
          </div>
        )}

        <input type="file" accept=".png, .jpg" ref={photoRef} onChange={async (e) => {
          const image = e.target.files[0];
          if (image) {
            const params = new URLSearchParams();
            params.set('email', props.account.email);
            const body = new FormData();
            body.append('image', image);
            await fetchAPI(`api/setImage?${params}`, {
              method: 'PUT',
              body
            });
            
            const imageURL = await new Promise((resolve, reject) => {
              const fr = new FileReader();
              fr.onload = () => resolve(fr.result);
              fr.readAsDataURL(image);
            });
            setPicture(imageURL);
          }
        }} />

        <button
          onClick={finishPhoto}
          className="next"
          disabled={false}
        >Next</button>
      </>}

      {screen === 'BIO' && <>
        <h2>Tell me a bit about yourself to help find more relevant {isStudent ? 'tutors' : 'students'}</h2>
        <p>Include things such as your hobbies and interests. This will be public, so don't include personal information.</p>

        <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder='Character limit: 150' className="bio" />

        <button
          onClick={finishBio}
          className="next"
          disabled={isStudent ? false : bio === ''}
        >Start Swiping!</button>
      </>}
    </div>
  )
};

export default StudentOnboarding;
