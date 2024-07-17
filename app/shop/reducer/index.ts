export function reducer(state: ReducerState, action: Action): ReducerState {
  const { type, payload } = action;
  switch (type) {
    case "SET_PAGE": {
      state = { ...state, page: payload };
      break;
    }

    case "SET_SORT_OPTION": {
      state = { ...state, sortOption: payload, page: 1 };
      break;
    }

    case "SET_PRICE_RANGE": {
      state = { ...state, priceRange: payload, page: 1 };
      break;
    }

    case "RESET_PRICE_RANGE": {
      state = { ...state, priceRange: 40, page: 1 };
      break;
    }

    case "SET_CATEGORY": {
      state = { ...state, selectedCategory: payload, page: 1 };
      break;
    }

    default: {
      state = state;
    }
  }
  return state;
}

interface ReducerState {
  page: number;
  sortOption: string;
  priceRange: number;
  selectedCategory: string;
}

interface Action {
  type: string;
  payload: any;
}
