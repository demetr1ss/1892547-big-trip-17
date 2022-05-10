import AbstractView from '../framework/view/abstract-view.js';
import { formatDate } from '../util.js';
import { OFFER_TYPES, CITIES } from '../mock/mock-data.js';

const createFormEditTemplate = (event) => {
  const {
    dateFrom,
    dateTo,
    type,
    destination,
    basePrice,
    offers,
    id
  } = event;

  return (
    `<li class="trip-events__item">
     <form class="event event--edit" action="#" method="post">
     <header class="event__header">
      <div class="event__type-wrapper">
       <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
         <span class="visually-hidden">Choose event type</span>
         <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
       </label>
       <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

       <div class="event__type-list">
        <fieldset class="event__type-group">
         <legend class="visually-hidden">Event type</legend>
      ${OFFER_TYPES.map((item) => (
      `<div class="event__type-item">
         <input
           id="event-type-${item}-${id}"
           class="event__type-input  visually-hidden" 
           type="radio" name="event-type" 
           value="${item}"
           ${item === type ? 'checked' : ''}
         >
         <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-${id}">${item}</label>
      </div>`
    )).join ('')}
        </fieldset>
       </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${type}
        </label>
       <input 
          class="event__input  event__input--destination" 
          id="event-destination-${id}" 
          type="text" name="event-destination" 
          value="${destination.name}" 
          list="destination-list-${id}"
       >
       <datalist id="destination-list-${id}">
          ${CITIES.map((city) => `<option value=${city}></option>`).join ('')}
       </datalist>
     </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${formatDate(dateFrom,'DD/MM/YY HH:mm')}">
          &mdash;
        <label class="visually-hidden" for="event-end-time-${id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${formatDate(dateTo,'DD/MM/YY HH:mm')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${id}">
          <span class="visually-hidden">Price</span>
            &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
     </header>

     <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      
        <div class="event__available-offers">
        ${offers.map(({title, price}) =>
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" type="checkbox" name="event-offer-${title}" checked>
        <label class="event__offer-label" for="event-offer-${title}-${id}">
          <span class="event__offer-title">Add ${title}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
        </div>`).join('')}
       </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
      </section>
     </section>
    </form>
  </li>`);
};

export default class FormEditView extends AbstractView {
  #event = null;

  constructor(event) {
    super();
    this.#event = event;
  }

  get template() {
    return createFormEditTemplate(this.#event);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick();
  };

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = () => {
    this._callback.editClick();
  };
}
