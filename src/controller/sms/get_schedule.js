
const items = [
  'Here’s a list of all of the events over the next two days: https://docs.google.com/spreadsheets/d/12irdAKs96SO_6_v3HWrVNLOZhM5wTpHbBcloj_MvftY',
  'Also, make sure to keep your phone safe and secure. Check out these tips: http://www.slate.com/blogs/future_tense/2017/01/19/a_cellphone_rights_guide_for_trump_protesters_and_the_women_s_march.html',
  'Finally, we’ve collected a lot of useful resources for folks on the ground together in one place: https://in.staywoketech.org/inauguration.html',
]

// exporting a function which returns a copy of the above array, so callers can modify as needed
module.exports = function getSchedule() {
  return items.slice()
}


// old
// newlines in this file are important. they control the format of the SMS message sent to the user.
// module.exports = [
//   `Inauguration Protest
// January 20, 2017 at 7am
// Navy Memorial
// 701 Pennsylvania Ave NW
// (Pennsylvania Ave between 7th and 9th)
// Washington, DC 20004`,
//
//   `The Love-a-thon Concert
// Friday, January 20, 2017 at 12:30pm
// Music, entertainment, and stories about causes that matter.
// https://www.facebook.com/loveathon/`,
//
//   `The Women's March
// Saturday, January 21, 2017
// 10:00am to 1:15pm
// Meet at the intersection of Independence Avenue and Third Street, near the U.S. Capitol.
// Washington, DC`,
// ]
