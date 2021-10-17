import React, {FC} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {  Attribute } from '../../../store';
import { useSelector } from 'react-redux';


interface TableProps {
    attributes: Attribute[],
    normalization: boolean,
}


const NFTtable: FC<TableProps> = ({attributes, normalization}) => {

    // countOfAllAttribute2
    const {projectInfo, countOfAllAttribute2} = useSelector((state: any) => state);
    console.log("countOfAllAttribute2 ", countOfAllAttribute2)
    console.log("projectInfo ", projectInfo)


  return (
    <TableContainer sx={{ width: 580, maxHeight: 380 }} component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Trait</TableCell>
            <TableCell align="center">Attribute</TableCell>
            <TableCell align="center">Count</TableCell>
            <TableCell align="center">Probability</TableCell>
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
              <TableCell align="center"> {attribute.value} </TableCell>
              <TableCell align="center"> {countOfAllAttribute2[attribute.trait_type].trait_count[attribute.value].count} </TableCell>
              <TableCell align="center"> {(countOfAllAttribute2[attribute.trait_type].trait_count[attribute.value].count / projectInfo.range.range * 100).toFixed(2)} </TableCell>
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