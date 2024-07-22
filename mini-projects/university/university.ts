import courses from './courses';
import studyGroups from './studyGroups';

type Course = {
  id: number;
  studyGroupId: number;
  title: string;
  keywords:string[];
  eventType: string;
}

type StudyGroup = {
  id: number;
  courseId: number;
  title: string;
  keywords: string[];
  eventType: string;
}

type SearchEventsOptions = {
  query: string | number;
  eventType: 'courses'|'groups';
}

function searchEvents(options: SearchEventsOptions){
  let events: (Course | StudyGroup)[] = options.eventType === 'courses' ? courses: studyGroups;
  events = events.filter(event => {
    if (typeof options.query === 'number') {
      if (event.id === options.query) {
        return true;
      }
    } else if (typeof options.query === 'string') {
      if (event.keywords.includes(options.query)) {
        return true;
      }
    }
  });
  return events;
}

const searchResults = searchEvents({query: 'art', eventType: 'courses'});
// console.log(searchResults);

let enrolledEvents: (Course | StudyGroup)[] = [];

function enroll(events: (Course | StudyGroup)[]) {
  // console.log(events);
  enrolledEvents.push(...events);
}

enroll(searchResults);
// console.log(enrolledEvents);

function drop(event: Course | StudyGroup) {
  let eventName = event.title;
  enrolledEvents = enrolledEvents.filter(event => event.title !== eventName);
  return enrolledEvents;
}

// drop(enrolledEvents[0]);
// console.log(enrolledEvents);

function printEventTitles(events: (Course | StudyGroup)[]) {
  for (let e of events) {
    console.log(e.title);
  }
}

printEventTitles(enrolledEvents);