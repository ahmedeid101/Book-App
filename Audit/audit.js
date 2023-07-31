var events = require('events');
var audit = require('../Model/AduitModel');
var queries = require('../db/queries');
var dbConnection = require('../db/connection');


var emitter  = new events.EventEmitter();

const auditEvent = 'audit';
emitter.on(auditEvent, (audit)=>{
    console.log('Audit Even Emitter - Audit '+ JSON.stringify(audit)); 

    //steps of action - save into db
    try {
        values = [audit.action, JSON.stringify(audit.data), audit.status, JSON.stringify(audit.error), audit.auditBy, audit.auditOn];
        var auditQuery = queries.queryList.AUDIT_QUERY;
        dbConnection.dbQuery(auditQuery, values);
        
    } catch (error) {
        console.log('Audit Even Emitter Error: '+ error); 
        
    }

});

 exports.prepareAudit = (action, data, error, auditBy, auditOn)=>{
    let status = 200;
    if(error){
        status = 500;
    }

    var auditObj = new audit.Audit(action, data, status, error, auditBy, auditOn);
    emitter.emit(auditEvent, auditObj);
 }