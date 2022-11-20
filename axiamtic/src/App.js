import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import "./App.css";
import { useState } from "react";

function App() {
  const [apps, setApps] = useState([
    { title: "Notion", id: 1 },
    { title: "Jira", id: 2 },
    { title: "Slack", id: 3 },
    { title: "MS Azure", id: 4 },
  ]);

  const [value, setValue] = useState("");

  const [selectedApps, setSelectedApps] = useState([
   
  ]);

  const handleSelect = (e) => {
    if (!e.target.value.length) return;
    setSelectedApps([
      ...selectedApps,
      apps.filter((app) => app.title === e.target.value)[0],
    ]);
    setApps(apps.filter((app) => app.title !== e.target.value));
    setValue("");
  };

  const handleDeletion = (e, title) => {
    if (!title &&  title.length) return;
    setApps([
      ...apps,
      selectedApps.filter((app) => app.title === title)[0],
    ]);
    setSelectedApps(selectedApps.filter((app) => app.title !== title));
  };

  const handleAddition =(e)=> {
    const input = document.getElementsByTagName('input');
    input[0].focus()
    input[0].click()
  }

  const submitData = () => { 
    //make api call
    console.log(selectedApps)
  }


  return (
    <div className="app">
      <div className="selections">
        {selectedApps.length > 0
          ? selectedApps.map((app) => {
              return (
                <div key={Math.random()} className="item-container selected">
                  <p>{app.title}</p>
                  <span
                    className="remove"
                    onClick={(e) => handleDeletion(e, app.title)}
                  >
                    x -  Remove
                  </span>
                </div>
              );
            })
          : null}

        {4 - selectedApps.length >= 0
          ? [...Array(4 - selectedApps.length).keys()].map((app) => {
              return (
                <div key={Math.random()} className="item-container">
                  <div className="add-btn"  onClick={(e) => handleAddition(e)}>
                    <AddRoundedIcon />
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <div className="instructions">
        <div className="step-chip">1 of 3</div>
        <h2 className="label">Lets add your internal tools</h2>
        <p className="desc">
          Search to quickly add products your team user today. You'll be able to
          add as many as you need later but for now lets add four.
        </p>
        <Autocomplete
        openOnFocus
          classes={{ root: "input" }}
          freeSolo
          options={apps.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              placeholder="Search for any software"
              {...params}
              onSelectCapture={(e) => handleSelect(e)}
              value={value}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Button className="btn" variant="contained" disableElevation disabled={selectedApps.length < 4} onClick={() => submitData()}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default App;
