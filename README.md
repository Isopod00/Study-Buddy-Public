# Study-Buddy-Public
Study Buddy was made in under 24 hours for the MinneHack2023 Hackathon from January 28th-29th, 2023.

 ![Buddy](https://user-images.githubusercontent.com/114538661/215340197-b41f243f-29bf-4ea8-a028-5774e8c31bea.png)

Team Members: Liem Tran, Thomas Weber, Evan Pochtar, Anthony Brogni

## Inspiration

An important facet of civic participation is volunteering and elevating everyone in the community. One way to do this is through improving the education level of one’s community. Study Buddy facilitates this by providing a convenient way to connect students to tutors specific to their needs. We believe that many people both have the knowledge, skills, and time to be tutors who can make a difference in someone’s education, but have trouble connecting with students, and vice-versa. We strive to resolve this gap.

“Education is a public good as well as a personal one, and that civic duty and personal advantage go hand in hand.”

## What it does

Study Buddy is a website that connects students with tutors who choose to volunteer their time to support better education within their community. Our algorithms help students find the perfect tutor who is skilled at the topic they are looking for, but also who has hobbies and interests in common with the student. Students and tutors can have conversations with our live chat feature.

## How we built it

We used Python and the Django framework for the backend of our application. The frontend is a website written using React that talks to the backend through a REST API. Live chat messages are powered by a WebSocket server. We use OpenAI’s API for demonstration purposes when a tutor is not immediately available to respond to questions.

## Accomplishments

 - Generating realistic data
   - Generating over a thousand entries in the database for testing purposes by hand would have been far too time consuming
   - We used algorithms and AI to generate realistic placeholders for test accounts, as well as realistic responses to chats sent when not connected to a live tutor
 - Ranking algorithm
    - We built a complex ranking system that takes into consideration education level, location, topics willing to teach/learn, and keywords in user bios to determine which tutors are most likely to be a match.
 - Live chat rooms
    - We used WebSockets to allow real-time conversations between students and tutors.
 - Website design
    - Our website design initially started out extremely primitive, but was gradually iterated on until it got where it is now.

## What we learned

 - Django - We came into this event with no prior knowledge of using Django. We have since been pushed out of our comfort zone, especially when creating virtual environments and http requests to the front end to access and test our backend code
React
 - While one member of the team had prior experience with old versions of React, modern React code is significantly different and all members of the team learned something new.
 - We learned how to integrate the OpenAI API into our programs to get a similar effect as ChatGPT.
 - Web design - By trying to make our website look better, we were forced to learn how to use CSS features in a consistent manner to present a unified look and feel.

## Possible next steps

 - Improve our ranking algorithm to include the user’s location.
 - Improve the native chat feature. It would be neat for it to have real chat histories and the ability to notify the 
 - Implement measures to protect user safety and prevent predatory behaviors
 - 
