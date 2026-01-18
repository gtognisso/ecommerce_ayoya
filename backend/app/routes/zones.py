from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["zones"])

ZONES = [
    {"id": "centre", "name": "Cotonou Centre (Ganhi, Jonquet, Zongo)"},
    {"id": "akpakpa", "name": "Akpakpa (Agbodjèdo, PK3, Sègbèya)"},
    {"id": "cadjehoun", "name": "Cadjèhoun (Haie Vive, Patte d'Oie)"},
    {"id": "gbegamey", "name": "Gbégamey (Zogbo, Mènontin)"},
    {"id": "fifadji", "name": "Fifadji (Gbèto, Missèbo)"},
    {"id": "fidjrosse", "name": "Fidjrossè (Cocotiers, Plage)"},
    {"id": "godomey", "name": "Godomey (Togoudo, Atrokpocodji)"},
    {"id": "calavi", "name": "Abomey-Calavi (Zogbadjè, Tankpè)"}
]


@router.get("/public/zones")
async def get_zones():
    return ZONES
