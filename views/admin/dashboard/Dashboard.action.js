import fetch from 'isomorphic-fetch';
import { ACTIONs, URLs, ERRs } from './Dashboard.constant';

function loadDataToTextTable(dispatch) {
    return () => {
        fetch(URLs.URL_DASHBOARD_TEXT)
            .then((dashboardsData) => { return dashboardsData.json(); })
            .then((dashboardsDataJson) => {
                const widget = dashboardsDataJson[0].widgets[0];
                dispatch({ type: ACTIONs.GET_DATA_TEXT_WIDGET, widget });
            });
    };
}

function loadDataToDataTable(dispatch) {
    return (index) => {
        fetch(URLs.URL_DASHBOARD_CONTACT)
            .then((contacs) => { return contacs.json(); })
            .then((contactJSON) => {
                // function to count the number of index that we need
                const totalIndex = Math.ceil((contactJSON.length / 4));
                const contacts = [];
                const lastIndex = index * 4;
                const preIndex = lastIndex - 4;
                for (let i = preIndex; i < contactJSON.length; i++) {
                    const contact = contactJSON[i];
                    if (i < lastIndex) {
                        contacts.push(contact);
                    }
                }
                dispatch({
                    type: ACTIONs.DATA_TO_TABLE_DATA,
                    totalIndex,
                    contacts,
                });
            })
            .catch(dispatch({ type: ERRs.errAPIcontact }));
    };
}

export { loadDataToTextTable, loadDataToDataTable };
