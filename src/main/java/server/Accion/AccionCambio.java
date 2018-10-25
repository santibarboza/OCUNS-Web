package server.Accion;

import java.util.Map;
public interface AccionCambio extends Accion{
    public Map<Integer,String> getParametro();
}