import { ACTIONs } from './Dashboard.constant';


const newLocal = 'df';

// const widget = () => {
//   fetch(URLs.URL_DASHBOARD_TEXT)
//     .then((dashboardsData) => { return dashboardsData.json(); })
//     .then((dashboardsDataJson) => {
//       return dashboardsDataJson[0].widgets[0];
//     });
// };

// const contacts = () => {
//   fetch(URLs.URL_DASHBOARD_CONTACT)
//     .then((contacs) => { return contacs.json(); })
//     .then((contactJSON) => {
//       // function to count the number of index that we need
//       const index = 1;
//       const totalIndex = Math.ceil((contactJSON.length / 4));
//       const contactsList = [];
//       const lastIndex = index * 4;
//       const preIndex = lastIndex - 4;
//       for (let i = preIndex; i < contactJSON.length; i++) {
//         const contact = contactJSON[i];
//         if (i < lastIndex) {
//           contactsList.push(contact);
//         }
//       }
//       return { contactsList, totalIndex };
//     });
// };


const INITAL_STATE = {
  widget: {
    configs: {},
  },
  contacts: {},
  totalIndex: 0,
};
export function dashboardReducer(state = INITAL_STATE, action) {
  switch (action.type) {
    case ACTIONs.GET_DATA_TEXT_WIDGET:
      return {
        ...state,
        widget: action.widget,
      };
    case ACTIONs.DATA_TO_TABLE_DATA:
      return {
        ...state,
        contacts: action.contacts,
        totalIndex: action.totalIndex,
      };
    default:
      return { ...state, default: newLocal };
  }
}
