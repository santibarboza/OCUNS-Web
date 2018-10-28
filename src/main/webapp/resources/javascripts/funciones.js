
var salto="---------------------------------------------";

function ocultarCode(){
    if(vm.panelCode.ver){
        vm.panelCode.ver=false;
        if(contenedorCompilado.ver && contenedorSimulacion.ver){
            contenedorCompilado.bigSize='col-md-4';
            contenedorSimulacion.bigSize='col-md-8';
         }else if(!contenedorSimulacion.ver)
                contenedorCompilado.bigSize='col-md-12';
            else
                contenedorSimulacion.bigSize='col-md-12';
    }
}
function mostrarCode(){
  if(!this.ver){
        this.ver=true;
        this.bigSize='col-md-4';
        if(contenedorCompilado.ver && contenedorSimulacion.ver){
            contenedorCompilado.bigSize='col-md-3';
            contenedorSimulacion.bigSize='col-md-5';
        }else if(contenedorCompilado.ver){
                    this.bigSize='col-md-9';
                    contenedorCompilado.bigSize='col-md-3';
             }else if(contenedorSimulacion.ver){
                    this.bigSize='col-md-7';
                    contenedorSimulacion.bigSize='col-md-5';
                }else 
                    this.bigSize='col-md-12';            
   }
}
function ocultarCompilado(){
    if(this.ver){
        this.ver=false;
        if(contenedorCode.ver && contenedorSimulacion.ver)
            contenedorCode.bigSize='col-md-7';
        else if(!contenedorSimulacion.ver)
                contenedorCode.bigSize='col-md-12';
            else
                contenedorSimulacion.bigSize='col-md-12';
   }
}
function mostrarCompilado(){
    if(!this.ver){
        this.ver=true;
        this.bigSize='col-md-3';
        if(contenedorCode.ver && contenedorSimulacion.ver)
            contenedorCode.bigSize='col-md-4';
        else if(contenedorCode.ver)
                    contenedorCode.bigSize='col-md-9';
             else if(contenedorSimulacion.ver){
                    this.bigSize='col-md-4';
                    contenedorSimulacion.bigSize='col-md-8';
                }else 
                    this.bigSize='col-md-12';
                
    }
}
function ocultarSimulacion(){
    if(this.ver){
        this.ver=false;
        if(contenedorCode.ver && contenedorCompilado.ver){
            contenedorCode.bigSize='col-md-8';
            contenedorCompilado.bigSize='col-md-4';
        }else if(!contenedorCompilado.ver)
                contenedorCode.bigSize='col-md-12';
            else
                contenedorCompilado.bigSize='col-md-12';
   }
}
function mostrarSimulacion(){
  if(!this.ver){
        this.ver=true;
        this.bigSize='col-md-5';
        if(contenedorCode.ver && contenedorCompilado.ver){
            contenedorCode.bigSize='col-md-4';
            contenedorCompilado.bigSize='col-md-3';
        }else if(contenedorCode.ver)
                contenedorCode.bigSize='col-md-7';
             else if(contenedorCompilado.ver){
                    this.bigSize='col-md-8';
                    contenedorCompilado.bigSize='col-md-4';
                }else
                    this.bigSize='col-md-12';
   }
}
function interpretarData(data){
    $.each(data, function( index, accion ) {
        switch (accion.codigoAccion) {
            case "Codigo_Compilado":
                vm.panelCompilado.value=accion.parametro;
                break;
            case "Update_Memoria":
                vm.updateMemoria(accion.parametro);
                break;
            case "Update_Registros":
                vm.updateRegistros(accion.parametro);
                break;
            case "Mostrar_Mensaje":
                vm.mostrarMensaje(accion.parametro);
                break;
            case "set_ID":
                vm.id=accion.parametro;
                break;
            case "Habilitar_Ejecutar":
                vm.habilitarEjecucion();
                break;
            case "Habilitar_Opciones_PAP":
                vm.habilita_EjecucionPAP(true);
                vm.setearEjecutando(true);
                break;
            case "Deshabilitar_Opciones_PAP":
                vm.habilita_EjecucionPAP(false);
                vm.setearEjecutando(false);
                break;
            case "Update_Logs":
                vm.agregarLog(accion.parametro);
                break;
            case "Set_PC":
                vm.updateIR({ir:vm.pc});
                vm.updatePC({pc:accion.parametro});
                break;
            default:
                console.log("default");
        }
    });
    vm.agregarLog(salto);
}
function getSiguientePaso(){
    $.ajax({
        method: "GET",
        url: "/siguientePaso?id="+vm.id, 
        success: function(data,textStatus){
         console.log("Respuesta del server en /siguientePaso: \n"+JSON.stringify(data));
         interpretarData(data);
        },
        error:function(textStatus,errorThrown){
          console.log("Error "+errorThrown+"... "+textStatus);
        }
      });
}
function detener(){
    $.ajax({
        method: "GET",
        url: "/detenerEjecucion?id="+vm.id, 
        success: function(data,textStatus){
         console.log("Respuesta del server en /detenerEjecucion: \n"+JSON.stringify(data));
         interpretarData(data);
         vm.habilita_EjecucionPAP(false);
         vm.setearEjecutando(false);
        },
        error:function(textStatus,errorThrown){
          console.log("Error "+errorThrown+"... "+textStatus);
        }
    });
    compilarCodigoFuente();
}
function compilarCodigoFuente(){
    var dataBody={"codigoFuente":this.panel.value, "direccionInicio": this.panel.direccionInicio};
      $.ajax({
        method: "POST",
        url: "/compilar?id="+vm.id, 
        data: JSON.stringify(dataBody),  
        headers:{
          "Content-Type": "application/json",
        },
        success: function(data,textStatus){
         console.log("Respuesta del server en /Compilar: \n"+JSON.stringify(data));
         vm.resetAll();
         interpretarData(data);
        },
        error:function(textStatus,errorThrown){
          console.log("Error "+errorThrown+"... "+textStatus);
        }
      });
      console.log("Se envio un POST a /compilar con");
      console.log("Codigo Fuente: \n"+this.panel.value);
      console.log("Direccion de Inicio: "+this.panel.direccionInicio);
}