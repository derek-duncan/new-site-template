/**
 * action types
 */

// export const HIDE_HEADER_LINK = 'remember/app/HIDE_HEADER_LINK';

const initialState = {};

/**
 * Reducer
 */
export default function reducer(state = initialState, action) {

  switch (action.type) {

    // case HIDE_HEADER_LINK:

    //   return {
    //     ...state,
    //     displayHeaderLink: false
    //   };

    default:
      return state;
  }
}

/**
 * Action creators
 */

// export function hideHeaderLink() {

//   return {
//     type: HIDE_HEADER_LINK
//   };
// }
