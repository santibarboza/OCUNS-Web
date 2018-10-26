package server;

import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.ArrayList;
import java.util.List;
import server.Accion.*;


import java.util.Map;
import java.util.HashMap;

import presenter.*;
import view.*;
import model.MemoriaMongo.*;


@RestController
public class OCRestController {
    private OCPresenter presenter;
    private OCViewServer view;
    private MemoriaMongo memoriaMongo;
    private BodyCompilado lastBody;

    @PostMapping("/compilar")
    public List<Accion> compilar(@RequestBody BodyCompilado body,@RequestParam(value="id", defaultValue="IdDefault") String idUsuario){
        iniciarAplicacion(idUsuario);
        reiniciarMemoria(idUsuario);
        realizarcompilacion(body);
        guardarMemoria();
        return obtenerAccionesRealizadas(idUsuario);
    }

    @RequestMapping("/iniciarEjecucion")
    public List<Accion> iniciarEjecucion(@RequestParam(value="id") String idUsuario) {
        iniciarAplicacion(idUsuario);
        //iniciarMemoria();
        realizarIniciarEjecucion();
        guardarMemoria();
        return obtenerAccionesRealizadas(idUsuario);
    }
    @RequestMapping("/siguientePaso")
    public List<Accion> siguientePaso(@RequestParam(value="id") String idUsuario) {
        iniciarAplicacion(idUsuario);
        realizarSiguientePaso();
        guardarMemoria();
        return obtenerAccionesRealizadas(idUsuario);
    }
    @RequestMapping("/setLectura")
    public List<Accion> siguientePaso(@RequestParam(value="id") String idUsuario,@RequestParam(value="leer") String lectura) {
        iniciarAplicacion(idUsuario);
        leerValor(lectura);
        realizarSiguientePaso();
        guardarMemoria();
        return obtenerAccionesRealizadas(idUsuario);
    }
    @RequestMapping("/detenerEjecucion")
    public List<Accion> detenerEjecucion(@RequestParam(value="id") String idUsuario) {
        return compilar(lastBody,idUsuario);
    }
    
    private void leerValor(String lectura) {
        view.setLectura(lectura);
    }
    private String obtenerID(String id){
        if(esIDPorDefecto(id))
            return crearNuevaID();
        System.out.println("ID="+id+" por defecto="+esIDPorDefecto(id));
        return id+"ID="+id+" por defecto="+esIDPorDefecto(id);
    }
    private boolean esIDPorDefecto(String idUsuario){
        return idUsuario.equals("noID");
    }
    private String crearNuevaID(){
        return java.util.UUID.randomUUID().toString();
    }
    private void reiniciarMemoria(String idUsuario){
        memoriaMongo.reiniciarMemoria();
        obtenerAccionesRealizadas(idUsuario);
    }
    private void iniciarAplicacion(String idUsuario){
        idUsuario=obtenerID(idUsuario);
        iniciarPresenter(idUsuario);
        obtenerView();
        obtenerMemoriaMongo();
    }
    private void iniciarPresenter(String idUsuario){
        presenter = OCPresenterServerModule.getInstance().startApplication(idUsuario);
    }
    private void obtenerView(){
        view=OCPresenterServerModule.getInstance().getOCView();
    }
    private void obtenerMemoriaMongo(){
        memoriaMongo = OCPresenterServerModule.getMemoriaMongo();
    }
    private void realizarcompilacion(BodyCompilado body){
        lastBody=body;
        presenter.onEventCompilar(body.getCodigoFuente(),body.getDireccionInicio());  
    }
    private void realizarIniciarEjecucion(){
        presenter.onEventEjecutar(false);
    }
    private void realizarSiguientePaso(){
        presenter.onEventSiguientePaso();
    }
    private void guardarMemoria(){
        memoriaMongo.guardarMemoria(); 
    }
    private List<Accion> obtenerAccionesRealizadas(String idUsuario){
        return view.obtenerAcciones(idUsuario);
    }


    @RequestMapping("/test1")
    public List<Accion> test1(@RequestParam(value="id", defaultValue="111") String id) {
        OCPresenter presenter = OCPresenterServerModule.getInstance().startApplication(id);
        OCViewServer view=OCPresenterServerModule.getInstance().getOCView();
        presenter.updatePCView("PCViejo");
        presenter.updatePCView("PCNuevo");
        presenter.updateLogs("LogNuevo");
        return obtenerAccionesRealizadas(id);
    }
    @PostMapping("/test2")
    public BodyCompilado test2(@RequestBody BodyCompilado body) {
        return body;
    }

    @RequestMapping("/test3")
    public BodyCompilado test3(@RequestParam(value="id", defaultValue="111") String id) {
        return new BodyCompilado("0E", "Codigo Milagroso");
    }

    @PostMapping("/test4")
    public BodyCompilado test4(@ModelAttribute BodyCompilado body) {
        return body;
    }
    @PostMapping("/test5")
    public String test5(@RequestBody String body) {
        return body;
    }
}
