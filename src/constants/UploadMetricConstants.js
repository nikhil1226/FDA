export const metricTypeForUpload = [
  {
    id: 'T_COM_UPL_FFT_SI03A_IPCStabilityTest',
    header: [
      'RecordId',
      'INDEX',
      'PlanningLocation',
      'Month',
      'MaterialNumber',
      'MaterialDescription',
      'ProcessOrder',
      'Batch',
      'NoOfTests'
    ],
    columns: [
      {
        Header: 'Record Id',
        accessor: 'RecordId'
      },
      {
        Header: 'INDEX',
        accessor: 'INDEX'
      },
      {
        Header: 'Planning Location',
        accessor: 'PlanningLocation',
        isEditColumn: true
      },
      {
        Header: 'Month',
        accessor: 'Month'
      },
      {
        Header: 'Material Number',
        accessor: 'MaterialNumber',
        isEditColumn: true
      },
      {
        Header: 'Material Description',
        accessor: 'MaterialDescription'
      },
      {
        Header: 'Process Order',
        accessor: 'ProcessOrder'
      },
      {
        Header: 'Batch',
        accessor: 'Batch'
      },
      {
        Header: 'No. of Tests',
        accessor: 'NoOfTests'
      },
      {
        Header: 'Error Msg',
        accessor: 'errorMsg'
      }
    ]
  },
  {
    id: 'T_COM_UPL_MD_SitePlantMaintenance',
    header: [
      'technology',
      'region',
      'entity',
      'country',
      'nQCID',
      'nQCOnly',
      'bPCID',
      'hRID',
      'ID_2016',
      'bPCID2',
      'hRID2',
      'alconFlag',
      'responsibleSite1',
      'responsibleSite2',
      'plant',
      'fEI',
      'dUNS',
      'fDArelevant',
      'packager1',
      'packager2'
    ],
    columns: [
      {
        Header: 'Technology',
        accessor: 'technology',
        isEditColumn: true
      },
      {
        Header: 'Region',
        accessor: 'region',
        isEditColumn: true
      },
      {
        Header: 'Entity',
        accessor: 'entity',
        isEditColumn: true
      },
      {
        Header: 'Country',
        accessor: 'country',
        isEditColumn: true
      },
      {
        Header: 'NQC ID',
        accessor: 'nQCID'
      },
      {
        Header: 'NQC only',
        accessor: 'nQCOnly'
      },
      {
        Header: 'BPC ID',
        accessor: 'bPCID'
      },
      {
        Header: 'HR ID',
        accessor: 'hRID'
      },
      {
        Header: 'ID 2016',
        accessor: 'ID_2016'
      },
      {
        Header: 'BPC ID2',
        accessor: 'bPCID2'
      },
      {
        Header: 'HR ID22',
        accessor: 'hRID2'
      },
      {
        Header: 'Alcon Flag',
        accessor: 'alconFlag'
      },
      {
        Header: 'Responsible Site 1',
        accessor: 'responsibleSite1'
      },
      {
        Header: 'Responsible_Site_2',
        accessor: 'responsibleSite2'
      },
      {
        Header: 'Plant',
        accessor: 'plant'
      },
      {
        Header: 'FEI',
        accessor: 'fEI'
      },
      {
        Header: 'DUNS',
        accessor: 'dUNS'
      },
      {
        Header: 'FDA relevant',
        accessor: 'fDArelevant'
      },
      {
        Header: 'Packager 1',
        accessor: 'packager1'
      },
      {
        Header: 'Packager 2',
        accessor: 'packager2'
      },
      {
        Header: 'Material Description',
        accessor: 'MaterialDescription'
      },
      {
        Header: 'Error Msg',
        accessor: 'errorMsg'
      }
    ]
  }
];

export const metricTypeForUploadDb = [
  {
    id: 'T_COM_UPL_FFT_SI03A_IPCStabilityTest',
    header: [
      'recordID',
      'planningLocation',
      'month',
      'materialNumber',
      'mATDESC',
      'processOrder',
      'batch',
      'noOfTests'
    ],
    columns: [
      {
        Header: 'Record Id',
        accessor: 'recordID'
      },
      {
        Header: 'Planning Location',
        accessor: 'planningLocation',
        isEditColumn: true
      },
      {
        Header: 'Month',
        accessor: 'month'
      },
      {
        Header: 'Material Number',
        accessor: 'materialNumber',
        isEditColumn: true
      },
      {
        Header: 'Material Description',
        accessor: 'mATDESC'
      },
      {
        Header: 'Process Order',
        accessor: 'processOrder'
      },
      {
        Header: 'Batch',
        accessor: 'batch'
      },
      {
        Header: 'No. of Tests',
        accessor: 'noOfTests'
      }
    ]
  },
  {
    id: 'T_COM_UPL_MD_SitePlantMaintenance',
    header: [
      'technology',
      'region',
      'entity',
      'country',
      'nQCID',
      'nQCOnly',
      'bPCID',
      'hRID',
      'ID_2016',
      'bPCID2',
      'hRID2',
      'alconFlag',
      'responsibleSite1',
      'responsibleSite2',
      'plant',
      'fEI',
      'dUNS',
      'fDArelevant',
      'packager1',
      'packager2',
      'MaterialDescription'
    ],
    columns: [
      {
        Header: 'Technology',
        accessor: 'technology',
        isEditColumn: true
      },
      {
        Header: 'Region',
        accessor: 'region',
        isEditColumn: true
      },
      {
        Header: 'Entity',
        accessor: 'entity',
        isEditColumn: true
      },
      {
        Header: 'Country',
        accessor: 'country',
        isEditColumn: true
      },
      {
        Header: 'NQC ID',
        accessor: 'nQCID'
      },
      {
        Header: 'NQC only',
        accessor: 'nQCOnly'
      },
      {
        Header: 'BPC ID',
        accessor: 'bPCID'
      },
      {
        Header: 'HR ID',
        accessor: 'hRID'
      },
      {
        Header: 'ID 2016',
        accessor: 'ID_2016'
      },
      {
        Header: 'BPC ID2',
        accessor: 'bPCID2'
      },
      {
        Header: 'HR ID22',
        accessor: 'hRID2'
      },
      {
        Header: 'Alcon Flag',
        accessor: 'alconFlag'
      },
      {
        Header: 'Responsible Site 1',
        accessor: 'responsibleSite1'
      },
      {
        Header: 'Responsible_Site_2',
        accessor: 'responsibleSite2'
      },
      {
        Header: 'Plant',
        accessor: 'plant'
      },
      {
        Header: 'FEI',
        accessor: 'fEI'
      },
      {
        Header: 'DUNS',
        accessor: 'dUNS'
      },
      {
        Header: 'FDA relevant',
        accessor: 'fDArelevant'
      },
      {
        Header: 'Packager 1',
        accessor: 'packager1'
      },
      {
        Header: 'Packager 2',
        accessor: 'packager2'
      },
      {
        Header: 'Material Description',
        accessor: 'MaterialDescription'
      }
    ]
  }
];
export const uploadMetricHomeColumns = [
  {
    Header: 'Upload Request ID',
    accessor: 'uploadRequestID',
    width: 205
  },
  {
    Header: 'Upload Description',
    accessor: 'uploadDescription',
    isEditColumn: true,
    maxWidth: 185
  },
  {
    Header: 'Upload Date',
    accessor: 'uploadDate',
    Cell: 'date',
    maxWidth: 85
  },
  {
    Header: 'Start Date',
    accessor: 'startDate',
    Cell: 'date',
    isEditColumn: true,
    maxWidth: 85
  },
  {
    Header: 'End Date',
    accessor: 'endDate',
    Cell: 'date',
    isEditColumn: true,
    maxWidth: 85
  },
  {
    Header: 'Metrics for Upload',
    accessor: 'metricsUpload',
    maxWidth: 120
  },
  {
    Header: 'Uploaded By',
    accessor: 'uploadedBy',
    maxWidth: 140
  },
  {
    Header: 'Approved By',
    accessor: 'approvedBy',
    maxWidth: 140
  },
  {
    Header: 'Status',
    accessor: 'status',
    maxWidth: 100
  }
];

