import React, {FC} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {  Attribute } from '../../../store';


interface TableProps {
    attributes: Attribute[],
    normalization: boolean,
}


const NFTtable: FC<TableProps> = ({attributes, normalization}) => {

  return (
    <TableContainer sx={{ width: 580, maxHeight: 380 }} component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Trait</TableCell>
            <TableCell align="center">Value</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">%</TableCell>
            <TableCell align="center">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attributes.map((attribute) => (
            <TableRow
              key={attribute.trait_type}
              sx={{ '&:last-child td, &:last-child th': { border: 0 , width: 50} }}
            >
              <TableCell component="th" scope="row">
                {attribute.trait_type}
              </TableCell>
              <TableCell align="center"> - </TableCell>
              <TableCell align="center"> - </TableCell>
              <TableCell align="center"> - </TableCell>
              <TableCell align="center">{ normalization ? 
                        Math.round(attribute.value_normalized_rarity_score) : 
                        Math.round(attribute.value_rarity_score) }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default NFTtable;