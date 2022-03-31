/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import EnhancedTable from 'components/LeaderBoards/EnhancedTable';
import './navigation.css';

interface Table {
  key: string;
  display: string;
}

const tables = [
  { key: 'win-rate', display: 'Win Rate' },
  { key: 'top-earners', display: 'Top Earners' },
  { key: 'total-skills', display: 'Total Skills' },
];

interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

function createData(name: string, calories: number, fat: number, carbs: number, protein: number): Data {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = {
  'win-rate': [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
  ],
  'top-earners': [
    createData('Cupcake top', 335, 8.7, 67, 4.3),
    createData('Donut top', 482, 28.0, 51, 4.9),
    createData('Eclair', 262, 10.0, 14, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 36.3, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 69, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 310, 0, 0, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
  ],
  'total-skills': [
    createData('Cupcake total', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt total', 159, 6.6, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 29, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 25, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
  ],
};

export default function LeaderBoards(): JSX.Element {
  const [selectedTable, setTable] = useState(tables[0]);
  const [data, setData] = useState<[]>(rows[selectedTable.key]);
  const handleMenuClick = (table: Table) => {
    setTable(table);
  };
  useEffect(() => {
    setData(rows[selectedTable.key]);
  }, [selectedTable.key]);
  return (
    <div
      style={{
        margin: 'auto',
      }}
    >
      <Menu
        className="leader-board"
        selectedKeys={[selectedTable.key]}
        mode="horizontal"
        defaultSelectedKeys={[selectedTable.key]}
      >
        {tables.map(table => (
          <Menu.Item key={table.key} onClick={() => handleMenuClick(table)}>
            {table.display}
          </Menu.Item>
        ))}
      </Menu>
      <EnhancedTable tableName={selectedTable.display} rows={data} />
    </div>
  );
}
