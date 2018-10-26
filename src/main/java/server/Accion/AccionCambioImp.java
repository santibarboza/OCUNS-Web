package server.Accion;
import java.util.Map.Entry;
import java.util.Set;

public class AccionCambioImp implements AccionCambio{
    private final String codigoAccion;
    private final Set<Entry<Integer,String>> parametro;

    public AccionCambioImp(String codigoAccion, Set<Entry<Integer,String>> parametro) {
        this.codigoAccion = codigoAccion;
        this.parametro = parametro;
    }

    public String getCodigoAccion() {
        return codigoAccion;
    }

    public Set<Entry<Integer,String>> getParametro() {
        return parametro;
    }
}
