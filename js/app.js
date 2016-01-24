// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {

  // We'll ask the browser to use strict code to help us catch errors earlier.
  // https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
  'use strict';

    var battery;
    var nivel;
    var notification;
    var vLevel = document.getElementById("level");
    var iLevel = document.getElementById("levelValue");
    var chrgValue = document.getElementById("charginValue");
    var dscrgValue = document.getElementById("dischargingValue");   
    
    battery = navigator.battery || navigator.mozBattery || navigator.webkitBattery;
    
    
    /*
        actualiza el estado de información de la batería del dispositivo y permite actualizar
        los valores de carga de la batería dentro de la vista de la UI principal
    */
    
    function updateStatus(){        
        console.log(battery.level);
        nivel = Math.round((battery.level)*100);
        vLevel.innerHTML = nivel+"%";
        iLevel.innerHTML = nivel+"%";  
        dscrgValue.innerHTML = Math.floor(battery.dischargingTime/60)+" minutes Aprox.";
        validateNotification();
    }
    
    
    /*
        Actualiza la información adicional de la batería del dispositivo tal como si la batería
        esta conectada a alguna fuente de energia, y el tiempo de carga o descarga correspondiente
        según sea el caso
    */
    
    function updateBatInfo(){
        var estValue = document.getElementById("estValue");
        var sts = battery.charging ? 'charging' : 'not charging';
        estValue.innerHTML = sts; 
            if(sts === "charging"){
                chrgValue.innerHTML = Math.floor(battery.chargingTime/60)+" Minutes Aprox";
            }
            if(sts === "not charging"){
                chrgValue.innerHTML = "The battery is not conected to AC";
            }
    }
    
    
    /*
        Este metodo se encarga de validar el nivel de carga de la batería y establecer las respectivas
        acciones correspondientes a los diferentes niveles de carga de la bateria.
    */
    
    function validateNotification(){
        var mzNotif = navigator.mozNotification;                    
        if(nivel === 100){
           notification  = mzNotif.createNotification("JBattery","The battery is FULL charged, please                                                                                                       disconect",window.location.origin+"/img/icons/icon48.png");
            notification.show();
        }
        
        if(nivel === 50){
            notification  = mzNotif.createNotification("JBattery","TBattery has started to download, please be aware, the level                                                                              is: "+nivel,window.location.origin+"/img/icons/icon48.png");
            notification.show();
        }
        
        if(nivel <=10 ){
            notification  = mzNotif.createNotification("JBattery","The battery is running low, please connect your device to AC, level is:                                                                    "+nivel,window.location.origin+"/img/icons/icon48.png");
            notification.show();
        }
        
    }
    

    /*
        Actualiza la vista de UI ajustando el color de fondo de acuerdo al porcentaje de carga
        que tenga la batería del disppositivo, en caso de estar full entonces el color será de
        tono verde y empieza a degradar hacia naranja y rojo en caso de iniciar la descarga del 
        dispositivo, donde rojo es el nivel mínimo de la batería.
    */
    
    function updateBatteryView(){
        var elem = document.getElementById("counter");
        if(nivel>= 90){
            elem.style.backgroundColor = "#1b5e20";
        }
        if(nivel<90 && nivel >= 70){
            elem.style.backgroundColor = "#2e7d32";
        }
        if(nivel<70 && nivel >50){
            elem.style.backgroundColor = "#43a047";
        }
        if(nivel<=50 && nivel > 40){
            elem.style.backgroundColor = "#ffa726";            
        }
        if(nivel <= 40 && nivel>30){
            elem.style.backgroundColor = "#fb8c00";
        }
        if(nivel <= 30 && nivel > 20){
            elem.style.backgroundColor = "#ef6c00";
        }
        if(nivel <= 20 && nivel >10){
            elem.style.backgroundColor = "#e65100";
        }
        if(nivel <= 10){
            elem.style.backgroundColor = "#f44336";
        }
    }
    
    updateStatus();
    updateBatInfo();
    updateBatteryView();

    battery.addEventListener("levelchange",updateStatus,false);
    battery.addEventListener("chargingchange",updateBatInfo,false);
        
    
});
