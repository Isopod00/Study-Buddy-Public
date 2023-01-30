import random
from signup.models import Profile

#FILE MEANT PURELY FOR CREATING RANDOM USERS
class User():
    def __init__(self, grade, email, firstName, lastName, dob, subjects, desc, student, location):
        self.email            = email
        self.first_name       = firstName
        self.last_name        = lastName
        self.date_of_birth    = dob
        self.grade            = grade
        self.subjects         = subjects
        self.description      = desc
        self.student          = student
        self.location         = location
        
    def __str__(self):
        finString = "Email: " + self.email +"\n" + "Name: " + self.first_name + " " + self.last_name + "\n" + "Date of Birth: " + self.date_of_birth + "\n"
        finString += "Grade Level: " + self.grade + "\n" + "Subjects: " + self.subjects + "\n"
        if self.student:
            finString +="Student"
        else:
            finString += "Tutor"
        return finString

def profCreate(numTest, student):
    locations = ["Minneapolis","St. Paul","Madison","Green Bay", "Fargo","Des Moines","Duluth","New York City"]
    firstNames = ["James","Robert","John","Michael","David","William","Richard","Joseph","Thomas","Charles","Christopher","Daniel","Matthew","Anthony","Mark",
    "Mary","Patricia","Jennifer","Linda","Elizabeth","Barbara","Susan","Jessica","Sarah","Karen","Lisa","Nancy","Betty","Margaret","Sandra",
    "Donald","Steven","Paul","Andrew","Joshua","Kenneth","Kevin","Brian","George","Timothy","Ronald","Edward","Jason","Jeffery","Ryan"
    "Ashley","Kimberly","Emily","Donna","Michelle","Carol","Amanda","Dorothy","Melissa","Deborah","Stephanie","Rebecca","Sharon","Laura","Cynthia"]
    lastNames = ["Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Garcia","Rodriguez","Wilson","Martinez","Anderson","Taylor","Thomas","Hernandez",
    "Moore","Martin","Jackson","Thompson","White","Lee","Lopez","Gonzalez","Harris","Clark","Lewis","Robinson","Walker","Perez","Hall","Young","Allen","Sanchez","Wright",
    "King","Scott","Green","Baker","Adams","Nelson","Hill","Ramirez","Campbell","Mitchell","Roberts","Carter","Phillips","Evans","Turner","Torres","Parker","Collins",
    "Edwards","Stewart","Flores","Morris","Nguyen","Murphy","Rivera","Cook","Rogers","Morgan","Peterson","Cooper","Reed","Bailey","Bell","Gomez","Kelly","Howard","Ward"]
    
    grade = random.choices(['EL', 'MI', 'HI', 'CO'])[0]
    subjects = random.sample(['Reading','Writing','Literature','Arithmetic','Geometry','Algebra','Calculus','Physics','Biology','Chemistry','American_History','World_History', 'European_History'], k = random.randint(1,3))
    subjects = " ".join(subjects)
    randMonth = random.randint(1,12)
    if randMonth < 10:
        randMonth = "0" + str(randMonth)
    else:
        randMonth = str(randMonth)
    randDay = random.randint(1,28)
    if randDay < 10:
        randDay = "0" + str(randDay)
    else:
        randDay = str(randDay)
    dob = str(random.randint(1970, 2015)) + "-" + randMonth + "-" + randDay
    location = random.choices(locations)[0]
    firstName = random.choices(firstNames)[0]
    lastName = random.choices(lastNames)[0]
    if student == True:
        email = firstName + lastName + str(numTest) + "@gmail.com"
        user = User(grade, email, firstName, lastName, dob, subjects, "", True, location)
    else:
        email = firstName + lastName + str(numTest + 1000) + "@gmail.com"
        user = User(grade, email, firstName, lastName, dob, subjects, "", False, location)
    return user

def profTest(numTests, student):
    profList = []
    for i in range(1, numTests + 1):
        profile = profCreate(i, student)
        profList.append(profile)
    return profList

def addUser(user):
    newProf = Profile()
    newProf.email = user.email
    newProf.first_name = user.first_name
    newProf.last_name = user.last_name
    newProf.date_of_birth = user.date_of_birth
    newProf.grade = user.grade
    newProf.subjects = user.subjects

    descriptions_file = open("Descriptions.txt", "r")
    file_lines = descriptions_file.read().splitlines()

    newProf.description = random.choice(file_lines)
    if newProf.grade == "EL":
        while "middle" in newProf.description or "high" in newProf.description or "college" in newProf.description:
            newProf.description = random.choice(file_lines)
    if newProf.grade == "MI":
        while "elementary" in newProf.description or "high" in newProf.description or "college" in newProf.description:
            newProf.description = random.choice(file_lines)
    if newProf.grade == "HI":
        while "elementary" in newProf.description or "middle" in newProf.description or "college" in newProf.description:
            newProf.description = random.choice(file_lines)
    if newProf.grade == "CO":
        while "elementary" in newProf.description or "middle" in newProf.description or "high" in newProf.description:
            newProf.description = random.choice(file_lines)
    
    #Picture
    newProf.student = user.student
    newProf.password = "test"

    newProf.location = user.location
    newProf.save()

def addUsers(numProf, numTutors):
    profList = profTest(numProf, True)
    tutList = profTest(numTutors, False)
    for prof in profList:
        addUser(prof)
    for tutor in tutList:
        addUser(tutor)