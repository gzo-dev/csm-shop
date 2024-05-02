import { Box, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import * as React from 'react';

export default function SelectBox3(props) {

  const handleChange = (event) => {
    props.setValue(event.target.value);
    if(props.type) {
      props.setType()
    }
  };
  const handleType= ()=> {

  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl size={props.size ? props.size : "small"} fullWidth>
        <InputLabel id="demo-simple-select-label" style={{background: "#fff"}}>{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          label={props.value}
          onChange={handleChange}
          MenuProps={{disableScrollLock: true}}
        >
          {props.list.map((item, key) => (
            <MenuItem onClick={handleType} key={key} value={item.value}>
              {item.label} {item.unit && (item.unit === "meter" ? <span>m<sup>2</sup></span> : "")}
            </MenuItem>
          ))}
          {/* Render một MenuItem ẩn nếu props.value là undefined */}
          
        </Select>
      </FormControl>
    </Box>
  );
}