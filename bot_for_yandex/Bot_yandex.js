// ==UserScript==
// @name         Bot for yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://crushdrummers.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Как звучит флейта","Валторна","Тромбон","Кларнет","Фагот","Гобой","Саксофон"],
    "crushdrummers.ru":["Барабанное шоу","Заказать шоу барабанщиков","Барабанное шоу в Москве"]
}
let site = Object.keys(sites)[Math.floor(Math.random()*Object.keys(sites).length)];
let keywords = sites[site];
let randomIndex = Math.floor(Math.random()*keywords.length);
let keyword = keywords[randomIndex];
let yandexInput = document.getElementById("text");
let yandex_button = document.getElementsByClassName("button")[0];
let links = document.links;
if(yandex_button!=undefined){
    let i = 0;
    document.cookie = "site="+site;
    let timerId = setInterval(()=>{
        yandexInput.value += keyword[i++];
        if(i==keyword.length){
            clearInterval(timerId);
            yandex_button.click();
        }
   },250);
}else if(location.hostname == "https://yandex.ru"){
    site = getCookie("site");
    let nextYandexPage = true;
    let currentYandexPage = document.getElementsByClassName("pager__item pager__item_current_yes pager__item_kind_page")[0].innerText
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf(site)!=-1){
            nextYandexPage = false;
            link.target="_self";
            link.click();
            break;
        }
    }
    let nextlink = "a.link.link_theme_none.link_target_serp.pager__item.pager__item_kind_next.i-bem";
    if(nextYandexPage && currentYandexPage<11) setTimeout(()=>{document.getElementById("pnnext").click()},1500);
    else if(currentYandexPage == 11) location.href = "https://yandex.ru";
}else{ // Мы находимся на найденом сайте
    setInterval(()=>{
        if(Math.random()>=0.8) location.href = "https://yandex.ru";
        let link = links[Math.floor(Math.random()*links.length)];
        if(link.href.indexOf(location.hostname)!=-1){
           link.click();}
        },3000);
}