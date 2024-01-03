import axios from 'axios';
// import { receiveBankMasterResponce } from '../actions/bankInformation';

export const applicationContextPath = "http://localhost:8080";
// export const applicationContextPath = "http://aafe1654a36d.ngrok.io/Aml-Api";
//export const applicationContextPath = "http://bot.nellinfotech.com:8080/aml";
//export const applicationContextPath = "http://localhost:8080/aml";
export const birtReport = "http://bot.nellinfotech.com:8443/aml-birt-mis-reports/aml"
// export const birtReport = "http://localhost:8443/aml-birt-mis-reports-1.0/"

// Service For The Save Bank Bank Details
export const saveBotConfig = (data, headers) => {
  debugger
  return axios.post(applicationContextPath + '/savebank', data, {
    headers: headers
  }).then(response => {
    console.log("Bank_master", response.data)
    return response.data;

  }).catch(error => {
    console.log(error);
    return error;
  });
}
// Service For The Save LookUp Details
export const savelookUP = (notificationData, headers) => {
  debugger

  return axios.post(applicationContextPath + '/saveLookupDetails', notificationData, {
    headers: headers
  }).then(response => {
    console.log(response)
  }).catch(error => {
    console.log(error);
  });
}
// Service For User Login  Bank Details
export const Login = async (data) => {
  debugger
  console.log("data11111", data.bankCode)
  return axios.post(applicationContextPath + '/userlogin', data, {
    headers: {
      bankCode: data.bankCode
    }
  }).then(response => {
    console.log("Login", response.data)
    return response;

  }).catch(error => {
    console.log(error);
    return error;
  });
}

export const alertID = (data,headers) => {
  debugger
  console.log("data11111", data.bankCode)
  return axios.get(applicationContextPath + `/getAlertInfo?alertId=${data.id}`,{ headers })
    .then(response => {
      console.log(response.data);
      this.setState({ getApiData: response.data });
      console.log("data---", this.state.getApiData);
      return response;
    }).catch(error => {
      console.log(error);
      return error;
    });
}

// Service For The Get LookUp Type in DropDown 
export const getLookup = (LookuoCode, headers) => {
  debugger
  return axios.get(applicationContextPath + `/getLookupDtlsByLookupCode?lookupCode=${LookuoCode}`, { headers })
    .then(response => {
      return response.data
      console.log("lookupCode", response.data)
    }

    ).catch(error => {
      console.log(error);
    });

}
// Service For The Get Branch Code  in DropDown in Branch Master After Click ON UPdate Button branch_management
export const getbranchCode = (bankcode, headers) => {
  debugger
  return axios.get(applicationContextPath + `/getBranchByBankCode?bankCode=${bankcode}`, { headers })
    .then(response => {
      console.log("data11111--", response.data)
      return response.data
    }

    ).catch(error => {
      console.log(error);
    });

}
export const getBranchMastByCode = (branchCode, headers) => {
  debugger

  return axios.get(applicationContextPath + `/getBranchMastByCode?branchCode=${branchCode}`, { headers })
    .then(response => {
      console.log("getBranchMastByCode--", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}

// Service For The Save Bank Parameter
export const saveBankparameter = (notificationData, headers) => {
  debugger
  return axios.post(applicationContextPath + '/savebankparam', notificationData, {
    headers: headers
  }).then(response => {
    console.log("botconfigresponse", response.notificationData)
  }).catch(error => {
    console.log(error);
  });
}
// Service For The Save branch_parameter
export const saveBranchParameter = (notificationData, headers) => {
  return axios.post(applicationContextPath + '/savebranch', notificationData, {
    headers: headers
  }).then(response => {
    console.log("botconfigresponse", response.notificationData)
  }).catch(error => {
    console.log(error);
  });
}

// Service For The Update LookUp Details
export const updatelookup = (UpddateApiData, headers) => {
  debugger
  return axios.post(applicationContextPath + '/updatelookupDtls', UpddateApiData, { headers: headers })
    .then(response => {
      console.log("UpddateApiData", response.UpddateApiData)
    }
    ).catch(error => {
      console.log(error);
    });

}
// Service For The Save Save Branch Master Details branch_management
export const SaveBranchMaster = (notificationData, headers) => {
  debugger
  return axios.post(applicationContextPath + '/saveBranchMst', notificationData, {
    headers: headers
  }).then(response => {
    console.log("saveBranchMst111111", response)
  }).catch(error => {
    console.log(error);
  });
}
// Service For  Save  Role Master Details
export const saveRoleMaster = (RoleData, headers) => {
  debugger
  return axios.post(applicationContextPath + '/saveRoleMst', RoleData, {
    headers: headers
  }).then(response => {
    console.log("RoleData", response.RoleData)
  }).catch(error => {
    console.log(error);
  });
}
// Service For  Save Get Role Master Details
export const getRoleData = (bankCode, headers) => {
  debugger
  return axios.get(applicationContextPath + `/getRoleMst?bankCode=${bankCode}`, { headers })
    .then(response => {
      console.log("Rolemaster", response.data)
      return response.data
    }
    ).catch(error => {
      return error
      console.log(error);
    });

}
// Servise For Save User Master 
export const saveUserMaster = (RoleData, headers) => {
  debugger
  return axios.post(applicationContextPath + '/userRegistration', RoleData, {
    headers: headers
  }).then(response => {
    console.log("RoleData", response.RoleData)
  }).catch(error => {
    console.log(error);
  });
}

export const getUserMaster = (bankCode, headers) => {
  debugger

  return axios.get(applicationContextPath + `/userList?bankCode=${bankCode}`, { headers })
    .then(response => {

      console.log("userList", response)
      return response.data
    }

    ).catch(error => {
      console.log(error);
    });

}

// Servise For Save country_master
export const saveCountryMaster = (countryData, headers) => {
  debugger
  return axios.post(applicationContextPath + '/saveCountry', countryData, {
    headers: headers
  }).then(response => {
    console.log("botconfigresponse", response.data)
    return response.data

  }).catch(error => {
    console.log(error);
  });
}
// Servise for Update country_master
export const updateCountryMaster = (UpddateApiData, headers) => {
  debugger

  return axios.post(applicationContextPath + '/updateCountry', UpddateApiData, { headers: headers })
    .then(response => {
      console.log("UpddateApiData", response.UpddateApiData)
    }
    ).catch(error => {
      console.log(error);
    });

}

// Service For  Get country_master Details
export const getCountryMaster = (bankCode, headers) => {
  debugger

  return axios.get(applicationContextPath + `/getCountry?bankCode=${bankCode}`, { headers })
    .then(response => {
      console.log("workingAPI", response)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}
// Servise for Save state_master
export const saveStateMaster = (stateData, headers) => {

  return axios.post(applicationContextPath + '/saveState', stateData, {
    headers: headers
  }).then(response => {
    console.log("botconfigresponse", response.stateData)
  }).catch(error => {
    console.log(error);
  });
}
// Servise for UPDATE state_master
export const updateStateMaster = (UpddateStateData, headers) => {
  debugger
  return axios.post(applicationContextPath + '/updateState', UpddateStateData, { headers: headers })
    .then(response => {
      console.log("UpddateApiData", response.UpddateStateData)
    }
    ).catch(error => {
      console.log(error);
    });

}
// Service For  Get state_master Details
export const getStateMaster = (bankCode, headers) => {
  debugger
  return axios.get(applicationContextPath + `/getState?bankCode=${bankCode}`, { headers })
    .then(response => {
      console.log("StateMaster", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}
// Servise for Save city_master
export const saveCityMaster = (notificationData, headers) => {
  debugger
  return axios.post(applicationContextPath + '/saveCity', notificationData, {
    headers: headers
  }).then(response => {

    console.log("botconfigresponse", response.notificationData)
  }).catch(error => {
    console.log(error);
  });
}
// Servise for Update city_master

export const updateCityMaster = (UpddateCityData, headers) => {
  debugger

  return axios.post(applicationContextPath + '/updateCity', UpddateCityData, { headers: headers })
    .then(response => {
      console.log("UpddateApiData", response.UpddateCityData)
    }
    ).catch(error => {
      console.log(error);
    });

}

// Service For  Get city_master Details
export const getCityMaster = (bankCode, headers) => {
  debugger
  return axios.get(applicationContextPath + `/getCity?bankCode=${bankCode}`, { headers })
    .then(response => {
      console.log("CityMaster", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}
// Service For  Get currency_master Details
export const getCurrencyMaster = (bankCode, headers) => {
  debugger
  return axios.get(applicationContextPath + `/getCurrency?bankCode=${bankCode}`, { headers })
    .then(response => {
      console.log("CurrencyMaster", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}

// Servise for Save currency_master
export const saveCurrencyMaster = (currencyData, headers) => {
  debugger
  return axios.post(applicationContextPath + '/saveCurrency', currencyData, {
    headers: headers
  }).then(response => {

    console.log("botconfigresponse", response.currencyData)
  }).catch(error => {
    console.log(error);
  });
}
// Servise for UPDATE currency_master
export const updateCurrencyMaster = (UpddateApiData, headers) => {
  debugger
  return axios.post(applicationContextPath + '/updateCurrency', UpddateApiData, { headers: headers })
    .then(response => {
      console.log("UpddateApiData", response.UpddateApiData)
    }
    ).catch(error => {
      console.log(error);
    });

}
// Servise for Save branch_holiday_master
export const saveBranchHoliday = (holidayData, headers) => {
  debugger
  return axios.post(applicationContextPath + '/saveBranchHoliday', holidayData, {
    headers: headers
  }).then(response => {

    console.log("botconfigresponse", response.holidayData)
  }).catch(error => {
    console.log(error);
  });
}

// Service For  Get branch_holiday_master Details
export const getBranchHoliday = (branchCode, headers) => {
  debugger
  return axios.post(applicationContextPath + '/getbranchholidaylist', { branchCode: branchCode }, { headers })
    .then(response => {
      console.log("CurrencyMaster", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}


// Servise for Save group_maintain
export const saveGroupMaster = (groupData, headers) => {
  debugger
  return axios.post(applicationContextPath + '/saveGroup', groupData, {
    headers: headers
  }).then(response => {

    console.log("botconfigresponse", response.groupData)
  }).catch(error => {
    console.log(error);
  });
}

// Service For  Get group_maintain Details
export const getGroupMaster = (bankCode, headers) => {
  debugger
  return axios.get(applicationContextPath + `/getGroup?bankCode=${bankCode}`, { headers })
    .then(response => {
      console.log("getGroupMaster", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}

// Servise for UPDATE group_maintain 
export const updateGroupMaster = (UpdateGroupData, headers) => {
  debugger
  return axios.post(applicationContextPath + '/updateGroup', UpdateGroupData, { headers: headers })
    .then(response => {
      console.log("UpddateApiData", response.UpdateGroupData)
    }
    ).catch(error => {
      console.log(error);
    });

}
// Servise for GET role_rights
export const getRoleRightsData = (roleCode, headers) => {
  debugger
  return axios.get(applicationContextPath + `/getMenuMap?roleCode=${roleCode}`, { headers })
    .then(response => {
      console.log("getGroupMaster", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}
export const saveRoleMenuMap = (menuRole, headers) => {
  debugger
  return axios.post(applicationContextPath + '/saveRoleMenuMap', menuRole, {
    headers: headers
  }).then(response => {
    console.log("botconfigresponse", response)
    return response.data
  }).catch(error => {
    console.log(error);
  });
}

// Service For  Update Case Details
export const UpdateCaseStatus = (data, headers) => {
  debugger
  return axios.post(applicationContextPath + '/updateCaseStatus', data, { headers })
    .then(response => {
      console.log("updatecaseStatusResponse", response)
      return response.data
    }).catch(error => {
      console.log(error);
    });
}

// Service For  Confirm Case Details
export const ConfirmCase = (data, headers) => {
  debugger
  return axios.post(applicationContextPath + '/updateConfirmCase', data, { headers })
    .then(response => {
      console.log("confirmcase", response)
      return response.data
    }).catch(error => {
      console.log(error);
    });
}


export const sdnSearch = (name, headers) => {
  debugger

  return axios.post(applicationContextPath + '/ofacSearchList', name, { headers })
    .then(response => {

      console.log("ofacSearchList", response)
      return response.data
    }

    ).catch(error => {
      console.log(error);
    });

}
//Service For Search Customer Parameter
export const getCustomerSearch = (stateData, headers) => {
  debugger
  return axios.post(applicationContextPath + '/findByCustomerParam', stateData, { headers })
    .then(response => {
      console.log("findByCustomerParam", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}

//Service For Get Customer Parameter
export const getCustomers = (custCode, headers) => {
  debugger
  return axios.post(applicationContextPath + '/getCustomer', { custCode: custCode }, { headers })
    .then(response => {
      console.log("getCustomer", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}


//Service For Get Customer Case Risk
export const getCase = (caseID, headers) => {
  debugger
  const param = new URLSearchParams({
    caseID: caseID,

  })
  const url = applicationContextPath + "/getCase?" + param
  return axios.post(url, null, { headers })
    .then(response => {
      console.log("getCase", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}


//Service For Get Customer Parameter
export const getCustomersAccount = (custCode, headers) => {
  debugger
  return axios.post(applicationContextPath + '/getAccountNumber', { custCode: custCode }, { headers })
    .then(response => {
      console.log("getAccountNumber", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}



//Service For Search Transaction Parameter
export const getTransactionSearch = (acctNo, cashflowType, transactionAmount, toDate, fromDate, operator, custCode, headers) => {
  debugger
  const param = new URLSearchParams({
    acctNo: acctNo,
    cashflowType: cashflowType,
    transactionAmount: transactionAmount,
    toDate: toDate,
    fromDate: fromDate,
    operator: operator,
    custCode: custCode
  })
  const url = applicationContextPath + "/findByTransactionParam?" + param
  return axios.post(url, null, { headers })
    .then(response => {
      console.log("findByTransactionParam", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}

//Service For de_Dup_Process
export const getDedupprocess = (custCode, custFName, custLName, addr1, addr2, custPAN, custAdhar, custMobile, custDOB, headers) => {
  debugger
  const param = new URLSearchParams({
    custCode: custCode,
    custFName: custFName,
    custLName: custLName,
    addr1: addr1,
    addr2: addr2,
    custPAN: custPAN,
    custAdhar: custAdhar,
    custMobile: custMobile,
    custDOB: custDOB,
  })
  const url = applicationContextPath + "/getDeDupData?" + param
  return axios.post(url, null, { headers }
  )
    .then(response => {
      console.log("getDedupprocess", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}

export const getKYCRiskProfile = (custCode, branchCode, headers) => {
  debugger
  const param = new URLSearchParams({
    custCode: custCode,
    branchCode: branchCode
  })
  const url = applicationContextPath + "/getKYCRiskProfile?" + param
  return axios.post(url, null, { headers })
    .then(response => {
      console.log("getKYCRiskProfile", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}
export const getRiskGraphData = (custCode, branchCode, headers) => {
  debugger
  const param = new URLSearchParams({
    custCode: custCode,
    branchCode: branchCode
  })
  const url = applicationContextPath + "/getRiskGraphData?" + param
  return axios.post(url, null, { headers })
    .then(response => {
      console.log("getRiskGraphData", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}
//Service For de_Dup_Process
export const getRunDeDup = (parentCustCode, dedupCustCode, headers) => {
  debugger
  const param = new URLSearchParams({
    parentCustCode: parentCustCode,
    dedupCustCode: dedupCustCode
  })
  const url = applicationContextPath + "/runDeDup?" + param
  return axios.post(url, null, { headers })
    .then(response => {
      console.log("runDeDup", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}

export const getTransactionRiskProfile = (custCode, branchCode, headers) => {
  debugger
  const param = new URLSearchParams({
    custCode: custCode,
    branchCode: branchCode
  })
  const url = applicationContextPath + "/getTransactionRiskProfile?" + param
  return axios.post(url, null, { headers })
    .then(response => {
      console.log("runDeDup", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}
// Servise for due_deligence_master
export const saveDeligenceMaster = (stateData, headers) => {

  return axios.post(applicationContextPath + '/saveDueDiligenceMst', stateData, {
    headers: headers
  }).then(response => {
    console.log("botconfigresponse", response.stateData)
  }).catch(error => {
    console.log(error);
  });
}

// Servise for UPDATE due_deligence_master
export const updateDeligenceMaster = (UpddateStateData, headers) => {
  debugger
  return axios.post(applicationContextPath + '/updateDueDiligenceMst', UpddateStateData, { headers: headers })
    .then(response => {
      console.log("UpddateApiData", response.UpddateStateData)
    }
    ).catch(error => {
      console.log(error);
    });

}
// Service For  Get due_deligence_master Details
export const getDeligenceMaster = (bankCode, headers) => {
  debugger
  return axios.post(applicationContextPath + '/getDueDiligencelist', { bankCode: bankCode }, { headers })
    .then(response => {
      console.log("StateMaster", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}
export const getGroupUserHierychy = (userId, headers) => {
  debugger

  return axios.get(applicationContextPath + `/getGroupUserHierychy?userId=${userId}`, { headers })
    .then(response => {

      console.log("userList", response)
      return response.data
    }

    ).catch(error => {
      console.log(error);
    });

}
// Servise for Save group_maintain
export const saveGroupUserHierychy = (groupData, headers) => {
  debugger
  return axios.post(applicationContextPath + '/saveGroupUserHierychy', groupData, {
    headers: headers
  }).then(response => {

    console.log("botconfigresponse", response.groupData)
  }).catch(error => {
    console.log(error);
  });
}
// Servise for Save group_maintain
export const updateGroupUser = (id, headers) => {
  debugger
  return axios.post(applicationContextPath + '/updateGroupUser', id, { headers: headers }
  ).then(response => {

    console.log("botconfigresponse", response.groupData)
  }).catch(error => {
    console.log(error);
  });
}
export const getEODMasterConfiguration = (headers) => {
  debugger
  return axios.get(applicationContextPath + '/getEODMasterConfiguration', { headers: headers }
  ).then(response => {
    console.log("botconfigresponse", response)
    return response.data

  }).catch(error => {
    console.log(error);
  });
}

export const runDueDiligenceJob = (bankCode, headers) => {
  debugger
  const param = new URLSearchParams({
    bankCode: bankCode,

  })
  const url = applicationContextPath + "/runDueDiligenceJob?" + param
  return axios.post(url, null, { headers }
  ).then(response => {

    console.log("botconfigresponse", response.groupData)
  }).catch(error => {
    console.log(error);
  });
}

//Service For Save User Case
export const userSavecase = (notificationData, headers) => {
  debugger
  return axios.post(applicationContextPath + '/saveCase', notificationData, {
    headers: headers
  }).then(response => {
    console.log("saveCase", response.notificationData)
  }).catch(error => {
    console.log(error);
  });
}

// Service For  Get View Case Details
export const getViewCase = (bankCode, headers) => {
  debugger

  return axios.get(applicationContextPath + `/getCaseListByCaseID?bankCode=${bankCode}`, { headers })
    .then(response => {
      console.log("workingAPI", response)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}

//Service For Get Customer Case Risk
export const UpdateRoleRights = (id, headers) => {
  debugger
  return axios.post(applicationContextPath + '/updateMenuMap', id, { headers })
    .then(response => {
      console.log("botconfigresponse", response)
      return response.data
    }).catch(error => {
      console.log(error);
    });
}



//Service For Get Customer Risk
export const getCustomerRisk = (bankCode, headers) => {
  debugger

  return axios.post(applicationContextPath + '/getAllCustomer', { bankCode: bankCode }, { headers })
    .then(response => {

      console.log("getAllCustomer", response.data)
      return response.data
    }

    ).catch(error => {
      console.log(error);
    });

}

//Service For Search Risk Score
export const getRiskSearch = (fromDate, toDate, custCode, headers) => {
  debugger
  const param = new URLSearchParams({
    fromDate: fromDate,
    toDate: toDate,
    custCode: custCode
  })
  const url = applicationContextPath + "/getRiskMovement?" + param
  console.log(url);
  return axios.post(url, null, { headers })
    .then(response => {
      console.log("getRiskMovement", response.data)
      return response.data
    }
    ).catch(error => {
      console.log(error);
    });

}
