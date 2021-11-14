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

  // export interface Attribute {
  //   [trait_type :string] : {
  //     [trait_value: string] : {
  //         trait_type :string, 
  //         value: string,
  //         value_rarity_score: number,
  //         value_normalized_rarity_score: number
  //     }
  //   }
  // }

  // export interface CountOfEachAttribute2Values {
  //   trait_type: string,
  //   trait_count: any, 
  //   total_variations: number,
  //   // presenceInTokens: string[] 
  // }
  
  // export interface CountOfEachAttribute2 {
  //   [trait_type: string]: CountOfEachAttribute2Values
  // }

const NFTtable: FC<TableProps> = ({attributes, normalization}) => {

  console.log("attributes in NFT TAble", attributes)

  // return  <div> Hello</div>

    const {projectInfo, countOfAllAttribute2} = useSelector((state: any) => state);
    
    const newAttributes = attributes.map((attribute) => {
      const att =  {  
          trait: attribute.trait_type,
          value: attribute.trait_value, 
          count: countOfAllAttribute2[attribute.trait_type].trait_count[attribute.trait_value].count,
          probability: countOfAllAttribute2[attribute.trait_type].trait_count[attribute.trait_value].count / projectInfo.range.range * 100 ,
          score: attribute[attribute.trait_value].value_rarity_score.toFixed(2),
          normalized_score: attribute[attribute.trait_value].value_normalized_rarity_score.toFixed(2)
         }

//          normalized_rarity_score: 9.952060931899641
// rarity_score: 24.25
        return att;
    })

    newAttributes.sort((a: any,b: any) => { return a.probability - b.probability })
    // console.log(newAttributes)


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
          {newAttributes.map((attribute: any) => (
            <TableRow
              key={attribute.trait}
              sx={{ '&:last-child td, &:last-child th': { border: 0 , width: 50} }}
            >
              <TableCell component="th" scope="row"> {attribute.trait} </TableCell>
              <TableCell align="center"> {attribute.value} </TableCell>
              <TableCell align="center"> {attribute.count} </TableCell>
              <TableCell align="center"> {`${(attribute.probability).toFixed(2)}%`} </TableCell>
              <TableCell align="center">{ normalization ? attribute.normalized_score : attribute.score }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default NFTtable;