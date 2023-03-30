package com.backendClass;

public abstract class TicketKey {
    protected String titre;
    protected String table;
    protected String description;

    public TicketKey(TicketKeyEnum nomTable,String table, String description) {

    }

    public TicketKey(String titre, String table, String description) {
        this.titre = titre;
        this.table = table;
        this.description = description;
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
