import "jasmine";
import HttpClient from '../src/_utils/HttpClient';
import app from '../src/server';
var request = require("supertest");
describe("Sync API Types function", function() {
    it("should return Error if api fail to fetch", async ()=> {
        spyOn(HttpClient,'getRequest').and.callFake(function(path,headers){
            return new Promise((resolve,reject) => {
                reject(null);
            });
        })
        const  {status, text}=await request(app).get("/api/eventsType/sync-api-events")
        expect(status).toEqual(500)
        expect(text).toEqual(JSON.stringify({
            message:'Ops Somthing went wrong'
        }))
    })

    it("should return Message success when api return data", async ()=> {
        spyOn(HttpClient,'getRequest').and.callFake(function(path,headers){
            return new Promise((resolve,reject) => {
                resolve({
                    data:{
                        eventTypes:[
                            {
                                id: 1,
                                name: "test",
                                description: "test",
                                eventType: "test",
                            }
                        ]
                    }
                });
            });
        })
        const  {status, text}=await request(app).get("/api/eventsType/sync-api-events")
        expect(status).toEqual(200)
        expect(text).toEqual(JSON.stringify({
            message:'Events sync successfully'
        }))
    })

    it("should return Message erro when api return null data", async ()=> {
        spyOn(HttpClient,'getRequest').and.callFake(function(path,headers){
            return new Promise((resolve,reject) => {
                resolve({
                    data:null
                });
            });
        })
        const  {status, text}=await request(app).get("/api/eventsType/sync-api-events")
        expect(status).toEqual(500)
        expect(text).toEqual(JSON.stringify({
            message:'Ops Somthing went wrong'
        }))
    })

  
    
})