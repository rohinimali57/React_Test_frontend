import { combineReducers } from "redux"
import currencylist from './currency'
import lookup from './lookup'
import rolelist from './role'
import grouplist from './group'
import countrylist from './city'
import statelist from './state'
import citieslist from './cities'
import branchlist from './branchlist'
import eodconfiglist from './eodconfig'
import userslist from './userlist'
import holidaylist from './holiday'
import rolerightlist from './rolerights'
import Group from './grouplist'
import bankMaster from './bankInformation'
import caselist from './case'
import deduplist from './dedup'
import customerlist from './customer'
import deligenclist from './deligence'
import customerrisk from './customerRisk'
import sdnlist from './sdn'
import materiallist from './banmaterial'

export default combineReducers({
    currencylist,
    lookup,
    rolelist,
    grouplist,
    countrylist,
    statelist,
    citieslist,
    branchlist,
    eodconfiglist,
    userslist,
    holidaylist,
    rolerightlist,
    Group,
    bankMaster,
    caselist,
    deduplist,
    customerlist,
    deligenclist,
    customerrisk,
    sdnlist,
    materiallist   

});