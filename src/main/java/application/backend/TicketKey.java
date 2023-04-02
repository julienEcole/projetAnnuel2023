package application.backend;

public class TicketKey {
    protected String titre;
    protected String table;
    protected String description;

    /*public TicketKey(TicketKeyEnum nomTable,String titre) {
        //TODO
        //trouver un moyen de questionner bdd pour trouver la description automatiquement si elle existe
    }*/

    public TicketKey(String titre, TicketKeyEnum nomTable, String description) {
        this.titre = titre;
        this.description = description;
        String nomTableActual = nomtableToString(nomTable);
        try{
            this.table = nomTableActual;
        }
        catch (IllegalArgumentException err){
            System.out.println(err.getMessage());
        }
    }

    public TicketKey(String titre, TicketKeyEnum nomTable) {    //a voir si on peux pas remplacer titre par un enum
        this.titre = titre;
        this.description = "";
        String nomTableActual = nomtableToString(nomTable);
        try{
            this.table = nomTableActual;
        }
        catch (IllegalArgumentException err){
            System.out.println(err.getMessage());
        }
    }

    public TicketKey(String titre, String table, String description) {
        this.titre = titre;
        this.table = table;
        this.description = description;
    }

    private String nomtableToString(TicketKeyEnum nomTableArg){
        switch (nomTableArg){
            case ETAT :
                return "etat";
            case ROLE:
                return "role";
            case TYPE:
                return "type";
            case URGENCE:
                return "urgence";
            default:
                throw new IllegalArgumentException("le nom de table dans l\'enumeration n\'existe pas ou n\'as pas été implemente.");
        }
    }

    public String getTable() {
        return table;
    }

    public void setTable(String table) {
        this.table = table;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
