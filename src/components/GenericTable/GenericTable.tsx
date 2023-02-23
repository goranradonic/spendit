import React, { useEffect, useState } from "react";
import cn from "classnames";
import "./generic-table.scss";

export type GenericTableColumnDefinition<T> = {
  name?: string;
  element: (row: T) => JSX.Element | string | number;
  width?: string;
  flexGrowWidth?: number;
  visible?: boolean;
  rowClass?: string;
  className?: string;
};

export function GenericTable<T>(props: {
  header?: () => JSX.Element;
  columns: Array<GenericTableColumnDefinition<T>>;
  data: Array<T>;
  keyGen: (row: T, idx: number) => string;
  className?: string;
  rowClassName?: (row: T, idx: number) => Array<string>;
  onRowClick?: (row: T, idx: number) => void;
  tableName: string;
  customHeader?: () => JSX.Element[]
  withCheckbox?: boolean
  selectedTableRows?: Array<string>
  selectSingleRow?: (id: T) => void
  selectAllTableRows?: () => void
  selectedAllRows?: boolean
}) {
  const [tableColumns, setTableColumns] = useState(props.columns);

  useEffect(() => {
    const extendedTableColumns = props.columns.map(column => ({ ...column, visible: true }));
    setTableColumns(extendedTableColumns);
  }, [props.columns]);


  return (
    <div className={props.className}>
      {props.header && props.header()}

      {props.customHeader && (<div
        className="table-headline-wrapper table-row table-headline">
        {props.withCheckbox &&
          <div className="table-td" style={{ flexGrow: 0.5 }} >
            <label>
              <input
                type="checkbox"
                checked={props.selectedAllRows}
                onChange={() => props.selectAllTableRows && props.selectAllTableRows()}
              />
            </label>
          </div>}
        {props.customHeader()}
      </div>)}
      {props.data.map((row, idx) => {

        return (
          <div className="table-row-wrapper" key={props.keyGen(row, idx)}>
            <div
              className={cn([
                "table-row table",
                ...(props.rowClassName ? props.rowClassName(row, idx) : []),
              ])}
              onClick={() => {
              }}
            >
              {props.withCheckbox && (
                <div
                  className="table-td"
                  style={{ flexGrow: .5 }}
                  key={idx}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={props.selectedAllRows ? props.selectedAllRows : props.selectedTableRows?.some(r=>r=== props.keyGen(row, idx)) }
                      onChange={() => props.selectSingleRow && props.selectSingleRow(row)}
                    />
                  </label>
                </div>
              )}
              {tableColumns.map((column, idxColumn) => {

                return (

                  <div
                    className={cn("table-td", column.rowClass)}
                    style={{ flexGrow: column.flexGrowWidth, display: !column.visible ? "none" : "" }}
                    key={idxColumn}
                  >
                    {column.element(row)}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
