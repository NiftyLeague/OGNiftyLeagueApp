import * as React from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
// eslint-disable-next-line import/no-extraneous-dependencies
import { visuallyHidden } from '@mui/utils';
import { EnhancedTableProps } from 'types/leaderboard';

export default function EnhancedTableHead(props: EnhancedTableProps): JSX.Element | null {
  const { order, orderBy, onRequestSort, rows } = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell align="left" padding="none" sortDirection={orderBy === 'rank' ? order : false}>
          <TableSortLabel
            active={orderBy === 'rank'}
            direction={orderBy === 'rank' ? order : 'asc'}
            onClick={createSortHandler('rank')}
          >
            RANK
            {orderBy === 'rank' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell align="left" padding="none">
          <TableSortLabel>USER ID</TableSortLabel>
        </TableCell>
        {rows.map(headCell => (
          <TableCell
            key={headCell.key}
            align="left"
            padding="none"
            sortDirection={orderBy === headCell.key ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.key}
              direction={orderBy === headCell.key ? order : 'asc'}
              onClick={createSortHandler(headCell.key)}
            >
              {headCell.display}
              {orderBy === headCell.key ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
