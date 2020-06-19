import Vue from "vue";

const dateFilter = () => formateDate();

function formateDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDay();
  return `${year}/${month}/${day}`;
}

Vue.filter("dateFilter", dateFilter);
