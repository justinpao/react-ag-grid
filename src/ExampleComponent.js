import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const App = ({ triggerQuery, model, modelUpdate }) => {

 const gridRef = useRef(); // Optional - for accessing Grid's API
//  const [rowData, setRowData] = useState(model.data); // Set rowData to Array of Objects, one Object per Row
const rowData = [
  { orgHierarchy: ['Erica'], jobTitle: "CEO", employmentType: "Permanent" },
  { orgHierarchy: ['Erica', 'Malcolm'], jobTitle: "VP", employmentType: "Permanent" }
  
]
// just return the hierarchy, no conversion required
const getDataPath: data => {return data.orgHierarchy;}
 // Each Column Definition results in one Column.
 const [columnDefs, setColumnDefs] = useState(model.columns);

 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo( ()=> ({
     sortable: true
   }));

 // Example of consuming Grid Event
 const cellClickedListener = useCallback( event => {
   console.log('cellClicked', event);
 }, []);

 // Example load data from sever
//  useEffect(() => {
//    fetch('https://www.ag-grid.com/example-assets/row-data.json')
//    .then(result => result.json())
//    .then(rowData => setRowData(rowData))
//  }, []);

 // Example using Grid's API
 const buttonListener = useCallback( e => {
   gridRef.current.api.deselectAll();
 }, []);

 return (
   <div>

     {/* Example using Grid's API */}
     <button onClick={() =>
            triggerQuery('query5')
          
          }>Push Me</button>
      
     {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
     <div className="ag-theme-alpine-dark" style={{width: 1100, height: 650}}>

       <AgGridReact
           
           ref={gridRef} // Ref for accessing Grid's API

           rowData={rowData} // Row Data for Rows


           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties

           animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           rowSelection='multiple' // Options - allows click selection of rows

           onCellClicked={cellClickedListener} // Optional - registering for Grid Event
           />
     </div>
   </div>
 );
};

export default App;