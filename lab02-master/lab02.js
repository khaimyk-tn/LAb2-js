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

function getRandomColor() {
    const hex = (Math.floor(Math.random() * 256)).toString(16).padStart(2, '0');
    return hex;
}

function makeUsers(users, additionalUsers) {
    const newUsers = [];
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
            bg_color: `#${getRandomColor()}${getRandomColor()}${getRandomColor()}`,
            phone: user.phone,
            picture_large: user.picture.large,
            picture_thumbnail: user.picture.thumbnail,
            note: "My notes"
        };

        newUsers.push(newUser);
    });

    additionalUsers.forEach(user => {
        if (!newUsers.find(newUser => newUser.id === user.id)) {
            newUsers.push(user);
        }
    });

    return newUsers;
}
function isNeededString(str) {
    return typeof str === 'string' && str.at(0).toUpperCase() === str.at(0);
}

function validateObject(user) {
    let isValid = true;

    if (!(/[A-Z][a-z]*\s[A-Z][a-z]*$/.test(user.full_name) || isNeededString(user.full_name))) {
        console.log(`Invalid full_name for user: ${user.full_name}`);
        isValid = false;
    }

    if (!(/[A-Z][a-z]*$/.test(user.state) || isNeededString(user.state))) {
        console.log(`Invalid state for user: ${user.full_name}`);
        isValid = false;
    }

    if (!(/([A-Z][a-z]*)|([A-Z][a-z]*(\s[A-Z][a-z]*)*)$/.test(user.country) || isNeededString(user.country))) {
        console.log(`Invalid country for user: ${user.full_name}`);
        isValid = false;
    }

    if (!(/([A-Z][a-z]*)|([A-Z][a-z]*(\s[A-Z][a-z]*)*)$/.test(user.city) || isNeededString(user.city))) {
        console.log(`Invalid city for user: ${user.full_name}`);
        isValid = false;
    }

    if (!/[a-z]*$/.test(user.gender)) {
        console.log(`Invalid gender for user: ${user.full_name}`);
        isValid = false;
    }

    if (!(/([A-Z][a-z]*)|([A-Z][a-z]*(\s[A-Z][a-z]*)*)$/.test(user.note) || isNeededString(user.note))) {
        console.log(`Invalid note for user: ${user.full_name}`);
        isValid = false;
    }

    if (!/[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+@[a-z]+\.[a-z]+$/.test(user.email)) {
        console.log(`Invalid email for user: ${user.full_name}`);
        isValid = false;
    }

    if (!(/\+380\d{9}$/.test(user.phone) || // UA
        /\d{4}-\d{7}$/.test(user.phone) || // DE
        /\d{3}-\d{8}$/.test(user.phone) || // IR
        /\d{2}-\d{4}-\d{4}$/.test(user.phone) || // AU
        /\(\d{3}\)-\d{3}-\d{4}$/.test(user.phone) || // US TR NZ NL
        /\d{2}-\d{3}-\d{3}$/.test(user.phone) || // FI
        /\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/.test(user.phone) || // FR
        /\d{3}-\d{3}-\d{3}$/.test(user.phone) || // ES
        /\d{8}$/.test(user.phone) || // NO DK
        /\d{3}\s\d{3}\s\d{2}\s\d{2}$/.test(user.phone) || // CH
        /\d{3}-\d{3}-\d{4}$/.test(user.phone))) { // IE CA
        console.log(`Invalid phone for user: ${user.full_name}`);
        isValid = false;
    }

    if (typeof user.age !== 'number') {
        console.log(`Invalid age for user: ${user.full_name}`);
        isValid = false;
    }

    return isValid;
}

function testUsers(usersArray) {
    usersArray.forEach((user, index) => {
        console.log(`\nTesting user ${index + 1}:`);
        validateObject(user);
    });
}

function filtration(users, filtrationKey) {
    let resUsers = [];
    const min = filtrationKey.age ? filtrationKey.age.split("-")[0] : undefined;
    const max = filtrationKey.age ? filtrationKey.age.split("-")[1] : undefined;

    users.forEach(user => {
       if((user.country === filtrationKey.country || filtrationKey.country === undefined) &&
           ((user.age >= min && user.age <= max) || filtrationKey.age === undefined) &&
           (user.gender === filtrationKey.gender || filtrationKey.gender === undefined) &&
           (user.favorite === filtrationKey.favorite || filtrationKey.favorite === undefined)) {
           resUsers.push(user);
       }
    });

    return resUsers;
}

function search(users, searchKey) {
    if(Number(searchKey) === searchKey){
        return users.find(user => user.age === Number(searchKey));
    }

    const [name, note, age] = searchKey.split(',');

    return users.find(user => 
        ((user.full_name === name || name === undefined) && 
        (user.note === note || note === undefined) && 
        (user.age === Number(age) || age === undefined))
    );
}

function sort(users, key, flag) {
    let sortUsers = [...users];
    switch (key) {
        case "full_name" :
            if(flag) {
                sortUsers.sort((a, b) => a.full_name.localeCompare(b.full_name));
            } else {
                sortUsers.sort((a, b) => b.full_name.localeCompare(a.full_name));
            }
            break;
        case "age":
            if(flag) {
                sortUsers.sort((a, b) => a.age - b.age);
            } else {
                sortUsers.sort((a, b) => b.age - a.age);
            }
            break;
        case "b_day":
            if(flag) {
                sortUsers.sort((a, b) => a.b_date.localeCompare(b.b_date));
            } else {
                sortUsers.sort((a, b) => b.b_date.localeCompare(a.b_date));
            }
            break;
        case "country":
            if(flag) {
                sortUsers.sort((a, b) => a.country.localeCompare(b.country));
            } else {
                sortUsers.sort((a, b) => b.country.localeCompare(a.country));
            }
            break;
        default:
            console.log("Wrong sort key");
    }

    return sortUsers;
}

function countPercents(users, percentKey) {
    const filterUsers = filtration(users, percentKey);

    return (filterUsers.length / users.length) * 100;
}

// Демонстрація результатів для кожної функції
const users = randomUserMock;
const addUsers = additionalUsers;
const newUsers = makeUsers(users, addUsers);
console.log("New Users:", newUsers);

console.log(testUsers(newUsers));


const isValid = validateObject(newUsers[0]);
console.log("Is User Valid:", isValid);

const filteredUsers = filtration(newUsers, { country: 'United States', age: '20-30', gender: 'female', favorite: true });
console.log("Filtered Users:", filteredUsers);

const searchedUser = search(newUsers, 'Olivia Storm,old lady with a cats,25');
console.log("Searched User:", searchedUser);

const sortedUsers = sort(newUsers, 'age', true);
console.log("Sorted Users by Age:", sortedUsers);

const percentFavUsers = countPercents(newUsers, { favorite: true });
console.log("Percent of Favorite Users:", percentFavUsers);
