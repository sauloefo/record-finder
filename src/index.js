import "./styles.css";

import createData from "./DataFactory";
import findRecord from "./RecordFinder";

const data = createData();

const getSearchResultPlaceholder = () =>
  document.getElementById("searchResult");

const getNameQueryInputField = () => document.getElementById("nameQueryInput");

const getDescriptionQueryInputField = () =>
  document.getElementById("descriptionQueryInput");

const search = (query, fieldName) => {
  const searchResult = findRecord(query, data, fieldName);

  if (!query) {
    getSearchResultPlaceholder().innerHTML = "";
  } else if (searchResult.length === 0) {
    getSearchResultPlaceholder().innerHTML = `<h2>No results for "${query}" in "${fieldName}" field</h2>`;
  } else {
    getSearchResultPlaceholder().innerHTML = `<h2>Search Results</h2><table>
    <thead>
      <th>Id</th>
      <th>Name</th>
    </thead>
    <tbody>
      ${searchResult
        .map(
          record => `
      <tr>
        <td>${record.Id}</td>
        <td>${record.Name}</td>
      </tr>
      `
        )
        .join("")}
    </tbody>
  </table>`;
  }
};

const handleNameQueryChange = event => {
  getDescriptionQueryInputField().value = "";
  search(event.target.value, "Name");
};

const handleDescriptionQueryChange = event => {
  getNameQueryInputField().value = "";
  search(event.target.value, "Description");
};

getNameQueryInputField().onkeyup = handleNameQueryChange;
getDescriptionQueryInputField().onkeyup = handleDescriptionQueryChange;

// document.getElementById("app").innerHTML = `
// <h1>Hello Vanilla!</h1>
// <div>
//   We use Parcel to bundle this sandbox, you can find more info about Parcel
//   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
// </div>
// `;
