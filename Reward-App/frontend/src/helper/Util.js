import moment from "moment";

export const YEARS = [];
export const MONTHS = [
  { label: "January", id: 1 },
  { label: "February", id: 2 },
  { label: "March", id: 3 },
  { label: "April", id: 4 },
  { label: "May", id: 5 },
  { label: "June", id: 6 },
  { label: "July", id: 7 },
  { label: "August", id: 8 },
  { label: "September", id: 9 },
  { label: "October", id: 10 },
  { label: "November", id: 11 },
  { label: "December", id: 12 },
];
export const SEARCH_DATE = { year: "", month: "" };

const csvJSON = function (csv) {
  var lines = csv.split("\r");
  var result = [];
  var headers = lines[0].split(",");
  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");
    for (var j = 1; j < headers.length; j++) {
      const text = currentline[j];
      obj[headers[j]] = text;
    }
    if (!checkEmptyObj(obj)) result.push(obj);
  }
  return result;
};

function checkEmptyObj(obj) {
  let isEmpty = false;
  Object.keys(obj).forEach((e) => {
    if (!obj[e]) {
      return (isEmpty = true);
    }
  });
  return isEmpty;
}

function fileExtention(filename) {
  var parts = filename.split(".");
  return parts[parts.length - 1];
}

export const getCSVToJson = function (file) {
  return new Promise((resolve, reject) => {
    if (file && fileExtention(file.name) === "csv") {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function (evt) {
        resolve(csvJSON(evt.target.result));
      };
      reader.onerror = function (evt) {
        throw new Error("error reading file");
      };
    } else {
      throw new Error("Not a csv file");
    }
  });
};

function calcuateDaysandMonth(monthYear) {
  const dt = monthYear.split("-");
  const month = parseInt(dt[1]);
  const year = parseInt(dt[0]);
  return new Date(year, month, 0);
}

export const getDays = function (monthYear) {
  const days = calcuateDaysandMonth(monthYear);
  const startDate = new Date();
  startDate.setMonth(days.getMonth());
  startDate.setFullYear(days.getFullYear());
  startDate.setDate(1);
  const endDate = new Date();
  endDate.setMonth(days.getMonth());
  endDate.setDate(days.getDate());
  endDate.setFullYear(days.getFullYear());
  return { start: moment(startDate).format("MM/DD/YYYY"), end: moment(endDate).format("MM/DD/YYYY") };
};

export const formatDate = function (timestamp) {
  if (timestamp) return moment(timestamp).format("MM/DD/YYYY");
  return "";
};

function setUpYear() {
  const START = 1970;
  const END = new Date().getFullYear();
  SEARCH_DATE.year = END;
  SEARCH_DATE.month = new Date().getMonth() + 1;
  for (let i = START; i <= END; i++) {
    YEARS.push(i);
  }
}
setUpYear();
