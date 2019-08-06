'use-strict';
function OfflineDomain(){
    this.status="stopped";
    this.setConfirmedDown=function(){
        this.status="confirmed-down";
    };
    this.setDown=function(){
        this.status="down";
    };
    this.setConfirmedUp=function(){
        this.status="confirmed-up";
    };
    this.setUp=function(){
        this.status="up";
    };
}