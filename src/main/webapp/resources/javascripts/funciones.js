var salto="---------------------------------------------";

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
            case "LoadFF":
                leerUsuario(accion.parametro);
                break;
            default:
                console.log("default");
        }
    });
    vm.agregarLog(salto);
}

function leerUsuario(texto){
    var usuario=prompt(texto);
    $.ajax({
        method: "GET",
        url: "/setLectura?id="+vm.id+"&leer="+usuario, 
        success: function(data,textStatus){
         interpretarData(data);
        },
        error:function(textStatus,errorThrown){
          console.log("Error "+errorThrown+": "+JSON.stringify(textStatus));
        }
      });
}
function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
};
function generarTexto(texto) { 
    return new Blob([texto], {
        type: 'text/plain'
    });
};

//Configuracion de Seleccion de Ventanas
$( document ).ready(function() {
  $('#ventanas').selectpicker('selectAll');
  $("select").on("changed.bs.select", 
    function(e, clickedIndex, newValue, oldValue) {
      if(e.currentTarget.id=="ventanas")
        vm.updateSizePaneles(clickedIndex,newValue);
      else
        console.log("Tipos de Ejecucion:"+clickedIndex+"-"+newValue);
  });
  document.getElementById('archivoAbierto').addEventListener('change', leerArchivo, false);

});