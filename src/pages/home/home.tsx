import React, { useContext, useState } from "react";

import { StoreContext } from "../../store/store";
import { EventPageData } from "../../store/use-data-io";
import { GenericTable, GenericTableColumnDefinition } from "../../components/GenericTable/GenericTable";


export function Home() {
  const { state } = useContext(StoreContext);
  const [selectedTableRows, setSelectedTableRows] = useState<Array<string>>([]);
  const [selectedAllRows, setSelectedAllRows] = useState<boolean>(false);


  const columns: Array<GenericTableColumnDefinition<EventPageData>> = [
    {
      name: "ID",
      flexGrowWidth: 0.5,
      element: (row: EventPageData) => <span className="table-row__title">{row.id}</span>,
    },
    {
      name: "First Name",
      flexGrowWidth: 1.5,
      element: (row: EventPageData) => <span className="table-row__title">{row.firstName}</span>,
    },
    {
      name: "Last Name",
      flexGrowWidth: 1.5,
      element: (row: EventPageData) => <span className="table-row__title">{row.lastName}</span>,
    },
    {
      name: "Age",
      flexGrowWidth: 1,
      element: (row: EventPageData) => <span className="table-row__title">{row.age}</span>,
    },
    {
      name: "Phone",
      flexGrowWidth: 1.5,
      element: (row: EventPageData) => <span className="table-row__title">{row.phone}</span>,
    },
  ];

  const customHeader = () =>
    columns.map((row, idx) => (
      <div
        className="table-td"
        style={{ flexGrow: row.flexGrowWidth }}
        key={idx}
      >
        {row.name || ""}
      </div>
    ));

  const selectSingleRow = (row: EventPageData) => {
    setSelectedAllRows(false);
    if (selectedTableRows.includes(row.id)) {
      setSelectedTableRows(selectedTableRows.filter(arr => arr !== row.id));
      return;
    }

    setSelectedTableRows([...selectedTableRows, row.id]);
  };


  const selectAllRows = () => {

    if (selectedAllRows) {
      setSelectedTableRows([]);
    } else {
      const list = state.data as Array<EventPageData>;
      setSelectedTableRows(list.map(arr => arr.id));
    }

    setSelectedAllRows(selectedAllRows => !selectedAllRows);
  };


  function MyTable(props: { users: Array<EventPageData> }) {
    return GenericTable<EventPageData>({
      columns: columns,
      customHeader: customHeader,
      data: props.users,
      keyGen: (row: EventPageData) => row.id,
      className: "table-wrap",
      tableName: "_test",
      withCheckbox: true,
      selectSingleRow: selectSingleRow,
      selectAllTableRows: selectAllRows,
      selectedTableRows: selectedTableRows,
      selectedAllRows: selectedAllRows,
    });
  }

  return (
    <>
      <div className="w-100 h-100 d-flex ai-center jc-center">
        <MyTable users={state.data} />
      </div>
    </>
  );
}