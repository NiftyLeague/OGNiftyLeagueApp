/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import EnhancedTable from 'components/LeaderBoards/EnhancedTable/EnhancedTable';
import './navigation.css';
import { DataType, TableType } from 'types/leaderboard';
import { tables } from 'constants/leaderboard';
import { fetchScores } from 'utils/leaderboard';

export default function LeaderBoards(): JSX.Element {
  const [selectedTable, setTable] = useState(tables[0]);
  const [data, setData] = useState<DataType[]>();
  const handleMenuClick = (table: TableType) => {
    setTable(table);
  };
  // useEffect(() => {
  //   setData(rows['win-rate']);
  // }, []);
  const fetchTopData = async () => {
    const arrayData:DataType[] = await fetchScores(selectedTable.key, 50);
    setData(arrayData);
  };
  useEffect(() => {
    void fetchTopData();
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
      {data && <EnhancedTable rows={data} selectedTable={selectedTable} />}
    </div>
  );
}
