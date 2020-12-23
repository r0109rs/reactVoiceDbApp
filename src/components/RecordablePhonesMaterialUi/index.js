import React, {forwardRef} from 'react';
import MaterialTable from 'material-table';
import {
    AddBox, ArrowDownward,
    Check, ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage, LastPage, Remove,
    SaveAlt,
    Search, ViewColumn
} from "@material-ui/icons";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

class MaterialUiTable extends React.Component {

    constructor(props) {
        super(props);
        this.tableRef = React.createRef();
    }
    state = {
        loading:false,
        stats: [],
    }

    componentDidMount() {
        this.setState({ loading: true })
        fetch('http://netcmdb-dev.rs.ru/phone/recordable.json') //data source
            .then(response => {
                console.log(response.status)
                if(!response.ok) {
                    alert("Error: http status " + response.status)
                    throw new Error("HTTP status " + response.status)
                }
                return response.json()
            })
            .then(res => {
                this.setState({ stats: res, loading: false }, () => console.log(res))
            })
            .catch(error => {
                console.log(error)
            })
    }


    render() {
        return (
            <React.Fragment>
                <div style={{ maxWidth: '100%' }}>
                    <MaterialTable style={{marginLeft:'10px', marginRight:'10px', marginTop:'10px'}}
                                   title="Recordable Phones"
                                   icons={tableIcons}
                                   columns={[
                                       { title: 'recorder', field: 'recorder' },
                                       { title: 'dn', field: 'dn' },
                                       { title: 'city', field: 'city' },
                                       { title: 'office', field: 'office' },
                                       { title: 'phoneName', field: 'phoneName' },
                                       { title: 'phoneModel', field: 'phoneModel' },
                                       { title: 'ipAddress', field: 'ipAddress' },
                                       { title: 'inventoryNumber', field: 'inventoryNumber' },
                                       { title: 'lastUpdate', field: 'lastUpdate',
                                           cellStyle: {
                                               backgroundColor: '#a6ffa4'
                                           }},
                                       // { title: 'appAge', field: 'appAge' },
                                   ]}
                                   data={this.state.stats}
                                   actions={[
                                       {
                                           icon: 'refresh',
                                           tooltip: 'Refresh',
                                           isFreeAction: true,
                                           onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
                                       },
                                   ]}
                                   options={{
                                       filtering: true,
                                       grouping: true,
                                       headerStyle: {
                                           backgroundColor: '#3e94e0',
                                           color: '#FFFF'
                                       }}
                                   }
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default MaterialUiTable;