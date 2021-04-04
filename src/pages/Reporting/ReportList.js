import { connect } from "react-redux";
import ReportTable from '../../components/ReportTable/ReportTable';
import React, { useState, useEffect } from 'react';
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";
import {  FormControl, MenuItem, Select } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import request from "../../service";

import './ReportList.scss';
import { frequenciesFilter } from './constants';

const ReportList = ({push}) => {
    const [reports, setReports] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [filter, setFilter] = useState([]);
    const [selectedFrequency, setSelectedFrequency] = useState("noFilter");
    const [selectedName, setSelectedName] = useState("");
    const [title, setTitle] = useState("");
   
    //za probu
    let rep= [
        {
          "reportId": 0,
          "name": "string",
          "userId": 0,
          "nextDate": "2021-04-03T12:53:19.367Z",
          "frequency": "string",
          "query": "string",
          "sendEmail": true,
          "deleted": true,
          "reportInstances": [
            {
              "id": 0,
              "reportId": 0,
              "name": "string",
              "uriLink": "string"
            },
            {
                "id": 1,
                "reportId": 0,
                "name": "string0",
                "uriLink": "string"
              }
          ]
        },
        {
            "reportId": 1,
            "name": "string",
            "userId": 0,
            "nextDate": "2021-04-03T12:53:19.367Z",
            "frequency": "string",
            "query": "string",
            "sendEmail": true,
            "deleted": true,
            "reportInstances": [
              {
                "id": 2,
                "reportId": 0,
                "name": "string1",
                "uriLink": "string"
              }
            ]
          }
      ];
      const changeTitle = (event) => {
        setTitle(event.target.value);
    };

      const filterFrequency =  (event) => {
        setSelectedFrequency(event.target.value);
        if(event.target.value  === "noFilter") {
            setFilter([]);
        } else {
            setFilter([event.target.value]);
        }     
    };
    const emptyReports = () =>{
        let size = reports.length;
        for(let i = 0; i < size ; i++)
            reports.pop();
    };
    const setData = async (frequencies) => {
        emptyReports();

        if(frequencies === null){
            setReports([]);
            const res = await request("https://si-2021.167.99.244.168.nip.io/api/report/AllReportsForUser");
            for (let re of res.data.data) 
                for (let r of re.reportInstances)
                    reports.push(r);
            
            //za probu
            // for (let re of rep) 
            //     for (let r of re.reportInstances)
            //         reports.push(r);

            setReports(reports);
            
        }
        else{
            const res = await request('https://si-2021.167.99.244.168.nip.io/api/report/GetReports?' + `Frequency=${frequencies}`);
            setReports([]);
            for (let repo of res.data.data) 
                for (let r of repo.reportInstances)
                    reports.push(repo);
            
            setReports(reports);
        }
    };

    useEffect(() => {
        setReports([]);
        let freq = null;
        if(selectedFrequency !== "noFilter")
            freq = selectedFrequency;
        console.log("freq",freq);
        setData(freq);
    }, [filter]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className="reportingWrapper">
             <div  className="header">
                <h1> Report List</h1>
                <button className="createReport" onClick={() => push(RouteLink.Reporting)}>New report</button>
                
            </div>
            <div className="reportTable">
            <button className="searchReport" onClick={handleOpen}>Filter</button>
      {open ?
                <FormControl className="filter"style={{ float: 'right' }}>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        >
                        <MenuItem disabled>
                            <em>Frequency</em>
                        </MenuItem>
                        <MenuItem value={selectedFrequency}>
                        {frequenciesFilter.length > 0 &&
                            <Select className="select" labelId="frequencyLabel" value={selectedFrequency} onChange={filterFrequency}>
                                {frequenciesFilter.map(el => <MenuItem key={el.name} value={el.name}> {el.label} </MenuItem>)}
                            </Select>
                        }
                        </MenuItem>
                    </Select>
                </FormControl>
                : null}
            </div>
            <div className="reportTable">
                <ReportTable reports={ reports} />     
            </div>
        </div>
    )
};
export default connect(state => ({}), {push})(ReportList);
