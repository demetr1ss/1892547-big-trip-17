import { generateTripEvent } from '../mock/generate-trip-event.js';

export default class EventsModel {
  eventModelList = Array.from({length: 10}, generateTripEvent);

  getPoints = () => this.eventModelList;
}