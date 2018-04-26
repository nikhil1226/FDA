import XlsxPopulate from 'xlsx-populate';
import _map from 'lodash/map';
import _omit from 'lodash/omit';
import _isEqual from 'lodash/isEqual';
import moment from 'moment';

export function populateXlsxTemp(req, res, next, resExcelData) {
  const headerData = resExcelData.headerData;
  const { scopeData, acceptanceData, NTRSData, IOORSData, PQCData, TDUDData } = resExcelData;
  // Populate Scope KPI
  const newScopeArr = [];
  let resultScopeIndex = -1;
  let previousScopeRecord = {};

  if (scopeData.length) {
    _map(scopeData, singleInfo => {
      const currentScopeRecord = _omit(singleInfo, ['kPIRecordId', 'numberofBatches']);
      if (!_isEqual(previousScopeRecord, currentScopeRecord)) {
        resultScopeIndex += 1;
        newScopeArr.push(singleInfo);
      }
      previousScopeRecord = _omit(singleInfo, ['kPIRecordId', 'numberofBatches']);
      newScopeArr[resultScopeIndex][`KPIRecordID${singleInfo.kPIRecordId}`] = singleInfo.numberofBatches;
    });
  }
  // Populate Acceptance KPI
  const newLotAccptanceArr = [];
  let resultAcceptanceIndex = -1;
  let previousAcceptanceRecord = {};

  if (acceptanceData.length) {
    _map(acceptanceData, (singleInfo, index) => {
      const currentAcceptanceRecord = _omit(singleInfo, ['kPIRecordId', 'reportingDate']);
      if (!_isEqual(previousAcceptanceRecord, currentAcceptanceRecord)) {
        resultAcceptanceIndex += 1;
        newLotAccptanceArr.push(singleInfo);
      }
      previousAcceptanceRecord = _omit(singleInfo, ['kPIRecordId', 'reportingDate']);
      newLotAccptanceArr[resultAcceptanceIndex][`KPIRecordID${singleInfo.kPIRecordId}`] = 'checked';
    });
  }

  // Populate IOORS KPI
  const newIOORSArr = [];
  let resultIOORSIndex = -1;
  let previousIOORSRecord = {};

  if (IOORSData.length) {
    _map(IOORSData, (singleInfo, index) => {
      const currentIOORSRecord = _omit(singleInfo, ['kPIRecordId', 'reportingDate']);
      if (!_isEqual(previousIOORSRecord, currentIOORSRecord)) {
        resultIOORSIndex += 1;
        newIOORSArr.push(singleInfo);
      }
      previousIOORSRecord = _omit(singleInfo, ['kPIRecordId', 'reportingDate']);
      // newIOORSArr[resultAcceptanceIndex][`KPIRecordID${singleInfo.kPIRecordId}`] = 'checked'; @sp changed
      if (newIOORSArr[resultIOORSIndex]) {
        newIOORSArr[resultIOORSIndex][`KPIRecordID${singleInfo.kPIRecordId}`] = 'checked';
      }
    });
  }

  let rootFolder = './public/template';
  if (__dirname.substr(__dirname.length - 13) === '\\dist\\helpers') {
    rootFolder = '../public/template';
  }
  try {
    XlsxPopulate.fromFileAsync(`${rootFolder}/FQM_Metric_Report_Download_Format.xlsx`)
    .then(workbook => {
      // Sheet 1 : Header
      workbook.sheet('Header').cell('J14').value(`${headerData.site}`);
      workbook.sheet('Header').cell('K15').value(`${headerData.metricReport}`);
      workbook.sheet('Header').cell('K16').value(`${headerData.desc}`);
      workbook.sheet('Header').cell('K17').value(`${headerData.sDate}`);
      workbook.sheet('Header').cell('O17').value(`${headerData.eDate}`);
      workbook.sheet('Header').cell('L19').value(`${headerData.author}`);
      workbook.sheet('Header').cell('L20').value(`${headerData.SPC}`);
      workbook.sheet('Header').cell('L21').value(`${headerData.SR}`);
      workbook.sheet('Header').cell('L22').value(`${headerData.SQAR}`);
      // Sheet 2 : Scope
      let cellCount = 6;
      let KPI1 = ''; let KPI2 = ''; let KPI3 = ''; let KPI4 = ''; let KPI5 = ''; let KPI6 = ''; let KPI7 = ''; let KPI8 = '';
      if (scopeData.length) {
        _map(newScopeArr, data => {
          if (typeof data.KPIRecordID1 === 'undefined') { KPI1 = ''; } else { KPI1 = `${data.KPIRecordID1}`; }
          if (typeof data.KPIRecordID2 === 'undefined') { KPI2 = ''; } else { KPI2 = `${data.KPIRecordID2}`; }
          if (typeof data.KPIRecordID3 === 'undefined') { KPI3 = ''; } else { KPI3 = `${data.KPIRecordID3}`; }
          if (typeof data.KPIRecordID4 === 'undefined') { KPI4 = ''; } else { KPI4 = `${data.KPIRecordID4}`; }
          if (typeof data.KPIRecordID5 === 'undefined') { KPI5 = ''; } else { KPI5 = `${data.KPIRecordID5}`; }
          if (typeof data.KPIRecordID6 === 'undefined') { KPI6 = ''; } else { KPI6 = `${data.KPIRecordID6}`; }
          if (typeof data.KPIRecordID7 === 'undefined') { KPI7 = ''; } else { KPI7 = `${data.KPIRecordID7}`; }
          if (typeof data.KPIRecordID8 === 'undefined') { KPI8 = ''; } else { KPI8 = `${data.KPIRecordID8}`; }
          workbook.sheet('Scope').cell(`D${cellCount}`).value(`${data.materialNumber}`);
          workbook.sheet('Scope').cell(`E${cellCount}`).value(`${data.materialDescription}`);
          workbook.sheet('Scope').cell(`F${cellCount}`).value(`${data.brandDescription}`);
          workbook.sheet('Scope').cell(`G${cellCount}`).value(`${data.materialType}`);
          workbook.sheet('Scope').cell(`H${cellCount}`).value(`${data.reportingQuarter}`);
          workbook.sheet('Scope').cell(`I${cellCount}`).value(`${KPI1}`);
          workbook.sheet('Scope').cell(`J${cellCount}`).value(`${KPI2}`);
          workbook.sheet('Scope').cell(`K${cellCount}`).value(`${KPI3}`);
          workbook.sheet('Scope').cell(`L${cellCount}`).value(`${KPI4}`);
          workbook.sheet('Scope').cell(`M${cellCount}`).value(`${KPI5}`);
          workbook.sheet('Scope').cell(`N${cellCount}`).value(`${KPI6}`);
          workbook.sheet('Scope').cell(`O${cellCount}`).value(`${KPI7}`);
          workbook.sheet('Scope').cell(`P${cellCount}`).value(`${KPI8}`);
          cellCount += 1;
        });
      }
      // Sheet 3 : Lots Acceptance Rate

      let LOARcellCount = 5;
      let LOAKPI1 = ''; let LOAKPI2 = ''; let LOAKPI3 = ''; let LOABatch = '';
      if (acceptanceData.length) {
        _map(newLotAccptanceArr, data => {
          if (typeof data.KPIRecordID1 === 'undefined') { LOAKPI1 = ''; } else { LOAKPI1 = 'Yes'; }
          if (typeof data.KPIRecordID2 === 'undefined') { LOAKPI2 = ''; } else { LOAKPI2 = 'Yes'; }
          if (typeof data.KPIRecordID3 === 'undefined') { LOAKPI3 = ''; } else { LOAKPI3 = 'Yes'; }
          if (`${data.batchType}` === 'null') { LOABatch = ''; } else { LOABatch = `${data.batchType}`; }
          workbook.sheet('Lots Acceptance Rate').cell(`D${LOARcellCount}`).value(`${data.materialNumber}`);
          workbook.sheet('Lots Acceptance Rate').cell(`E${LOARcellCount}`).value(`${data.materialDescription}`);
          workbook.sheet('Lots Acceptance Rate').cell(`F${LOARcellCount}`).value(`${data.brandDescription}`);
          workbook.sheet('Lots Acceptance Rate').cell(`G${LOARcellCount}`).value(`${data.materialType}`);
          workbook.sheet('Lots Acceptance Rate').cell(`H${LOARcellCount}`).value(`${data.batch}`);
          workbook.sheet('Lots Acceptance Rate').cell(`I${LOARcellCount}`).value(`${LOABatch}`);
          workbook.sheet('Lots Acceptance Rate').cell(`J${LOARcellCount}`).value(`${moment(data.lastGRDate).format('DD-MMM-YYYY')}`);
          workbook.sheet('Lots Acceptance Rate').cell(`K${LOARcellCount}`).value(`${moment(data.shelfLifeExpDate).format('DD-MMM-YYYY')}`);
          workbook.sheet('Lots Acceptance Rate').cell(`L${LOARcellCount}`).value(`${moment(data.actualStartDate).format('DD-MMM-YYYY')}`);
          workbook.sheet('Lots Acceptance Rate').cell(`M${LOARcellCount}`).value(`${data.usageDecisionCode}`);
          workbook.sheet('Lots Acceptance Rate').cell(`N${LOARcellCount}`).value(`${moment(data.usageDecisionDate).format('DD-MMM-YYYY')}`);
          workbook.sheet('Lots Acceptance Rate').cell(`O${LOARcellCount}`).value(`${LOAKPI1}`);
          workbook.sheet('Lots Acceptance Rate').cell(`P${LOARcellCount}`).value(`${LOAKPI2}`);
          workbook.sheet('Lots Acceptance Rate').cell(`Q${LOARcellCount}`).value(`${LOAKPI3}`);
          LOARcellCount += 1;
        });
      }
      // Sheet 4 : Number of Tests
      let NTRScellCount = 5;
      let NTRSBatch = '';
      if (NTRSData.length) {
        _map(NTRSData, data => {
          if (`${data.batchType}` === 'null') { NTRSBatch = ''; } else { NTRSBatch = `${data.batchType}`; }
          workbook.sheet('Number of Tests').cell(`D${NTRScellCount}`).value(`${data.material}`);
          workbook.sheet('Number of Tests').cell(`E${NTRScellCount}`).value(`${data.description}`);
          workbook.sheet('Number of Tests').cell(`F${NTRScellCount}`).value(`${data.brandDescription}`);
          workbook.sheet('Number of Tests').cell(`G${NTRScellCount}`).value(`${data.materialType}`);
          workbook.sheet('Number of Tests').cell(`H${NTRScellCount}`).value(`${data.batch}`);
          workbook.sheet('Number of Tests').cell(`I${NTRScellCount}`).value(`${NTRSBatch}`);
          workbook.sheet('Number of Tests').cell(`J${NTRScellCount}`).value(`${data.purposeOfTesting}`);
          NTRScellCount += 1;
        });
      }

      // Sheet 5 : Invalidated OOS Rate
      let IOORScellCount = 5;
      let IOORSKPI5 = ''; let IOORSKPI6 = '';
      if (IOORSData.length) {
        _map(newIOORSArr, data => {
          if (typeof data.KPIRecordID5 === 'undefined') { IOORSKPI5 = ''; } else { IOORSKPI5 = 'Yes'; }
          if (typeof data.KPIRecordID6 === 'undefined') { IOORSKPI6 = ''; } else { IOORSKPI6 = 'Yes'; }
          workbook.sheet('Invalidated OOS Rate').cell(`D${IOORScellCount}`).value(`${data.materialNumber}`);
          workbook.sheet('Invalidated OOS Rate').cell(`E${IOORScellCount}`).value(`${data.materialDescription}`);
          workbook.sheet('Invalidated OOS Rate').cell(`F${IOORScellCount}`).value(`${data.brandDescription}`);
          workbook.sheet('Invalidated OOS Rate').cell(`G${IOORScellCount}`).value(`${data.materialType}`);
          workbook.sheet('Invalidated OOS Rate').cell(`H${IOORScellCount}`).value(`${data.batch}`);
          workbook.sheet('Invalidated OOS Rate').cell(`I${IOORScellCount}`).value(`${data.entity}`);
          workbook.sheet('Invalidated OOS Rate').cell(`J${IOORScellCount}`).value(`${data.rootCauseClass}`);
          workbook.sheet('Invalidated OOS Rate').cell(`K${IOORScellCount}`).value(`${data.rootCauseSubClass}`);
          workbook.sheet('Invalidated OOS Rate').cell(`L${IOORScellCount}`).value(`${data.state}`);
          workbook.sheet('Invalidated OOS Rate').cell(`M${IOORScellCount}`).value(`${data.openDate}`);
          workbook.sheet('Invalidated OOS Rate').cell(`N${IOORScellCount}`).value(`${data.dateClosed}`);
          workbook.sheet('Invalidated OOS Rate').cell(`O${IOORScellCount}`).value(`${IOORSKPI5}`);
          workbook.sheet('Invalidated OOS Rate').cell(`P${IOORScellCount}`).value(`${IOORSKPI6}`);
          IOORScellCount += 1;
        });
      }

      // Sheet 6 : PQC
      let PQCcellCount = 5;
      if (PQCData.length) {
        _map(PQCData, data => {
          workbook.sheet('PQC').cell(`D${PQCcellCount}`).value(`${data.materialNumber}`);
          workbook.sheet('PQC').cell(`E${PQCcellCount}`).value(`${data.materialDescription}`);
          workbook.sheet('PQC').cell(`F${PQCcellCount}`).value(`${data.brandDescription}`);
          workbook.sheet('PQC').cell(`G${PQCcellCount}`).value(`${data.materialType}`);
          workbook.sheet('PQC').cell(`H${PQCcellCount}`).value(`${data.batch}`);
          workbook.sheet('PQC').cell(`I${PQCcellCount}`).value(`${data.divisionArea}`);
          workbook.sheet('PQC').cell(`J${PQCcellCount}`).value(`${data.rootCauseClass}`);
          workbook.sheet('PQC').cell(`K${PQCcellCount}`).value(`${data.rootCauseSubClass}`);
          workbook.sheet('PQC').cell(`L${PQCcellCount}`).value(`${data.state}`);
          workbook.sheet('PQC').cell(`M${PQCcellCount}`).value(`${data.dateComplaintReceived}`);
          PQCcellCount += 1;
        });
      }
       // Sheet 7 : Number of dosage unit
      let TDUDcellCount = 5;
      if (TDUDData.length) {
        _map(TDUDData, data => {
          workbook.sheet('Number of dosage unit').cell(`D${TDUDcellCount}`).value(`${data.materialNumber}`);
          workbook.sheet('Number of dosage unit').cell(`E${TDUDcellCount}`).value(`${data.materialDescription}`);
          workbook.sheet('Number of dosage unit').cell(`F${TDUDcellCount}`).value(`${data.brandDescription}`);
          workbook.sheet('Number of dosage unit').cell(`G${TDUDcellCount}`).value(`${data.materialType}`);
          workbook.sheet('Number of dosage unit').cell(`J${TDUDcellCount}`).value(`${moment(data.actualGoodsIssueDate).format('DD-MMM-YYYY')}`);
          workbook.sheet('Number of dosage unit').cell(`K${TDUDcellCount}`).value(`${data.deliveryQuantity}`);
          workbook.sheet('Number of dosage unit').cell(`L${TDUDcellCount}`).value(`${data.packageSizeUnit}`);
          workbook.sheet('Number of dosage unit').cell(`M${TDUDcellCount}`).value(`${data.noofDosageUnit}`);
          TDUDcellCount += 1;
        });
      }

      // Write to file.
      workbook.toFileAsync(`${rootFolder}/xlsTemp/FQM_Metric_Report_${headerData.metricReport}_${headerData.randId}.xlsx`);
      return workbook.outputAsync();
    }).then(data => {
      res.json({
        isExcelPopulated: true
      });
    });
  } catch (e) {
    console.log('Generating excel process ----- Failed');
  }
}
