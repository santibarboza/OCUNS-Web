package server.Accion;
import java.util.Map;

public class AccionCambioImp implements AccionCambio{
    private final String codigoAccion;
    private final Map<Integer,String> parametro;

    public AccionCambioImp(String codigoAccion, Map<Integer,String> parametro) {
        this.codigoAccion = codigoAccion;
        this.parametro = parametro;
    }

    public String getCodigoAccion() {
        return codigoAccion;
    }

    public Map<Integer,String> getParametro() {
        return parametro;
    }
}
