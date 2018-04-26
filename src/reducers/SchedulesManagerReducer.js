import _ from 'lodash';
import moment from 'moment';
import { scheduleManagerType } from '../actions/ActionTypes';

const DEFAULT_STATE = {
  siteProductsList: [],
  selectedProductsList: [],
  filteredProductList: [],
  siteMaterialsList: [],
  filteredMaterialsList: [],
  selectedMaterialsList: [],
  checkedList: [],
  sitesList: [],
  metricList: [],
  sitePlantCoordinatorList: [],
  sitePlantReviewerList: [],
  isLoading: false,
  isShowScheduleUpdateStatus: false,
  scheduleUpdateStatus: 0,
  isShowScheduleScopeUpdateStatus: false,
  scheduleScopeUpdateStatus: 0,
  isMaterialLoading: false,
  isShowSendForApprovalStatus: false,
  sendForApprovalStatus: 0,
  sendForApprovalProductList: [],
  currentSchedule: [{
    siteId: '',
    status: 19,
    bu: '',
    description: '',
    site: '',
    feiNumber: '',
    dunsNumber: '',
    startDate: null,
    endDate: null,
    region: '',
    plantCode: '',
    technology: '',
    metricsIncluded: [],
    createdBy: 'SADANAS1',
    sitePlanCoordinator: '',
    sitePlanReviewer: '',
    createdOn: ''
  }]
};

const resetScheduleData = (state, action) => {
  const newState = {};
  Object.assign(newState, state, {
    currentSchedule: [{
      siteId: '',
      status: 19,
      bu: '',
      description: '',
      site: '',
      feiNumber: '',
      dunsNumber: '',
      startDate: null,
      endDate: null,
      region: '',
      plantCode: '',
      technology: '',
      metricsIncluded: [],
      createdBy: '',
      sitePlanCoordinator: '',
      sitePlanReviewer: '',
      createdOn: ''
    }],
    selectedProductsList: [],
    filteredProductList: [],
    filteredMaterialsList: [],
    selectedMaterialsList: [],
    checkedList: [],
    sitesList: [],
    sitePlantCoordinatorList: [],
    sitePlantReviewerList: []
  });
  return newState;
};

const setAllSitesList = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { sitesList: action.sitesList });
  return newState;
};

const setSiteProductsList = (state, action) => {
  const newState = {};
  const newArr = _.map(action.siteProductsList, o =>
    _.extend({ checked: false, excluded: false, comments: '', isAdded: false }, o));
  Object.assign(newState, state, {
    siteProductsList: newArr,
    filteredProductList: newArr,
    filteredProductListDeleted: newArr,
    isProductLoading: false
  });
  return newState;
};

const updateProductsListItemCheckbox = (state, action) => {
  const newProductsState = {};
  Object.assign(newProductsState, state);
  const index = _.findIndex(newProductsState.siteProductsList, ['productPk', action.id]);
  if (index > -1) {
    newProductsState.siteProductsList[index].checked = !newProductsState.siteProductsList[index].checked;
  }
  const newState = {};
  Object.assign(newState, state, { siteProductsList: newProductsState.siteProductsList });
  return newState;
};

const addProductsToSelectedList = (state, action) => {
  const newProductsState = {};
  Object.assign(newProductsState, state);
  const newArray = _.filter(newProductsState.filteredProductList, ['checked', true]);
  const newState = {};
  const nNewArray = _.map(newArray, o => {
    const item = o;
    item.isAdded = true;
    return item;
  });
  _.map(nNewArray, (o) => {
    const index = _.findIndex(newProductsState.selectedProductsList, ['productPk', o.productPk]);
    if (index === -1) {
      newProductsState.selectedProductsList.push(o);
    } else {
      newProductsState.selectedProductsList[index].excluded = false;
    }
  });
  Object.assign(newState, state, { selectedProductsList: newProductsState.selectedProductsList });
  return newState;
};

const deleteProductFromSelectedList = (state, action) => {
  const newProductsState = {};
  Object.assign(newProductsState, state);
  const index = _.findIndex(newProductsState.selectedProductsList, ['productPk', action.id]);
  if (index > -1) {
    newProductsState.selectedProductsList[index].excluded = true;
    newProductsState.selectedProductsList[index].isAdded = false;
    newProductsState.selectedProductsList[index].checked = false;
  }
  const filterIndex = _.findIndex(newProductsState.filteredProductList, ['productPk', action.id]);
  if (filterIndex > -1) {
    newProductsState.filteredProductList[filterIndex].isAdded = false;
    newProductsState.filteredProductList[filterIndex].checked = false;
  }
  const newState = {};
  Object.assign(newState, newProductsState);
  return newState;
};

const updateScheduleSiteData = (state, action) => {
  const newCurrentScheduleState = {};
  Object.assign(newCurrentScheduleState, state);
  const newsitesListArr = _.filter(newCurrentScheduleState.sitesList, ['id', action.id]);
  if (newsitesListArr.length) {
    newCurrentScheduleState.currentSchedule[0].siteId = action.id;
    newCurrentScheduleState.currentSchedule[0].dunsNumber = newsitesListArr[0].dunsNumber;
    newCurrentScheduleState.currentSchedule[0].feiNumber = newsitesListArr[0].feiNumber;
    newCurrentScheduleState.currentSchedule[0].plantCode = newsitesListArr[0].plantCode;
    newCurrentScheduleState.currentSchedule[0].site = newsitesListArr[0].site;
    newCurrentScheduleState.currentSchedule[0].technology = newsitesListArr[0].technology;
    newCurrentScheduleState.currentSchedule[0].region = newsitesListArr[0].region;
    newCurrentScheduleState.sitePlantCoordinatorList = newsitesListArr[0].siteCoordinator;
    newCurrentScheduleState.sitePlantReviewerList = newsitesListArr[0].sitePlanReviewer;
  } else {
    newCurrentScheduleState.currentSchedule[0].siteId = '';
    newCurrentScheduleState.currentSchedule[0].dunsNumber = '';
    newCurrentScheduleState.currentSchedule[0].feiNumber = '';
    newCurrentScheduleState.currentSchedule[0].plantCode = '';
    newCurrentScheduleState.currentSchedule[0].site = '';
    newCurrentScheduleState.currentSchedule[0].technology = '';
    newCurrentScheduleState.currentSchedule[0].region = '';
    newCurrentScheduleState.sitePlantCoordinatorList = [];
    newCurrentScheduleState.sitePlantReviewerList = [];
  }
  newCurrentScheduleState.currentSchedule[0].sitePlanCoordinator = '';
  newCurrentScheduleState.currentSchedule[0].sitePlanReviewer = '';
  const newState = {};
  Object.assign(newState, newCurrentScheduleState);
  return newState;
};

const updateCurrentScheduleValues = (state, action) => {
  let newCurrentScheduleState = [];
  Object.assign(newCurrentScheduleState, state.currentSchedule);
  newCurrentScheduleState = [{
    site: action.schedule.site,
    description: action.schedule.description,
    feiNumber: action.schedule.feiNumber,
    dunsNumber: action.schedule.dunsNumber,
    region: action.schedule.siteName,
    plantCode: action.schedule.plantCode,
    technology: action.schedule.site,
    startDate: action.schedule.startDate,
    endDate: action.schedule.endDate,
    metricsIncluded: action.schedule.metricsIncluded
  }];
  const newState = {};
  Object.assign(newState, state, { currentSchedule: newCurrentScheduleState });
  return newState;
};

const updateScheduleDescription = (state, action) => {
  const newCurrentScheduleState = [];
  Object.assign(newCurrentScheduleState, state.currentSchedule);
  newCurrentScheduleState[0].description = action.text.substring(0, 100);
  const newState = {};
  Object.assign(newState, state, { currentSchedule: newCurrentScheduleState });
  return newState;
};
const updatePlanCoordinator = (state, action) => {
  const newCurrentScheduleState = [];
  Object.assign(newCurrentScheduleState, state.currentSchedule);
  newCurrentScheduleState[0].sitePlanCoordinator = action.userId;
  const newState = {};
  Object.assign(newState, state, { currentSchedule: newCurrentScheduleState });
  return newState;
};
const updatePlanReviewer = (state, action) => {
  const newCurrentScheduleState = [];
  Object.assign(newCurrentScheduleState, state.currentSchedule);
  newCurrentScheduleState[0].sitePlanReviewer = action.userId;
  const newState = {};
  Object.assign(newState, state, { currentSchedule: newCurrentScheduleState });
  return newState;
};

const modifyStartDate = (state, action) => {
  const newCurrentScheduleState = [];
  Object.assign(newCurrentScheduleState, state.currentSchedule);
  newCurrentScheduleState[0].startDate = action.date;
  const newState = {};
  Object.assign(newState, state, { currentSchedule: newCurrentScheduleState });
  return newState;
};

const modifyEndDate = (state, action) => {
  const newCurrentScheduleState = [];
  Object.assign(newCurrentScheduleState, state.currentSchedule);
  newCurrentScheduleState[0].endDate = action.date;
  const newState = {};
  Object.assign(newState, state, { currentSchedule: newCurrentScheduleState });
  return newState;
};

const updateMetricesInclude = (state, action) => {
  const newCurrentScheduleState = [];
  Object.assign(newCurrentScheduleState, state.currentSchedule);
  newCurrentScheduleState[0].metricsIncluded = _.map(newCurrentScheduleState[0].metricsIncluded, included => {
    const item = included;
    item.checked = false;
    const index = _.findIndex(action.includeData, ['metricId', item.metricId]);
    if (index > -1) {
      item.checked = true;
    }
    return item;
  });
  const newState = {};
  Object.assign(newState, state, { currentSchedule: newCurrentScheduleState });
  return newState;
};

const updateMetricsCheckBox = (state, action) => {
  const newCurrentScheduleState = [];
  Object.assign(newCurrentScheduleState, state.currentSchedule);
  const index = _.findIndex(newCurrentScheduleState[0].metricsIncluded, ['metricId', action.id]);
  if (index > -1) {
    newCurrentScheduleState[0].metricsIncluded[index].checked = !newCurrentScheduleState[0].metricsIncluded[index].checked;
  }
  const newState = {};
  Object.assign(newState, state, { currentSchedule: newCurrentScheduleState });
  return newState;
};

const updateSelectedProductsCheckbox = (state, action) => {
  const selectedProducts = [];
  Object.assign(selectedProducts, state.selectedProductsList);
  const index = _.findIndex(selectedProducts, ['productPk', action.id]);
  if (index > -1) {
    selectedProducts[index].excluded = !selectedProducts[index].excluded;
  }
  const newState = {};
  Object.assign(newState, state, { selectedProductsList: selectedProducts });
  return newState;
};

const editSchedule = (state, action) => {
  const newState = {};
  let productArray = [];
  const productListArray = [];
  const metricsArray = [];
  Object.assign(newState, state);
  Object.assign(metricsArray, state.currentSchedule[0].metricsIncluded);
  _.forEach(action.schedule.metricsIncluded, metric => {
    _.find(metricsArray, ['metricId', metric.id]).checked = true;
  });

  productArray = _.map(action.schedule.product, 'productList');
  _.forEach(productArray, value => {
    const product = [];
    if (value !== undefined) {
      Object.assign(product, value);
      product[0].productId = product[0].productNdc;
      product[0].subProductId = 1;
      product[0].isAdded = true;
      productListArray.push(product[0]);
    }
  });

  const result = [_.omit(action.schedule, ['product', 'checked'])];
  newState.currentSchedule = result;
  newState.currentSchedule[0].startDate = action.schedule.startDate;
  newState.currentSchedule[0].endDate = action.schedule.endDate;
  newState.currentSchedule[0].isNewSchedule = false;
  newState.currentSchedule[0].metricsIncluded = metricsArray;
  newState.currentSchedule[0].technology = action.schedule.technology;
  newState.currentSchedule[0].region = action.schedule.region;
  const selectedMaterialsArray = _.filter(newState.currentSchedule[0].materials, ['scheduleId', action.schedule.scheduleId]);
  const nselectedMaterialsArray = _.map(selectedMaterialsArray, o => {
    const item = o;
    item.comments = '';

    if (o.valid === 'NO') {
      item.excluded = true;
      item.isRemoved = true;
    } else {
      item.excluded = false;
      item.isRemoved = false;
    }
    return item;
  });
  Object.assign(newState, state, { currentSchedule: newState.currentSchedule, selectedProductsList: productListArray, selectedMaterialsList: nselectedMaterialsArray });
  return newState;
};

const filterProduct = (state, action) => {
  const productsState = {};
  Object.assign(productsState, state);
  const filteredArr = _.filter(productsState.siteProductsList, (product) =>
  (product.productName.toUpperCase().indexOf(action.productName.toUpperCase()) !== -1) &&
  (product.brandName.toUpperCase().indexOf(action.brandName.toUpperCase()) !== -1));
  const newState = {};
  Object.assign(newState, state, { filteredProductList: filteredArr });
  return newState;
};

const resetProductFilter = (state, action) => {
  const productsState = {};
  Object.assign(productsState, state);
  const filteredArray = productsState.siteProductsList;
  const newState = {};
  Object.assign(newState, state, { filteredProductList: filteredArray });
  return newState;
};

const setSiteMaterialsList = (state, action) => {
  const newState = {};
  const newFillterArr = [];
  const newArr = _.map(action.siteMaterialList, o => _.extend({ isRemoved: false, checked: false, excluded: false, comments: '' }, o));
  _.map(newArr, item => {
    const index = _.findIndex(state.selectedMaterialsList, { materialRecordId: item.materialRecordId });
    if (index < 0) {
      newFillterArr.push(item);
    }
  });

  _.map(state.selectedMaterialsList, (item) => {
    if (item.valid === 'NO') {
      const arry = item;
      arry.isRemoved = true;
      arry.excluded = false;
      newFillterArr.push(arry);
    }
  });
  Object.assign(newState, state, { siteMaterialsList: newArr, filteredMaterialsList: newFillterArr });
  return newState;
};

const setMaterialsList = (state, action) => {
  const newState = {};
  const newArr = _.map(action.materialList, o => _.extend({ checked: false, excluded: false, comments: '', isAdded: false, isDeleted: false }, o));
  Object.assign(newState, state, { siteMaterialsList: newArr, filteredMaterialsList: newArr, filteredMaterialsListDeleted: newArr, isMaterialLoading: false });
  return newState;
};

const filterMaterials = (state, action) => {
  const materialsState = {};
  Object.assign(materialsState, state);
  const queryResult = [];
  const siteMaterialsList = materialsState.siteMaterialsList;
  for (let i = 0, max = siteMaterialsList.length; i <= max; i += 1) {
    if (siteMaterialsList[i]) {
      const material = siteMaterialsList[i];
      if (action.brandName !== '' && action.productName !== '') {
        if (material.brand !== null && material.materialDescription !== null) {
          if ((material.brand.toUpperCase().indexOf(action.brandName.toUpperCase()) !== -1) && (material.materialDescription.toUpperCase().indexOf(action.productName.toUpperCase()) !== -1)) {
            let checkForExist = 0;
            for (let m = 0, maxM = queryResult.length; m <= maxM; m += 1) {
              if (queryResult[m]) {
                if (queryResult[m].materialNumber === material.materialNumber) {
                  checkForExist = 1;
                }
              }
            }
            if (checkForExist === 0) {
              queryResult.push(material);
            }
          }
        }
      } else if (action.brandName !== '') {
        if (material.brand !== null) {
          if (material.brand.toUpperCase().indexOf(action.brandName.toUpperCase()) !== -1) {
            let checkForExist = 0;
            for (let m = 0, maxM = queryResult.length; m <= maxM; m += 1) {
              if (queryResult[m]) {
                if (queryResult[m].materialNumber === material.materialNumber) {
                  checkForExist = 1;
                }
              }
            }
            if (checkForExist === 0) {
              queryResult.push(material);
            }
          }
        }
      } else if (action.productName !== '') {
        if (material.materialDescription !== null) {
          if (material.materialDescription.toUpperCase().indexOf(action.productName.toUpperCase()) !== -1) {
            let checkForExist = 0;
            for (let m = 0, maxM = queryResult.length; m <= maxM; m += 1) {
              if (queryResult[m]) {
                if (queryResult[m].materialNumber === material.materialNumber) {
                  checkForExist = 1;
                }
              }
            }
            if (checkForExist === 0) {
              queryResult.push(material);
            }
          }
        }
      }
    }
  }
  const newState = {};
  Object.assign(newState, state, { filteredMaterialsList: queryResult });
  return newState;
};

const resetMaterialsFilter = (state, action) => {
  const materialsState = {};
  Object.assign(materialsState, state);
  const filteredArr = materialsState.siteMaterialsList;
  const newState = {};
  Object.assign(newState, state, { filteredMaterialsList: filteredArr });
  return newState;
};

const filterProductDeleted = (state, action) => {
  const productsState = {};
  Object.assign(productsState, state);
  const filteredArr = _.filter(productsState.siteProductsList, (product) =>
  (product.productName.toUpperCase().indexOf(action.productName.toUpperCase()) !== -1) &&
  (product.brandName.toUpperCase().indexOf(action.brandName.toUpperCase()) !== -1));
  const newState = {};
  Object.assign(newState, state, { filteredProductListDeleted: filteredArr });
  return newState;
};

const resetProductFilterDeleted = (state, action) => {
  const productsState = {};
  Object.assign(productsState, state);
  const FilteredArray = productsState.siteProductsList;
  const newState = {};
  Object.assign(newState, state, { filteredProductListDeleted: FilteredArray });
  return newState;
};

const filterMaterialsDeleted = (state, action) => {
  const materialsState = {};
  Object.assign(materialsState, state);
  const queryResult = [];
  const siteMaterialsList = materialsState.siteMaterialsList;
  for (let i = 0, max = siteMaterialsList.length; i <= max; i += 1) {
    if (siteMaterialsList[i]) {
      const material = siteMaterialsList[i];
      if (action.brandName !== '' && action.productName !== '') {
        if (material.brand !== null && material.materialDescription !== null) {
          if ((material.brand.toUpperCase().indexOf(action.brandName.toUpperCase()) !== -1) && (material.materialDescription.toUpperCase().indexOf(action.productName.toUpperCase()) !== -1)) {
            let checkForExist = 0;
            for (let m = 0, maxM = queryResult.length; m <= maxM; m += 1) {
              if (queryResult[m]) {
                if (queryResult[m].materialNumber === material.materialNumber) {
                  checkForExist = 1;
                }
              }
            }
            if (checkForExist === 0) {
              queryResult.push(material);
            }
          }
        }
      } else if (action.brandName !== '') {
        if (material.brand !== null) {
          if (material.brand.toUpperCase().indexOf(action.brandName.toUpperCase()) !== -1) {
            let checkForExist = 0;
            for (let m = 0, maxM = queryResult.length; m <= maxM; m += 1) {
              if (queryResult[m]) {
                if (queryResult[m].materialNumber === material.materialNumber) {
                  checkForExist = 1;
                }
              }
            }
            if (checkForExist === 0) {
              queryResult.push(material);
            }
          }
        }
      } else if (action.productName !== '') {
        if (material.materialDescription !== null) {
          if (material.materialDescription.toUpperCase().indexOf(action.productName.toUpperCase()) !== -1) {
            let checkForExist = 0;
            for (let m = 0, maxM = queryResult.length; m <= maxM; m += 1) {
              if (queryResult[m]) {
                if (queryResult[m].materialNumber === material.materialNumber) {
                  checkForExist = 1;
                }
              }
            }
            if (checkForExist === 0) {
              queryResult.push(material);
            }
          }
        }
      }
    }
  }
  const newState = {};
  Object.assign(newState, state, { filteredMaterialsListDeleted: queryResult });
  return newState;
};

const resetMaterialsFilterDeleted = (state, action) => {
  const materialsState = {};
  Object.assign(materialsState, state);
  const FilteredArray = materialsState.siteMaterialsList;
  const newState = {};
  Object.assign(newState, state, { filteredMaterialsListDeleted: FilteredArray });
  return newState;
};

const addMaterialsToSelectedList = (state, action) => {
  const newMaterialsState = {};
  Object.assign(newMaterialsState, state);
  const selectedNewArray = _.filter(newMaterialsState.filteredMaterialsList, ['checked', true]);
  const newArray = _.map(selectedNewArray, (o) => {
    const item = o;
    item.isAdded = true;
    return item;
  });
  _.map(newArray, (o) => {
    const index = _.findIndex(newMaterialsState.selectedMaterialsList, ['materialPk', o.materialPk]);
    if (index === -1) {
      newMaterialsState.selectedMaterialsList.push(o);
    } else {
      newMaterialsState.selectedMaterialsList[index].excluded = false;
    }
  });

  const newState = {};
  Object.assign(newState, state, { selectedMaterialsList: newMaterialsState.selectedMaterialsList });
  return newState;
};

const deleteMaterialFromSelectedList = (state, action) => {
  const newMaterialsState = {};
  Object.assign(newMaterialsState, state);
  const removedSelectedMaterials = _.filter(newMaterialsState.selectedMaterialsList, ['materialPk', action.id]);
  removedSelectedMaterials[0].checked = false;
  const index = _.findIndex(newMaterialsState.selectedMaterialsList, ['materialPk', action.id]);
  if (index > -1) {
    newMaterialsState.selectedMaterialsList[index].excluded = true;
    newMaterialsState.selectedMaterialsList[index].isAdded = false;
    newMaterialsState.selectedMaterialsList[index].checked = false;
    newMaterialsState.selectedMaterialsList[index].comments = '';
  }
  const filterIndex = _.findIndex(newMaterialsState.filteredMaterialsList, ['materialPk', action.id]);
  if (filterIndex > -1) {
    newMaterialsState.filteredMaterialsList[filterIndex].isAdded = false;
    newMaterialsState.filteredMaterialsList[filterIndex].checked = false;
  }
  const newState = {};
  Object.assign(newState, newMaterialsState);
  return newState;
};

const updateMaterialListItemCheckbox = (state, action) => {
  const newMaterialsState = {};
  Object.assign(newMaterialsState, state);
  const index = _.findIndex(newMaterialsState.filteredMaterialsList, ['materialPk', action.id]);
  if (index > -1) {
    newMaterialsState.filteredMaterialsList[index].checked = !(newMaterialsState.filteredMaterialsList[index].checked);
  }
  const newState = {};
  Object.assign(newState, state, { filteredMaterialsList: newMaterialsState.filteredMaterialsList });
  return newState;
};

const setRemoveMaterialComment = (state, action) => {
  const newMaterialsState = {};
  Object.assign(newMaterialsState, state);
  const index = _.findIndex(newMaterialsState.selectedMaterialsList, ['materialPk', action.id]);
  if (index > -1) {
    newMaterialsState.selectedMaterialsList[index].comments = action.text;
  }
  const newState = {};
  Object.assign(newState, state, { selectedMaterialsList: newMaterialsState.selectedMaterialsList });
  return newState;
};

const setRemoveProductComment = (state, action) => {
  const newProductsState = {};
  Object.assign(newProductsState, state);
  const index = _.findIndex(newProductsState.selectedProductsList, ['productPk', action.id]);
  if (index > -1) {
    newProductsState.selectedProductsList[index].comments = action.text;
  }
  const newState = {};
  Object.assign(newState, state, { selectedProductsList: newProductsState.selectedProductsList });
  return newState;
};

const updateAllProductsListItemCheckbox = (state, checkedValue, action) => {
  const newProductsState = {};
  const newSelectedAllProdArr = [];
  Object.assign(newProductsState, state);
  _.filter(newProductsState.filteredProductList, item => {
    const Products = item;
    Products.checked = checkedValue.checked;
    newSelectedAllProdArr.push(Products);
  });
  const newState = {};
  Object.assign(newState, state, { filteredProductList: newSelectedAllProdArr });
  return newState;
};

const updateScopeAllMaterialListItemCheckbox = (state, checkedValue, action) => {
  const newMaterialsState = {};
  const newSelectedAllProdArr = [];
  Object.assign(newMaterialsState, state);
  _.filter(newMaterialsState.filteredMaterialsList, item => {
    const material = item;
    material.checked = checkedValue.checked;
    newSelectedAllProdArr.push(material);
  });
  const newState = {};
  Object.assign(newState, state, { filteredMaterialsList: newSelectedAllProdArr });
  return newState;
};

const resetMetricsList = (state, action) => {
  const newCurrentScheduleState = [];
  Object.assign(newCurrentScheduleState, state.currentSchedule);
  _.forEach(newCurrentScheduleState[0].metricsIncluded, metricInc => {
    const setFalseIndex = _.findIndex(newCurrentScheduleState[0].metricsIncluded, ['metricId', metricInc.metricId]);
    newCurrentScheduleState[0].metricsIncluded[setFalseIndex].checked = false;
  });
  _.forEach(action.id, metric => {
    const index = _.findIndex(newCurrentScheduleState[0].metricsIncluded, ['metricId', metric.metricId]);
    if (index > -1) {
      newCurrentScheduleState[0].metricsIncluded[index].checked = true;
    }
  });
  const newState = {};
  Object.assign(newState, state, { currentSchedule: newCurrentScheduleState });
  return newState;
};

const setMetricLists = (state, action) => {
  const newState = {};
  const metricsIncluded = _.map(action.metricList, o => _.extend({ checked: false }, o));
  Object.assign(newState, state, { metricList: metricsIncluded });
  return newState;
};

const setMetricListsIncludes = (state, action) => {
  const newState = {};
  Object.assign(newState, state);
  newState.currentSchedule[0].metricsIncluded = _.map(action.metricList, o => _.extend({ checked: false }, o));
  return newState;
};

const setSingleSchedule = (currentScheduleArr, schedule, metricList) => {
  const currentSchedule = currentScheduleArr;
  currentSchedule[0].scheduleId = schedule.scheduleId;
  currentSchedule[0].status = schedule.status;
  currentSchedule[0].siteId = schedule.siteId;
  currentSchedule[0].description = schedule.description;
  currentSchedule[0].dunsNumber = schedule.dunsNumber;
  currentSchedule[0].feiNumber = schedule.feiNumber;
  currentSchedule[0].plantCode = schedule.plantCode;
  currentSchedule[0].site = schedule.site;
  currentSchedule[0].technology = schedule.technology;
  currentSchedule[0].region = schedule.region;
  currentSchedule[0].startDate = schedule.startDate;
  currentSchedule[0].endDate = schedule.endDate;
  currentSchedule[0].metricsIncludedLists = schedule.metricsIncluded;
  currentSchedule[0].metricsIncluded = _.map(metricList, metricInc => {
    const item = metricInc;
    const index = _.findIndex(schedule.metrics, ['metricId', item.metricId]);
    if (index > -1) {
      item.checked = true;
    }
    return item;
  });
  return currentSchedule;
};

const setEditSchedule = (state, action) => {
  const newCurrentScheduleState = {};
  Object.assign(newCurrentScheduleState, state);
  const newScheduleArr = setSingleSchedule(
    newCurrentScheduleState.currentSchedule,
    action.schedule[0],
    newCurrentScheduleState.metricList
  );

  const newfillterProdArr = [];
  const newSelectedProdArr = action.schedule[0].productList;
  _.map(newCurrentScheduleState.filteredProductList, product => {
    const item = product;
    const index = _.findIndex(newSelectedProdArr, ['productPk', item.productPk]);
    if (index > -1) {
      if (newSelectedProdArr[index].isValid === 'NO') {
        item.isDeleted = true;
        newSelectedProdArr[index].excluded = true;
      } else {
        item.isDeleted = false;
        newSelectedProdArr[index].excluded = false;
        item.isAdded = true;
      }
    }
    newfillterProdArr.push(item);
  });

  const newState = {};
  Object.assign(newState, state, {
    currentSchedule: newScheduleArr,
    selectedProductsList: newSelectedProdArr,
    filteredProductList: newfillterProdArr,
    isLoading: false
  });
  return newState;
};

const editScope = (state, action) => {
  const newCurrentScheduleState = {};
  const newfillterMaterialArr = [];
  const newSelectedMaterialArr = action.schedule[0].materials;

  Object.assign(newCurrentScheduleState, state);
  const newScheduleArr = setSingleSchedule(
    newCurrentScheduleState.currentSchedule,
    action.schedule[0],
    newCurrentScheduleState.metricList
  );

  _.map(newCurrentScheduleState.filteredMaterialsList, material => {
    const item = material;
    const index = _.findIndex(newSelectedMaterialArr, ['materialPk', item.materialPk]);
    if (index > -1) {
      newSelectedMaterialArr[index].comments = '';
      newSelectedMaterialArr[index].excluded = false;
      item.comments = '';
      if (newSelectedMaterialArr[index].valid === 'NO') {
        item.isDeleted = true;
        newSelectedMaterialArr[index].excluded = true;
      } else {
        item.isDeleted = false;
        item.isAdded = true;
      }
    }
    newfillterMaterialArr.push(item);
  });
  const newRemovedMaterialArr = _.filter(newfillterMaterialArr, ['isDeleted', true]);
  const unSelectedMaterialArr = _.filter(newfillterMaterialArr, ['isDeleted', false]);
  const finalUnionArray = _.union(newRemovedMaterialArr, unSelectedMaterialArr);

  const newState = {};
  Object.assign(newState, state, {
    currentSchedule: newCurrentScheduleState.currentSchedule,
    filteredMaterialsList: finalUnionArray,
    selectedMaterialsList: newSelectedMaterialArr,
    isLoading: false
  });
  return newState;
};

const setScheduleUpdateStatus = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { isShowScheduleUpdateStatus: true, scheduleUpdateStatus: action.status });
  return newState;
};

const clearScheduleUpdateStatus = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { isShowScheduleUpdateStatus: false, scheduleUpdateStatus: 0 });
  return newState;
};

const setScheduleScopeUpdateStatus = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { isShowScheduleScopeUpdateStatus: true, scheduleScopeUpdateStatus: action.status });
  return newState;
};

const clearScheduleScopeUpdateStatus = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { isShowScheduleScopeUpdateStatus: false, scheduleScopeUpdateStatus: 0 });
  return newState;
};

const setSendForApprovalStatus = (state, action) => {
  const newState = {};
  Object.assign(newState, state, {
    isShowSendForApprovalStatus: true,
    sendForApprovalStatus: action.status,
    sendForApprovalProductList: action.productNDCList
  });
  return newState;
};

const clearSendForApprovalStatus = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { isShowSendForApprovalStatus: false, sendForApprovalStatus: 0, sendForApprovalProductList: [] });
  return newState;
};

const getBackSelectedProductList = (state, action) => {
  const newProductsState = {};
  Object.assign(newProductsState, state);
  _.map(_.filter(newProductsState.selectedProductsList, ['isValid', 'YES']), prodItem => {
    const filterIndex = _.findIndex(newProductsState.filteredProductList, ['productPk', prodItem.productPk]);
    if (filterIndex > -1) {
      newProductsState.filteredProductList[filterIndex].isAdded = true;
      newProductsState.filteredProductList[filterIndex].checked = false;
    }
    const Index = _.findIndex(newProductsState.selectedProductsList, ['productPk', prodItem.productPk]);
    newProductsState.selectedProductsList[Index].isAdded = true;
    newProductsState.selectedProductsList[Index].excluded = false;
    newProductsState.selectedProductsList[Index].checked = false;
    newProductsState.selectedProductsList[Index].comments = '';
  });

  const newState = {};
  Object.assign(newState, newProductsState);
  return newState;
};

const getBackSelectedMaterialList = (state, action) => {
  const newMaterialsState = {};
  Object.assign(newMaterialsState, state);
  _.map(_.filter(newMaterialsState.selectedMaterialsList, ['valid', 'YES']), materialItem => {
    const filterIndex = _.findIndex(newMaterialsState.filteredMaterialsList, ['materialPk', materialItem.materialPk]);
    if (filterIndex > -1) {
      newMaterialsState.filteredMaterialsList[filterIndex].isAdded = true;
      newMaterialsState.filteredMaterialsList[filterIndex].checked = false;
    }
    const Index = _.findIndex(newMaterialsState.selectedMaterialsList, ['materialPk', materialItem.materialPk]);
    newMaterialsState.selectedMaterialsList[Index].isAdded = true;
    newMaterialsState.selectedMaterialsList[Index].excluded = false;
    newMaterialsState.selectedMaterialsList[Index].checked = false;
    newMaterialsState.selectedMaterialsList[Index].comments = '';
  });

  const newState = {};
  Object.assign(newState, newMaterialsState);
  return newState;
};

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case scheduleManagerType.GET_ALL_SITES:
      return setAllSitesList(state, action);
    case scheduleManagerType.REQUEST_PRODUCTS_LOADING:
      return {
        ...state,
        isProductLoading: true
      };
    case scheduleManagerType.REQUEST_MATERIALS_LOADING:
      return {
        ...state,
        isMaterialLoading: true
      };
    case scheduleManagerType.SCHEDULE_REQUEST_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case scheduleManagerType.GET_ALL_SITE_PRODUCTS:
      return setSiteProductsList(state, action);

    case scheduleManagerType.TOGGLE_PRODUCTS_SELECT_CHECKBOX:
      return updateProductsListItemCheckbox(state, action);

    case scheduleManagerType.ADD_PRODUCTS_TO_SELECTEDLIST:
      return addProductsToSelectedList(state, action);

    case scheduleManagerType.UPADTE_CURRENT_SCHEDULE_VALUE:
      return updateCurrentScheduleValues(state, action);

    case scheduleManagerType.MODIFY_START_DATE:
      return modifyStartDate(state, action);

    case scheduleManagerType.MODIFY_END_DATE:
      return modifyEndDate(state, action);

    case scheduleManagerType.MODIFY_METRICLIST_CHECKBOX:
      return updateMetricsCheckBox(state, action);

    case scheduleManagerType.MODIFY_METRICS_METRIC_INCLUDE_LIST:
      return updateMetricesInclude(state, action);

    case scheduleManagerType.UPDATE_SCHEDULE_DESCRIPTION:
      return updateScheduleDescription(state, action);

    case scheduleManagerType.UPDATE_SCHEDULE_SITEDATA:
      return updateScheduleSiteData(state, action);

    case scheduleManagerType.UPDATE_SCHEDULE_PLAN_COORDINATOR:
      return updatePlanCoordinator(state, action);

    case scheduleManagerType.UPDATE_SCHEDULE_PLAN_REVIEWER:
      return updatePlanReviewer(state, action);

    case scheduleManagerType.RESET_SCHEDULE_DATA:
      return resetScheduleData(state, action);

    case scheduleManagerType.SCHEDULE_EDIT_SCHEDULE:
      return editSchedule(state, action);

    case scheduleManagerType.TOGGLE_PRODUCT_EXCLUDE_SCOPE:
      return updateSelectedProductsCheckbox(state, action);

    case scheduleManagerType.DELETE_SELECTED_PRODUCT:
      return deleteProductFromSelectedList(state, action);

    case scheduleManagerType.FILTER_PRODUCT:
      return filterProduct(state, action);

    case scheduleManagerType.RESET_FILTER:
      return resetProductFilter(state, action);

    case scheduleManagerType.GET_ALL_SITE_MATERIALS:
      return setSiteMaterialsList(state, action);

    case scheduleManagerType.ADD_MATERIALS_TO_SELECTEDLIST:
      return addMaterialsToSelectedList(state, action);

    case scheduleManagerType.FILTER_MATERIALS:
      return filterMaterials(state, action);

    case scheduleManagerType.RESET_FILTER_MATERIALS:
      return resetMaterialsFilter(state, action);

    case scheduleManagerType.FILTER_PRODUCT_DELETED:
      return filterProductDeleted(state, action);

    case scheduleManagerType.RESET_FILTER_DELETED:
      return resetProductFilterDeleted(state, action);

    case scheduleManagerType.FILTER_MATERIALS_DELETED:
      return filterMaterialsDeleted(state, action);

    case scheduleManagerType.RESET_FILTER_MATERIALS_DELETED:
      return resetMaterialsFilterDeleted(state, action);

    case scheduleManagerType.TOGGLE_MATERIALS_SELECT_CHECKBOX:
      return updateMaterialListItemCheckbox(state, action);

    case scheduleManagerType.DELETE_SELECTED_MATERIAL_SCOPE:
      return deleteMaterialFromSelectedList(state, action);

    case scheduleManagerType.SET_REMOVE_MATERIAL_COMMENT:
      return setRemoveMaterialComment(state, action);

    case scheduleManagerType.SET_REMOVE_PRODUCT_COMMENT:
      return setRemoveProductComment(state, action);

    case scheduleManagerType.UPDATE_METRICLIST_CHECKBOX:
      return resetMetricsList(state, action);

    case scheduleManagerType.GET_EDIT_SCHEDULE:
      return setEditSchedule(state, action);

    case scheduleManagerType.GET_EDIT_SCOPE:
      return editScope(state, action);

    case scheduleManagerType.GET_ALL_METRICS:
      return setMetricLists(state, action);

    case scheduleManagerType.GET_ALL_METRICS_INCLUDES:
      return setMetricListsIncludes(state, action);

    case scheduleManagerType.GET_PRODUCT_MATERIALS:
      return setMaterialsList(state, action);

    case scheduleManagerType.ALL_SCHEDULE_TOGGLE_PRODUCTS_SELECT_CHECKBOX:
      return updateAllProductsListItemCheckbox(state, action);

    case scheduleManagerType.ALL_SCHEDULE_SCOPE_TOGGLE_MATERIALS_SELECT_CHECKBOX:
      return updateScopeAllMaterialListItemCheckbox(state, action);

    case scheduleManagerType.SCHEDULE_UPDATE_STATUS:
      return setScheduleUpdateStatus(state, action);

    case scheduleManagerType.SCHEDULE_CLEAR_UPDATE_STATUS:
      return clearScheduleUpdateStatus(state, action);

    case scheduleManagerType.SCHEDULE_SCOPE_UPDATE_STATUS:
      return setScheduleScopeUpdateStatus(state, action);

    case scheduleManagerType.SCHEDULE_CLEAR_SCOPE_UPDATE_STATUS:
      return clearScheduleScopeUpdateStatus(state, action);

    case scheduleManagerType.GET_SEND_FOR_APPROVAL_STATUS:
      return setSendForApprovalStatus(state, action);

    case scheduleManagerType.CLEAR_SEND_FOR_APPROVAL_STATUS:
      return clearSendForApprovalStatus(state, action);

    case scheduleManagerType.GET_BACK_SCHEDULE_SELECTED_PRODUCT_LIST:
      return getBackSelectedProductList(state, action);

    case scheduleManagerType.GET_BACK_SCHEDULE_SELECTED_MATERIAL_LIST:
      return getBackSelectedMaterialList(state, action);

    default:
      return state;
  }
}
