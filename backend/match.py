from gen import *
from geopy import distance
from geopy.geocoders import Nominatim

# profile and tutor are both of type "User"
def matchAlgo(profile, tutor):
    TOTweight = 0
    if profile.subjects == None or tutor.subjects == None:
        return 0
    userSub = profile.subjects.split(" ")
    tutorSub = tutor.subjects.split(" ")
    
    for topic in userSub:
        if topic in tutorSub:
            TOTweight += 2.5

    if TOTweight == 0:
        return 0
    
    edu = eduWeight(profile, tutor)
    if edu == 0:
        return 0
    
    TOTweight += locationWeight(profile, tutor)
    TOTweight += descWeight(profile, tutor)
    TOTweight += edu
    return TOTweight

#Helper Funcitons
def eduLevel(profile):
    eduLevel = 5
    if profile.grade == "EL":
        eduLevel = 1
    elif profile.grade == "MI":
        eduLevel = 2
    elif profile.grade == "HI":
        eduLevel = 3
    elif profile.grade == "CO":
        eduLevel = 4
    return eduLevel

def locDist(profile, tutor):
    # Initialize Nominatim API
    geolocator = Nominatim(user_agent="MyApp")
    location = geolocator.geocode(profile.location)
    userLOC = (location.latitude, location.longitude)
    
    location = geolocator.geocode(tutor.location)
    tutorLOC = (location.latitude, location.longitude)
    
    totMiles = distance.distance(userLOC, tutorLOC).miles
    return totMiles

#Weights
def descWeight(profile, tutor):
    if profile.description == None or tutor.description == None:
        return 0
    userBio = profile.description.split(" ")
    tutorBio = tutor.description.split(" ")
    blackList = ["have", "that", "with", "this", "they", "from", "that", "can't", "cant", "what", "their", "would", "make", "about", "know", "will", "there", "them",
                 "than", "then", "those"]
    weight = 0
    for words in userBio:  
        if weight >= 2.5:
            return weight 
        word = words.lower()
        if word in tutorBio and len(word) > 3 and word not in blackList:
            weight += .1
    return weight

def locationWeight(profile, tutor):
    if profile.location == None or tutor.location == None:
        return 0
    elif profile.location == tutor.location:
        return 5
    else:
        return 0

def eduWeight(profile, tutor):
    userLVL = eduLevel(profile)
    tutorLVL = eduLevel(tutor)
    #Elementary
    if userLVL == 1:
        if userLVL + 1 == tutorLVL:
            return 5
        elif userLVL == tutorLVL:
            return 2.5
        elif userLVL + 2 == tutorLVL:
            return 2
        else:
            return 1

    #Middle School    
    elif userLVL == 2:
        if userLVL + 1 == tutorLVL:
            return 5
        elif userLVL == tutorLVL:
            return 3
        elif userLVL < tutorLVL:
            return 1
        else:
            return 0

    #Highschool/College/Above    
    else:
        if userLVL == tutorLVL:
            return 5
        elif userLVL + 1 == tutorLVL:
            return 3
        else:
            return 0