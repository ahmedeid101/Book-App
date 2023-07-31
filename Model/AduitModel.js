exports.Audit = class Audit{
    constructor(action, data, status, error, auditBy, auditOn){
        this.action = action;
        this.data = data;
        this.status = status;
        this.error = error;
        this.auditBy = auditBy;
        this.auditOn = auditOn;
    }
}