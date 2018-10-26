package server.Accion;
import java.util.List;

public class AccionCambioImp implements AccionCambio{
    private final String codigoAccion;
    private final List<Cambio> parametro;

    public AccionCambioImp(String codigoAccion, List<Cambio> parametro) {
        this.codigoAccion = codigoAccion;
        this.parametro = parametro;
    }

    public String getCodigoAccion() {
        return codigoAccion;
    }

    public List<Cambio> getParametro() {
        return parametro;
    }
}
