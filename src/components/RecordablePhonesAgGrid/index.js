import React, {useEffect, useState} from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const AgGridTable = () => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        fetch('http://netcmdb-dev.rs.ru/phone/recordable.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData))
    }, []);

    return (
        <div className="ag-theme-alpine" style={ { height: '100%', width: 'auto' } }>
            <AgGridReact
                pagination={true}
                rowData={rowData}>
                <AgGridColumn field="recorder" sortable={true} filter={true} ></AgGridColumn>
                <AgGridColumn field="dn" sortable={true} filter={true} ></AgGridColumn>
                <AgGridColumn field="city" sortable={true} filter={true} ></AgGridColumn>
                <AgGridColumn field="office" sortable={true} filter={true} ></AgGridColumn>
                <AgGridColumn field="phoneName" sortable={true} filter={true} ></AgGridColumn>
                <AgGridColumn field="phoneModel" sortable={true} filter={true} ></AgGridColumn>
                <AgGridColumn field="ipAddress" sortable={true} filter={true} ></AgGridColumn>
                <AgGridColumn field="inventoryNumber" sortable={true} filter={true} ></AgGridColumn>
                <AgGridColumn field="lastUpdate" sortable={true} filter={true} ></AgGridColumn>
                {/*<AgGridColumn field="appAge" sortable={true} filter={true} ></AgGridColumn>*/}
                {/*<AgGridColumn field="isDuplicateDN" sortable={true} filter={true} ></AgGridColumn>*/}
                {/*<AgGridColumn field="isHiddenDuplicate" sortable={true} filter={true} ></AgGridColumn>*/}
            </AgGridReact>
        </div>
    );
};

export default AgGridTable;