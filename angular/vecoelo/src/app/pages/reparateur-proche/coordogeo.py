from geopy.geocoders import Nominatim


def get_coordinates(address):
    try:
        geolocator = Nominatim(user_agent="geocoder")
        location = geolocator.geocode(address)
        if location:
            latitude = location.latitude
            longitude = location.longitude
            return latitude, longitude
        else:
            return None
    except Exception as e:
        return None


# Votre liste d'adresses
addresses = [
    "2 Ter rue Epinette 77340 Pontault Combault",
    "58 route d'Orléans 91310 Montlhéry",
    "14 rue Carnot 78000 Versailles",
    "avenue St Cloud 78000 Versailles",
    "12 rue Arthur Brière 75017 Paris",
    "1 rue Plaine 75020 Paris",
    "43 avenue René Minier 95250 Beauchamp",
    "17 boulevard Beaumarchais 75004 Paris",
    "26 rue Cheminots 75018 Paris",
    "69 rue Henri Barbusse 92110 Clichy",
    "22 rue Godefroy 92800 Puteaux",
    "12 rue Landy 93300 Aubervilliers",
    "40 avenue St Ouen 75018 Paris",
    "2 rue St Laurent 75010 Paris",
    "47 avenue Versailles 75016 Paris",
    "10 avenue Gambetta 75020 Paris",
    "26 avenue République 94700 Maisons Alfort",
    "495 rue Vallée 78410 Bouafle",
    "6 rue Tilleuls 78960 Voisins le Bretonneux",
    "2 rue St Nicolas 78600 Maisons Laffitte",
    "45 Bis voie Latérale Sud 78310 Coignières",
    "25 rue Crozatier 75012 Paris",
    "65 avenue Daumesnil 75012 Paris",
    "40 rue Marat 94200 Ivry sur Seine",
    "23 rue Robert Dupont 92600 Asnières sur Seine",
    "59 rue Victor Hugo 93170 Bagnolet",
    "6 allée Bernard Palissy 95200 Sarcelles",
    "84 avenue Georges Clemenceau 94700 Maisons Alfort",
    "14 rue Paroisse 77300 Fontainebleau",
    "9 rue Rome 77144 Montévrain",
    "10 rue Indépendance 92700 Colombes",
    "60 grande rue Charles de Gaulle 94130 Nogent sur Marne",
    "51 rue Ordener 75018 Paris",
    "1 rue Cutesson 78125 Gazeran",
    "36 Ter rue Paris 94470 Boissy Saint Léger",
    "9 rue Auguste Gervais 92130 Issy les Moulineaux",
    "192 rue Jean Jaurès, 93230 Romainville",
    "bis 37 rue Bac, 94480 Ablon sur Seine",
    "3 boulevard Victor, 75015 Paris",
    "2 rue République, 95270 Chaumontel",
    "Gare De Nogent Le Perreux 1 place Thêatre, 94130 Nogent sur Marne",
    "18 rue Jean Longuet, 92290 Châtenay Malabry",
    "90 avenue Daumesnil, 75012 Paris",
    "5 avenue Gabriel Péri, 92500 Rueil Malmaison",
    "41 boulevard Ménilmontant, 75011 Paris",
    "159 rue Verdun, 92150 Suresnes",
    "Zac Champlys 575 avenue André Ampère, 77190 Dammarie les Lys",
    "2 rue Albert Priolet, 78100 Saint Germain en Laye",
    "84 chemin Rambouillet, 78450 Villepreux",
    "2 avenue Jean Jaurès, 78500 Sartrouville",
    "40 rue Verrerie, 75004 Paris",
    "22 avenue Léon Bollée, 75013 Paris",
    "zone d'aménagement concerté Noyer aux Perdrix, 77170 Servon",
    "157 avenue France, 75013 Paris",
    "33 avenue Secrétan, 75019 Paris",
    "2 rue Joseph Lemarchand, 78114 Magny les Hameaux"
]

# Convertir les adresses en coordonnées géographiques
for address in addresses:
    coordinates = get_coordinates(address)
    if coordinates:
        latitude, longitude = coordinates
        print(f"Adresse: {address}")
        print(f"Latitude: {latitude}")
        print(f"Longitude: {longitude}")
        print("------------------------")
    else:
        print(f"Impossible de trouver les coordonnées pour l'adresse: {address}")
        print("------------------------")
