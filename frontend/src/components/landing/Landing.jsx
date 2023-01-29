import { useState, useEffect } from 'react';
import fetchAPI from '../../fetch-api';
import Swipe from '../swipe/swipe';
import Picture from '../picture/picture';
import './swipe.css';
import { GRADES, SUBJECTS } from '../../grades';
import Chat from '../Chat/Chat';

const CoreSwipingRoutine = (props) => {
    const [tutors, setTutors] = useState([]);
    const [loadingTutors, setLoadingTutors] = useState(true);
    const [key, setKey] = useState(0);
    const [showingMatches, setShowingMatches] = useState(!props.account.student);
    const [matched, setMatched] = useState(props.account.matched_list);
    const [chattingWith, setChattingWith] = useState('');

    useEffect(() => {
        fetchAPI(`api/search?email=${props.account.email}`)
            .then((res) => res.json())
            .then((data) => {
                setTutors(data
                    .map(i => i.fields)
                    .filter(i => !matched.includes(i.email)));
                setLoadingTutors(false);
            });
    }, []);

    if (loadingTutors) {
        return <h3>Loading tutors...</h3>
    }

    const next = async (isRightSwipe) => {
        const params = new URLSearchParams(location.search);
        params.set('email', props.account.email);
        if (isRightSwipe) {
            params.set('matched', tutor.email);
            await fetchAPI(`api/matched?${params}`, {
                method: 'POST'
            });
            setMatched([...matched, tutor.email]);
        } else {
            params.set('blacklist', tutor.email);
            await fetchAPI(`api/blacklist?${params}`, {
                method: 'POST'
            });
        }
        setKey(key + 1);
        setTutors(tutors.slice(1));
    };

    const tutor = tutors[0];
    return <div>
        <div className="profile-operations">
            <button onClick={props.onEditProfile}>Edit Profile</button>
            {props.account.student ? (
                showingMatches ? (
                    <button onClick={() => {
                        setShowingMatches(false);
                        setChattingWith(false);
                    }}>Swipe</button>
                ) : (
                    <button onClick={() => {
                        setShowingMatches(true);
                        setChattingWith(false);
                    }}>Matches</button>
                )
            ) : (
                chattingWith ? (
                    <button onClick={() => {
                        setShowingMatches(true);
                        setChattingWith(false);
                    }}>Matches</button>                    
                ) : null
            )}
        </div>

        {chattingWith ? <>
            <h2>Chatting with {chattingWith.first_name} {chattingWith.last_name}</h2>
            <Picture account={chattingWith} size={100} />
            <p>{chattingWith.email}</p>
            <Chat
                id={[props.account.email, chattingWith.email].sort().join(' ')}
                account={props.account}
            />
        </> : showingMatches ? <>
            {matched.length ? (
                <h2>
                    {props.account.student ? (
                        "Tutors you've matched with:"
                    ) : ("Student who matched with you:")}
                </h2>
            ) : (
                <h2>
                    {props.account.student ? 'You have not matched with any tutors.' : 'No students have matched with you.'}
                </h2>
            )}
            <div className="matches">
                {matched.map(email => {
                    const otherAccount = props.allAccounts.find(i => i.email === email);
                    return <div key={email} onClick={() => setChattingWith(otherAccount)} tabIndex={0} className="match">
                        {otherAccount ? <>
                            <Picture account={otherAccount} />
                            <div>{otherAccount.first_name} {otherAccount.last_name}</div>
                        </> : (
                            `Unknown email ${email}`
                        )}
                    </div>;
                })}
            </div>
        </> : props.account.student ? <>
            <h2>Swipe right on the tutors you like!</h2>
            {loadingTutors ? (
                <h2>Loading tutors...</h2>
            ) : tutor ? (
                <Swipe
                    key={key}
                    onSwipeLeft={() => next(false)}
                    onSwipeRight={() => next(true)}
                >
                    <div className="box">
                        <Picture account={tutor} />
                        <h3>{tutor.first_name} {tutor.last_name}</h3>
                        <p>{tutor.description || 'No bio.'}</p>
                        <div className="tutor-pills">
                            {tutor.location && <div className="tutor-pill">
                                {tutor.location}
                            </div>}
                            <div className="tutor-pill">
                                {GRADES[tutor.grade].name}
                            </div>
                            {tutor.subjects.split(' ').map(id => (
                                <div key={id} className="tutor-pill">
                                    {SUBJECTS[id]?.long ?? SUBJECTS[id]?.name ?? id}
                                </div>
                            ))}
                        </div>
                    </div>
                </Swipe>
            ) : (
                <div className="box">
                    <h2>No more tutors :(</h2>
                </div>
            )}
        </> : (
            <div>????.</div>
        )}
    </div>;
};

export default CoreSwipingRoutine;
