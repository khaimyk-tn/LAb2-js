import { randomUserMock, additionalUsers } from './FE4U-Lab2-mock.js';

const courses = [
    'Mathematics',
    'Physics',
    'English',
    'Computer Science',
    'Dancing',
    'Chess',
    'Biology',
    'Chemistry',
    'Law',
    'Art',
    'Medicine',
    'Statistics',
];

function makeUsers(users, additionalUsers) {
    const newUsers = []
    let id = 0

    users.forEach(user => {
        const newUser = {
            id: user.id.name + user.id.value,
            gender: user.gender,
            title: user.name.title,
            full_name: user.name.first + " " + user.name.last,
            city: user.location.city,
            state: user.location.state,
            country: user.location.country,
            course: courses[Math.floor(Math.random() * courses.length)],
            favorite: Math.random() < 0.5,
            postcode: user.location.postcode,
            coordinates: user.location.coordinates,
            timezone: user.location.timezone,
            email: user.email,
            b_date: user.dob.date,
            age: user.dob.age,
            bg_color: "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16),
            phone: user.phone,
            picture_large: user.picture.large,
            picture_thumbnail: user.picture.thumbnail,
            note: "My notes"
        }

        newUsers.push(newUser)
    });

    additionalUsers.forEach(user => {
        if (!newUsers.find(newUser => newUser.id === user.id)) {
            newUsers.push(user)
        }
    });

    return newUsers
}

function isNeededString(str) {
    return typeof str === 'string' && str.at(0).toUpperCase() === str.at(0);
}

function validateObject(user) {
    if((/[A-Z][a-z]*\s[A-Z][a-z]*$/.test(user.full_name) || isNeededString(user.full_name)) &&
        (/[A-Z][a-z]*$/.test(user.state) || isNeededString(user.state)) &&
        (/([A-Z][a-z]*)|([A-Z][a-z]*(\s[A-Z][a-z]*)*)$/.test(user.country) || isNeededString(user.country)) &&
        (/([A-Z][a-z]*)|([A-Z][a-z]*(\s[A-Z][a-z]*)*)$/.test(user.city) || isNeededString(user.city)) &&
        /[a-z]*$/.test(user.gender) &&
        (/([A-Z][a-z]*)|([A-Z][a-z]*(\s[A-Z][a-z]*)*)$/.test(user.note) || isNeededString(user.note)) &&
        /([A-Za-z0-9_-]+\.)*[A-Za-z0-9_-]+@[a-z]+\.[a-z]+$/.test(user.email) &&
        (/\+38\d{10}$/.test(user.phone) || // UA
        /\d{4}-\d{7}$/.test(user.phone) || // DE
        /\d{3}-\d{8}$/.test(user.phone) || // IR
        /\d{2}-\d{4}-\d{4}$/.test(user.phone) || // AU
        /\(\d{3}\)-\d{3}-\d{4}$/.test(user.phone) || // US TR NZ NL
        /\d{2}-\d{3}-\d{3}$/.test(user.phone) || // FI
        /\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/.test(user.phone) || // FR
        /\d{3}-\d{3}-\d{3}$/.test(user.phone) || // ES
        /\d{8}$/.test(user.phone) || // NO DK
        /\d{3}\s\d{3}\s\d{2}\s\d{2}$/.test(user.phone) || // CH
        /\d{3}-\d{3}-\d{4}$/.test(user.phone)) && // IE CA
        typeof user.age === 'number') {
        return true;
    }

    return false;
}

function filtration(users, filtrationKey) {
    let resUsers = []

    const min = filtrationKey.age.split("-")[0]
    const max = filtrationKey.age.split("-")[1]

    users.forEach(user => {
       if((user.country === filtrationKey.country || filtrationKey.country === undefined) &&
           ((user.age >= min && user.age <= max) || filtrationKey.age === undefined) &&
           (user.gender === filtrationKey.gender || filtrationKey.gender === undefined) &&
           (user.favorite === filtrationKey.favorite || filtrationKey.favorite === undefined)){
           resUsers.push(user)
       }
    });

    return resUsers
}

function search(users, searchKey) {

    if(Number(searchKey) - 1 === searchKey - 1){
        return users.find(user => user.age === Number(searchKey))
    }

    const name = searchKey.split(',')[0]
    const note = searchKey.split(',')[1]
    const age = searchKey.split(',')[2]

    return users.find(user => ((user.full_name === name || name === undefined) && (user.note === note || note === undefined) && (user.age === Number(age) || age === undefined)))
}

function sort(users, key, flag) {
    let sortUsers = [...users]
    switch (key) {
        case "full_name" :
            if(flag) {
                sortUsers.sort((a, b) => a.full_name.localeCompare(b.full_name))
            } else {
                sortUsers.sort((a, b) => b.full_name.localeCompare(a.full_name))
            }
            break
        case "age":
            if(flag) {
                sortUsers.sort((a, b) => a.age - b.age)
            } else {
                sortUsers.sort((a, b) => b.age - a.age)
            }
            break
        case "b_day":
            if(flag) {
                sortUsers.sort((a, b) => a.localeCompare(b))
            } else {
                sortUsers.sort((a, b) => b.localeCompare(a))
            }
            break
        case "country":
            if(flag) {
                sortUsers.sort((a, b) => a.localeCompare(b))
            } else {
                sortUsers.sort((a, b) => b.localeCompare(a))
            }
            break
        default:
            console.log("Wrong sort key")
    }

    return sortUsers
}

function countPercents(users, percentKey) {
    const filterUsers = filtration(users, percentKey)

    return (filterUsers.length / users.length) * 100
}

// вивід
const a = makeUsers(randomUserMock, additionalUsers);
console.log(makeUsers(randomUserMock, additionalUsers));
        

(randomUserMock, additionalUsers).forEach(user => {
    const isValid = validateObject(user);
    console.log(`${user.full_name}: ${isValid ? "Valid" : "Invalid"}`);
});


const filtrationKey = {
       age: "20-55",
    country: "Ireland",
    gender: "male",
    favorite: false,
}

const result = filtration((randomUserMock,additionalUsers), filtrationKey);
console.log(result);

console.log(search((randomUserMock,additionalUsers), 'Curtis Mendoza, 46')); 


console.log(countPercents(a, {age:"18-30"}))
