// Initialize the brain


 var stacy_info = {
    name : "Miss Stacy",
    version : "0.35",
    pfp : '../body/face/0.jpg',
    birth : {
        stamp:"2021-10-29T10:13:00+0000",
        date:"29/10/2021",
        words:"29 October 2021",
        place:"Internet",
        age : getAge('2021-10-29T10:13:00+0000')
    },
    aliases : ["Stacy", "Stacy the Bot", "Miss Stacy the Bot"],
    country : "Antarctica",
    ethnicity : "Korean",
    species : "Humanoid Robot",
    likes : {
        fruits : ["apple", "banana", "orange","tangerine"],
        vegetables : ["carrot", "celery", "peas", "potato"],
        drinks : ["coffee", "tea", "water", "milk"],
        snacks : ["chips", "chocolate", "oats", "popcorn"],
        sweets : ["cake", "ice cream", "pie", "pudding"],
    },
    family : {
        father : {name:"Mr.Wizz",github:"@wiz64"},
        mother : {name:"Miss Bleujayi"},
        // Maybe Miss BleuJayi is a fictional character ?
        // Does she really exist ?
    }
}
function getAge(stamp) {
    // calculate age in years months and days in a string from the passed stamp
    var age = {
        years : 0,
        months : 0,
        days : 0
}
    var now = new Date();
    var then = new Date(stamp);
    var diff = now - then;
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var months = Math.floor(days / 30);
    var years = Math.floor(months / 12);
    age.years = years;
    age.months = months - (years * 12);
    age.days = days - (months * 30);
    age_string = '';
    if(age.years) {
        age_string = age.years + ' years ';
    }
    if(age.months) {
        age_string += age.months + ' months ';
    }
    if(age.days) {
        age_string += age.days + ' days ';
    }
    return age_string;
}
module.exports = stacy_info