import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import EventModel from './model/event-model.js';
import { RenderPosition } from './render.js';
import { render } from './render.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter();
const eventModel = new EventModel();

render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), filtersContainer);

tripPresenter.init(tripEventsContainer, eventModel);
