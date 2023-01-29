from match import *
from gen import *
from signup.models import Profile

def get_queryset(self):
    cityId = self.request.GET.get('city')
    # this reads query param
    if cityId is None:
        queryset = branch.objects.all()
        # queryset = branch.objects.none()
    else:
        queryset = branch.objects.filter(city=cityId)
    return queryset

# This is the holy grail method OMG
def pullFromData(user_email):
    user = list(Profile.objects.filter(email=user_email))[0]

    all_tutors = [tutor for tutor in list(Profile.objects.filter(student=False)) if tutor.email not in user.blacklist]
    sorted_tutors = sortByMatch(user, all_tutors)

    return sorted_tutors

# Evan's goated method (cracked fr)
def sortByMatch(user, tutors):
    for i, tutor in enumerate(tutors):
        tutors[i] = (tutor, matchAlgo(user, tutor))
    tutors.sort(key = lambda x: x[1])
    tutors.reverse()
    return [tutor[0] for tutor in tutors]


if __name__ == "__main__":
    pullFromData(list(Profile.objects.filter(student=True))[0].email)