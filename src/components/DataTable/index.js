import React from 'react';
import { MDBDataTable } from "mdbreact";
export default function DataTable(props) {
    const {
        data
    } = props;
  
    var columns = data?.columns?.map((item) => {
        item.headerName = item.label;
        return item;
    }) ?? []

    var rows = data.rows ?? [];
   

    return (
        <div className='p-4'  style={{ width: '100%' }}>
            <MDBDataTable
                striped
                bordered
                small
                data={data ?? []}
                columns={columns}
                 rows={rows}
                noBottomColumns={true}
                pageSize={5}
                searchLabel={"Search"}
                entriesLabel={"Show Entries"}
                noRecordsFoundLabel={"Notes  not  Found"}
                paginationLabel={["Before", "Next"]}
                infoLabel={["Show","until","of","entries"]}
                paginationComponentOptions={{
                    noRowsPerPage: true,
                    rowsPerPageText: 'Line per Page:',
                    rangeSeparatorText: 'of'
                    
                }}
            />
        </div>
    );
}