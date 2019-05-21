import React from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import http, { simulationDataAPI } from '../../httpRequestModule/index.js';

export default class SimulationsList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      savedSimulationsList: [],
    };
  }
  
  componentDidMount() {
    const {userId} = this.props;
    http.get(simulationDataAPI(userId))
      .then(({data}) => {
        let savedSimulationsList = JSON.parse(data);
        this.setState({savedSimulationsList})
      })
  }
  
  deleteSimulationDataEntry(entry) {
    const {userId} = this.props;
    
    http.delete(simulationDataAPI(userId, entry._id))
      .then(({data}) => {
        let {savedSimulationsList} = this.state;
        const dataEntryIndex = savedSimulationsList.indexOf(entry);
        savedSimulationsList.splice(dataEntryIndex, 1);
        this.setState({savedSimulationsList})
      })
  };

  render() {
    const {engine} = this.props;
    const {savedSimulationsList} = this.state;
    
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Simulation date</TableCell>
              <TableCell align="right">Objects amount</TableCell>
              <TableCell align="right">Load</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedSimulationsList.map(simulation => (
              <TableRow key={simulation._id}>
                <TableCell component="th" scope="row">
                  {simulation.date}
                </TableCell>
                <TableCell align="right">{simulation.jointsList.length}</TableCell>
                <TableCell align="right"
                           onClick={() => {
                             engine.loadJointsFromList(simulation.jointsList)
                           }}>
                  Load
                </TableCell>
                <TableCell align="right"
                           onClick={() => {
                             this.deleteSimulationDataEntry(simulation)
                           }}>
                  Delete
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}