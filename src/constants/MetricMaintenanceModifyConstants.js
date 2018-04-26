export const columns = [
  {
    Header: 'Metric Report Id',
    accessor: 'metricesId',
    minWidth: 140
  },
  {
    Header: 'Metric Report Description',
    accessor: 'description',
    minWidth: 200
  },
  {
    Header: 'Schedule ID (Linked to)',
    accessor: 'scheduleId',
    minWidth: 140
  },
  {
    Header: 'Site',
    accessor: 'site'
  },
  {
    Header: 'Plant',
    accessor: 'plantCode'
  },
  {
    Header: 'Start Date',
    accessor: 'startDate',
    Cell: 'date'
  },
  {
    Header: 'End Date',
    accessor: 'endDate',
    Cell: 'date'
  },
  {
    Header: 'Author',
    accessor: 'createdBy'
  },
  {
    Header: 'Status',
    accessor: 'status',
    minWidth: 120
  }
];

export const scopeColumns = [
  {
    Header: 'Material ',
    accessor: 'materialNumber',
    width: 91
  },
  {
    Header: 'Description ',
    accessor: 'materialDescription',
    width: 93
  },
  {
    Header: 'Brand Description',
    accessor: 'brandDescription',
    width: 87
  },
  {
    Header: 'Material Type',
    accessor: 'materialType',
    width: 75
  },
  {
    Header: 'Reporting Quarter',
    accessor: 'reportingQuarter',
    width: 73
  },
  {
    Header: 'Lots Acceptance Rate',
    columns: [
      {
        Header: 'Lots Started',
        accessor: 'KPIRecordID1',
        width: 70
      },
      {
        Header: 'Lots Released',
        accessor: 'KPIRecordID2',
        width: 80
      },
      {
        Header: 'Lots Rejected',
        accessor: 'KPIRecordID3',
        width: 77
      }
    ]
  },
  {
    Header: 'Invalidated OOS Rate Data',
    columns: [
      {
        Header: 'Number of Test (Release & Stability)',
        accessor: 'KPIRecordID4',
        width: 122
      },
      {
        Header: 'OOS Results',
        accessor: 'KPIRecordID5',
        width: 77
      },
      {
        Header: 'OOS (Invalidated)',
        accessor: 'KPIRecordID6',
        width: 86
      }
    ]
  },
  {
    Header: 'Product Quality Complaints',
    columns: [
      {
        Header: 'Product Quality Complaints',
        accessor: 'KPIRecordID7',
        width: 97
      },
      {
        Header: 'Total Dosage Units Distributed',
        accessor: 'KPIRecordID8',
        width: 102
      }
    ]
  }
];
export const larColumns = [
  {
    Header: 'Material',
    accessor: 'materialNumber',
    minWidth: 95
  },
  {
    Header: 'Description',
    accessor: 'materialDescription',
    minWidth: 95
  },
  {
    Header: 'Brand Description',
    accessor: 'brandDescription',
    minWidth: 80
  },
  {
    Header: 'Material Type',
    accessor: 'materialType',
    minWidth: 75
  },
  {
    Header: 'Batch ',
    accessor: 'batch',
    minWidth: 75
  },
  {
    Header: 'Type ',
    accessor: 'batchType',
    minWidth: 70
  },
  {
    Header: 'Last GR Date',
    accessor: 'lastGRDate',
    Cell: 'date',
    minWidth: 70
  },
  {
    Header: 'Shelf Life Exp Date',
    accessor: 'shelfLifeExpDate',
    Cell: 'date',
    minWidth: 80
  },
  {
    Header: 'Actual Start Date',
    accessor: 'actualStartDate',
    Cell: 'date',
    minWidth: 77
  },
  {
    Header: 'QA Status',
    accessor: 'qAStatus',
    minWidth: 77
  },
  {
    Header: 'Local Analysis Date',
    accessor: 'localAnalysisDate',
    Cell: 'date',
    minWidth: 88
  },
  {
    Header: 'UD Status',
    accessor: 'usageDecisionCode'
  },
  {
    Header: 'UD Change Date',
    accessor: 'usageDecisionDate',
    Cell: 'date'
  },
  {
    Header: 'Lots Started',
    accessor: 'KPIRecordID1',
    Cell: 'tickIcon',
    minWidth: 77
  },
  {
    Header: 'Lots Released',
    accessor: 'KPIRecordID2',
    Cell: 'tickIcon',
    width: 80
  },
  {
    Header: 'Lots Rejected',
    accessor: 'KPIRecordID3',
    Cell: 'tickIcon',
    width: 70
  }
];
export const ntrsColumns = [
  {
    Header: 'Material',
    accessor: 'material'
  },
  {
    Header: 'Description',
    accessor: 'materialDescription',
    minWidth: 180
  },
  {
    Header: 'Brand Description',
    accessor: 'brandDescription'
  },
  {
    Header: 'Material Type',
    accessor: 'materialType'
  },
  {
    Header: 'Batch',
    accessor: 'batch',
    Cell: 'onClick'
  },
  {
    Header: 'Type',
    accessor: 'batchType'
  },
  {
    Header: 'Number of Test',
    accessor: 'purposeOfTesting'
  }
];

export const ioorsDataColumns = [
  {
    Header: 'Material',
    accessor: 'materialNumber',
    minWidth: 85
  },
  {
    Header: 'Description',
    accessor: 'materialDescription',
    minWidth: 100
  },
  {
    Header: 'Brand Description',
    accessor: 'brandDescription',
    minWidth: 95
  },
  {
    Header: 'Material Type',
    accessor: 'materialType',
    minWidth: 75
  },
  {
    Header: 'Batch',
    accessor: 'batch',
    minWidth: 80
  },
  {
    Header: 'Entity ',
    accessor: 'entity',
    minWidth: 70
  },
  {
    Header: 'Record Sub Type',
    accessor: 'recordSubType',
    minWidth: 90
  },
  {
    Header: 'Root Cause Class',
    accessor: 'rootCauseClass',
    minWidth: 87
  },
  {
    Header: 'Root Cause Sub Class',
    accessor: 'rootCauseSubClass',
    minWidth: 100
  },
  {
    Header: 'State',
    accessor: 'state',
    minWidth: 75
  },
  {
    Header: 'Open Date',
    accessor: 'openDate',
    minWidth: 83
  },
  {
    Header: 'Closed Date',
    accessor: 'dateClosed',
    minWidth: 75
  },
  {
    Header: 'OOS Results',
    accessor: 'KPIRecordID5',
    Cell: 'tickIcon',
    width: 75
  },
  {
    Header: 'OOS Invalidated',
    accessor: 'KPIRecordID6',
    width: 70,
    Cell: 'tickIcon'
  }
];

export const pqcColumns = [
  {
    Header: 'Material',
    accessor: 'materialNumber',
    minWidth: 85
  },
  {
    Header: 'Description',
    accessor: 'materialDescription',
    minWidth: 100
  },
  {
    Header: 'Brand Description',
    accessor: 'brandDescription',
    minWidth: 95
  },
  {
    Header: 'Material Type',
    accessor: 'materialType',
    minWidth: 75
  },
  {
    Header: 'Batch',
    accessor: 'batch',
    minWidth: 78
  },
  {
    Header: 'Entity ',
    accessor: 'entity',
    minWidth: 77
  },
  {
    Header: 'Division',
    accessor: 'divisionArea',
    minWidth: 77
  },
  {
    Header: 'Record Sub Type',
    accessor: 'recordSubType',
    minWidth: 87
  },
  {
    Header: 'Root Cause Class',
    accessor: 'rootCauseClass',
    minWidth: 86
  },
  {
    Header: 'Root Cause Sub Class',
    accessor: 'rootCauseSubClass',
    minWidth: 90
  },
  {
    Header: 'State ',
    accessor: 'state',
    minWidth: 78
  },
  {
    Header: 'Complaint Received date',
    accessor: 'dateComplaintReceived',
    minWidth: 100
  }
];

export const ndudColumns = [
  {
    Header: 'Material',
    accessor: 'materialNumber',
    minWidth: 103
  },
  {
    Header: 'Description',
    accessor: 'materialDescription',
    minWidth: 101
  },
  {
    Header: 'Brand Description',
    accessor: 'brandDescription',
    minWidth: 99
  },
  {
    Header: 'Material Type',
    accessor: 'materialType',
    minWidth: 122
  },
  {
    Header: 'Batch',
    accessor: 'batch',
    minWidth: 100
  },
  {
    Header: 'Actual Goods Issue Date',
    accessor: 'actualGoodsIssueDate',
    Cell: 'date',
    minWidth: 125
  },
  {
    Header: 'Delivered Quantity',
    accessor: 'deliveryQuantity',
    minWidth: 132
  },
  {
    Header: 'Package Size',
    accessor: 'packageSizeUnit',
    minWidth: 145
  },
  {
    Header: 'Number of Dosage Unit Distributed',
    accessor: 'noofDosageUnit',
    minWidth: 100
  }
];

export const bMaintenanceColumns = [
  {
    Header: 'Material',
    accessor: 'materialNumber',
    minWidth: 90
  },
  {
    Header: 'Description ',
    accessor: 'materialDescription',
    minWidth: 95
  },
  {
    Header: 'Brand Description',
    accessor: 'brandDescription',
    minWidth: 88
  },
  {
    Header: 'Material Type',
    accessor: 'materialType',
    minWidth: 77
  },
  {
    Header: 'Batch',
    accessor: 'batch',
    minWidth: 80
  },
  {
    Header: 'Type',
    accessor: 'batchType',
    minWidth: 78
  },
  {
    Header: 'Lots Started',
    accessor: 'KPIRecordID1',
    Cell: 'checkBox',
    minWidth: 65
  },
  {
    Header: 'Lots Release',
    accessor: 'KPIRecordID2',
    Cell: 'checkBox',
    minWidth: 70
  },
  {
    Header: 'Lots Rejected',
    accessor: 'KPIRecordID3',
    Cell: 'checkBox',
    minWidth: 77
  },
  {
    Header: 'Number of Tests',
    accessor: 'KPIRecordID4',
    minWidth: 80,
    Cell: 'checkBox'
  },
  {
    Header: 'OOS (Results)',
    accessor: 'KPIRecordID5',
    Cell: 'checkBox',
    minWidth: 70
  },
  {
    Header: 'OOS (Invalidated)',
    accessor: 'KPIRecordID6',
    Cell: 'checkBox',
    minWidth: 87
  },
  {
    Header: '#PQC',
    accessor: 'KPIRecordID7',
    Cell: 'checkBox',
    minWidth: 95
  },
  {
    Header: 'Number of Units Distributed',
    accessor: 'KPIRecordID8',
    Cell: 'checkBox',
    minWidth: 100
  },
  {
    Header: 'Comments',
    accessor: 'comments',
    Cell: 'textField',
    width: 105
  }
];

export const nrsTestModalColumns1 = [
  {
    Header: 'Material',
    accessor: 'materialNumber'
  },
  {
    Header: 'Description',
    accessor: 'materialDescription'
  },
  {
    Header: 'Batch',
    accessor: 'batch'
  },
  {
    Header: 'Batch Type',
    accessor: 'batchType'
  },
  {
    Header: 'Number of Release and Stability test',
    accessor: 'noOfReleaseAndStabilitytest'
  }
];

export const nrsTestModalColumns2 = [
  {
    Header: 'Material',
    accessor: 'materialNumber'
  },
  {
    Header: 'Batch',
    accessor: 'batch'
  },
  {
    Header: 'Inspection Lot',
    accessor: 'productName'
  },
  {
    Header: 'Inspection Type',
    accessor: 'productName'
  },
  {
    Header: 'Inspection Lot Origin',
    accessor: 'productName'
  },
  {
    Header: 'Inspection Characteristic',
    accessor: 'productName'
  },
  {
    Header: 'Characteristic Text',
    accessor: 'productName'
  },
  {
    Header: 'Mic #',
    accessor: 'productName'
  },
  {
    Header: 'Insp. Start Date',
    accessor: 'productName'
  },
  {
    Header: 'Insp. End Date',
    accessor: 'productName'
  },
  {
    Header: 'QA Status of Batch',
    accessor: 'productName'
  },
  {
    Header: 'Usage Desicion Date',
    accessor: 'productName'
  },
  {
    Header: 'Physical Sample Number',
    accessor: 'productName'
  },
  {
    Header: 'Number of Samples',
    accessor: 'productName'
  }
];
