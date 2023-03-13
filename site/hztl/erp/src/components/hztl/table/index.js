import Table from "./src/table";
import Pagination from "./src/pagination";

Table.install = function(Vue) {
  Vue.component(Table.name, Table);
};

Pagination.install = function(Vue) {
  Vue.component(Pagination.name, Pagination);
};

export { Table, Pagination };
