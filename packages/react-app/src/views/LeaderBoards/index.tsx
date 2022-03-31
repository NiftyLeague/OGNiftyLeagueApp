import React from 'react';
import TopWinModal from 'components/LeaderBoards/TopWinModal';

export default function LeaderBoards(): JSX.Element {
  return (
    <>
      <div
        style={{
          font: '2rem bold',
          margin: '20px auto',
          alignItems: 'center',
        }}
      >
        LeaderBoards
      </div>
      <div>
        <TopWinModal />
      </div>
    </>
  );
}
