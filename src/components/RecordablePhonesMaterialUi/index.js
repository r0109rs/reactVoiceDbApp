import React, {forwardRef} from 'react';
import MaterialTable from 'material-table';
import {
    AddBox,
    ArrowUpward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    Search,
    ViewColumn
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
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class MUITable extends React.Component {

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
                <div style={{ minWidth: '100hv', minHeight: '100hv' }}>
                    <MaterialTable style={{marginLeft:'10px', marginRight:'10px', marginTop:'10px'}}
                                   title="Recordable Phones"
                                   icons={tableIcons}
                                   data={this.state.stats}
                                   columns={[
                                       { title: 'recorder', field: 'recorder', cellStyle: {
                                               width: 100,
                                               minWidth: 100
                                           }, },
                                       { title: 'dn', field: 'dn', cellStyle: {
                                               width: 100,
                                               minWidth: 100
                                           }, },
                                       { title: 'city', field: 'city',  },
                                       { title: 'office', field: 'office', cellStyle: {
                                               width: 400,
                                               minWidth: 400,
                                           }, },
                                       { title: 'phoneName', field: 'phoneName' },
                                       { title: 'phoneModel', field: 'phoneModel' },
                                       { title: 'ipAddress', field: 'ipAddress' },
                                       { title: 'inventoryNumber', field: 'inventoryNumber', },
                                       { title: 'lastUpdate', field: 'lastUpdate',
                                           cellStyle: {
                                               width: 250,
                                               minWidth: 250,
                                           },
                                       },
                                       // { title: 'appAge', field: 'appAge' },
                                       // { title: 'isDuplicateDN', field: 'isDuplicateDN', },
                                       // { title: 'isHiddenDuplicate', field: 'isHiddenDuplicate', },
                                   ]}
                                   options={{
                                       filtering: true,
                                       grouping: true,
                                       headerStyle: {
                                           position: 'sticky',
                                           top: 0,
                                           backgroundColor: '#3e94e0',
                                           color: '#FFFF'
                                       },
                                       maxBodyHeight: "75vh",
                                       minBodyHeight: "75vh",
                                       pageSize:20,
                                       emptyRowsWhenPaging: true,
                                       pageSizeOptions:[10,20,50,100],
                                       rowStyle: data => data.isDuplicateDN === true ? { background: "#dddddd" } : null
                                   }}

                    />
                </div>
            </React.Fragment>
        )
    }
}

export default MUITable;