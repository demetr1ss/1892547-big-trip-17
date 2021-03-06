import NewEventButtonView from './view/new-event-button-view.js';
import FilterModel from './model/filter-model.js';
import EventsModel from './model/events-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import EventsApiService from './api-services/api-service.js';
import { render } from './framework/render.js';

const AUTHORIZATION = 'Basic hHh3h21DS93213ds';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const eventsModel = new EventsModel(new EventsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(tripEventsContainer, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, eventsModel);
const tripInfoPresenter = new TripInfoPresenter(tripMainContainer, tripPresenter, eventsModel);
const newEventButtonComponent = new NewEventButtonView();

const handleNewEventFormClose = () => {
  newEventButtonComponent.element.disabled = false;
};

const handleNewEventButtonClick = () => {
  tripPresenter.createEvent(handleNewEventFormClose, eventsModel.destinations, eventsModel.offers);
  newEventButtonComponent.element.disabled = true;
};

filterPresenter.init();
tripPresenter.init();
eventsModel.init()
  .finally(() => {
    tripInfoPresenter.init();
    render(newEventButtonComponent, tripMainContainer);
    newEventButtonComponent.setClickHandler(handleNewEventButtonClick);
  });
