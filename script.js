"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = "1afed292301b4a71852195852232611";
const BASE_URL = "http://api.weatherapi.com/v1";
const sendRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=london`);
    const resultResponse = yield response.json();
    console.log(resultResponse);
});
sendRequest();
