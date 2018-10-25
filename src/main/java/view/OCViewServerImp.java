package view;

import java.io.File;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import server.Accion.*;
import presenter.*;

public class OCViewServerImp implements OCViewServer{
	private OCPresenter ocPresenter;
	private AccionFactory accionFactory;
	protected List <Accion> accionesActuales;
	protected String contenidoActual;
	protected boolean pudoLeer;
	protected String valorLeido;

	public OCViewServerImp(OCPresenter ocPresenter, AccionFactory accionFactory){
	    this.ocPresenter= ocPresenter;
	    this.accionFactory= accionFactory;
	    this.pudoLeer=false;
	    this.valorLeido="";
		accionesActuales= new ArrayList<Accion>();		
	}
	public void updateTextoTutorial(String texto){
		accionesActuales.add(accionFactory.crearAccionDefault("Mostrar_Mensaje",texto));
	}
	public void updateContenidoArchivoActual(String contenido){
		contenidoActual=contenido;
	}
	public void updateCodigoCompilado(String codigo){
		accionesActuales.add(accionFactory.crearAccionDefault("Codigo_Compilado",codigo));		
	}
	public void updateRegistros(Map<Integer,String> registros){
		accionesActuales.add(accionFactory.crearAccionCambio("Update_Registros",registros));	
	}
	public void updateMemoria(Map<Integer,String> memoria){
		accionesActuales.add(accionFactory.crearAccionCambio("Update_Memoria",memoria));	
	}
	public void updatePCView(String pc){
		accionesActuales.add(accionFactory.crearAccionDefault("Set_PC",pc));		
	}
	public void updateLogs(String log){
		accionesActuales.add(accionFactory.crearAccionDefault("Update_Logs",log));
	}
	public void mostrarMensaje(String mensaje){
		accionesActuales.add(accionFactory.crearAccionDefault("Mostrar_Mensaje",mensaje));		
	}
	public void habilitarOpcionesdeEjecucion(){
		accionesActuales.add(accionFactory.crearAccionDefault("Habilitar_Ejecutar",""));	
	}
	public void habilitarOpcionesdeEjecucionPasoaPaso(){
		accionesActuales.add(accionFactory.crearAccionDefault("Habilitar_Opciones_PAP",""));
	}
	public void deshabilitarOpcionesdeEjecucionPasoaPaso(){
		accionesActuales.add(accionFactory.crearAccionDefault("Deshabilitar_Opciones_PAP",""));
	}
	public List<Accion> obtenerAcciones(String id){
		List<Accion> retornar=accionesActuales;
		retornar.add(accionFactory.crearAccionDefault("set_ID",id));
		accionesActuales= new ArrayList<Accion>();
		return retornar;	
	}
	public String pedirDialogo(String pedido){
		String retorno="Invalido";
		if(pudoLeer)
			retorno= valorLeido;
		else
			accionesActuales.add(accionFactory.crearAccionDefault("LoadFF",pedido));
		pudoLeer=false;
		return retorno;
	}
	public void setLectura(String txt){
		pudoLeer=true;
		valorLeido=txt;
	}

	public void updateNombreArchivo(String fileName){}
	public void updateInstrucionView(String instruccion){}
	public boolean pedirAbrirArchivo(){return true;}
	public boolean guardarArchivo(){return true;}
	public File recuperarArchivo(){return null;}
	public void habilitarGuardarPanel(){}
	public void deshabilitarGuardarPanel(){}
	public void habilitarOpcionesdeCompilacion(){}
	public void mostrarMemoria(){}
	public void mostrarAyuda(){}

	
}
