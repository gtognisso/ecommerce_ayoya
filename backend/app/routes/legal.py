"""
Endpoints pour la gestion des contenus légaux (CGU, CGV)
"""

from fastapi import APIRouter, Depends, HTTPException, status
from pathlib import Path
import json
from datetime import datetime

from app.auth import verify_token
from app.legal_content import CGU_CONTENT, CGV_CONTENT, LEGAL_METADATA

router = APIRouter()

LEGAL_CONFIG_DIR = Path("/app/config")
LEGAL_CONFIG_DIR.mkdir(exist_ok=True)
LEGAL_CONFIG_FILE = LEGAL_CONFIG_DIR / "legal.json"


def load_legal_config():
    """Charge la configuration légale depuis le fichier"""
    if LEGAL_CONFIG_FILE.exists():
        with open(LEGAL_CONFIG_FILE) as f:
            return json.load(f)
    return {
        "cgu": CGU_CONTENT,
        "cgv": CGV_CONTENT,
        "metadata": LEGAL_METADATA,
        "last_updated": datetime.now().isoformat(),
        "custom_sections": {}
    }


def save_legal_config(config):
    """Sauvegarde la configuration légale dans le fichier"""
    with open(LEGAL_CONFIG_FILE, "w") as f:
        json.dump(config, f, indent=2, ensure_ascii=False)


# ==================== ENDPOINTS PUBLICS ====================

@router.get("/api/public/cgu")
async def get_cgu():
    """
    Récupère les Conditions Générales d'Utilisation
    Endpoint public - accès libre
    """
    config = load_legal_config()
    return {
        "type": "CGU",
        "title": "Conditions Générales d'Utilisation",
        "content": config["cgu"],
        "last_updated": config["last_updated"],
        "business_name": config["metadata"]["business_name"],
        "business_phone": config["metadata"]["business_phone"],
        "business_email": config["metadata"]["business_email"]
    }


@router.get("/api/public/cgv")
async def get_cgv():
    """
    Récupère les Conditions Générales de Vente
    Endpoint public - accès libre
    """
    config = load_legal_config()
    return {
        "type": "CGV",
        "title": "Conditions Générales de Vente",
        "content": config["cgv"],
        "last_updated": config["last_updated"],
        "business_name": config["metadata"]["business_name"],
        "business_phone": config["metadata"]["business_phone"],
        "business_email": config["metadata"]["business_email"]
    }


@router.get("/api/public/legal/info")
async def get_legal_info():
    """
    Récupère les informations légales de l'entreprise
    Endpoint public - accès libre
    """
    config = load_legal_config()
    return {
        "metadata": config["metadata"],
        "last_updated": config["last_updated"]
    }


@router.get("/api/public/legal/full")
async def get_full_legal():
    """
    Récupère CGU + CGV + informations légales
    Endpoint public - accès libre
    """
    config = load_legal_config()
    return {
        "cgu": config["cgu"],
        "cgv": config["cgv"],
        "metadata": config["metadata"],
        "last_updated": config["last_updated"],
        "legal_references": config["metadata"].get("legal_references", [])
    }


# ==================== ENDPOINTS ADMIN ====================

@router.get("/api/admin/legal")
async def admin_get_legal(token: str = Depends(verify_token)):
    """
    Récupère toute la configuration légale (admin)
    Nécessite authentification
    """
    config = load_legal_config()
    return {
        "cgu": config["cgu"],
        "cgv": config["cgv"],
        "metadata": config["metadata"],
        "last_updated": config["last_updated"],
        "custom_sections": config.get("custom_sections", {}),
        "version": config["metadata"]["version"]
    }


@router.get("/api/admin/legal/cgu")
async def admin_get_cgu(token: str = Depends(verify_token)):
    """
    Récupère uniquement les CGU (admin)
    Nécessite authentification
    """
    config = load_legal_config()
    return {
        "content": config["cgu"],
        "last_updated": config["last_updated"],
        "type": "CGU"
    }


@router.get("/api/admin/legal/cgv")
async def admin_get_cgv(token: str = Depends(verify_token)):
    """
    Récupère uniquement les CGV (admin)
    Nécessite authentification
    """
    config = load_legal_config()
    return {
        "content": config["cgv"],
        "last_updated": config["last_updated"],
        "type": "CGV"
    }


@router.put("/api/admin/legal/cgu")
async def admin_update_cgu(
    update: dict,
    token: str = Depends(verify_token)
):
    """
    Met à jour les Conditions Générales d'Utilisation
    Nécessite authentification

    Body: {"content": "Nouveau contenu CGU"}
    """
    if "content" not in update:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Le champ 'content' est obligatoire"
        )

    config = load_legal_config()
    config["cgu"] = update["content"]
    config["last_updated"] = datetime.now().isoformat()

    save_legal_config(config)

    return {
        "message": "CGU mise à jour avec succès",
        "type": "CGU",
        "updated_at": config["last_updated"]
    }


@router.put("/api/admin/legal/cgv")
async def admin_update_cgv(
    update: dict,
    token: str = Depends(verify_token)
):
    """
    Met à jour les Conditions Générales de Vente
    Nécessite authentification

    Body: {"content": "Nouveau contenu CGV"}
    """
    if "content" not in update:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Le champ 'content' est obligatoire"
        )

    config = load_legal_config()
    config["cgv"] = update["content"]
    config["last_updated"] = datetime.now().isoformat()

    save_legal_config(config)

    return {
        "message": "CGV mise à jour avec succès",
        "type": "CGV",
        "updated_at": config["last_updated"]
    }


@router.put("/api/admin/legal")
async def admin_update_legal(
    update: dict,
    token: str = Depends(verify_token)
):
    """
    Met à jour la configuration légale complète
    Nécessite authentification

    Body: {
        "cgu": "Nouvelle CGU",
        "cgv": "Nouvelle CGV",
        "metadata": {...}
    }
    """
    config = load_legal_config()

    if "cgu" in update:
        config["cgu"] = update["cgu"]

    if "cgv" in update:
        config["cgv"] = update["cgv"]

    if "metadata" in update:
        config["metadata"].update(update["metadata"])

    if "custom_sections" in update:
        config["custom_sections"] = update["custom_sections"]

    config["last_updated"] = datetime.now().isoformat()

    save_legal_config(config)

    return {
        "message": "Configuration légale mise à jour avec succès",
        "updated_at": config["last_updated"],
        "sections_updated": list(update.keys())
    }


@router.post("/api/admin/legal/custom-section")
async def admin_add_custom_section(
    section: dict,
    token: str = Depends(verify_token)
):
    """
    Ajoute une section légale personnalisée
    Nécessite authentification

    Body: {
        "key": "nom_section",
        "title": "Titre de la section",
        "content": "Contenu de la section"
    }
    """
    if not all(k in section for k in ["key", "title", "content"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Les champs 'key', 'title' et 'content' sont obligatoires"
        )

    config = load_legal_config()

    if "custom_sections" not in config:
        config["custom_sections"] = {}

    config["custom_sections"][section["key"]] = {
        "title": section["title"],
        "content": section["content"],
        "created_at": datetime.now().isoformat()
    }

    config["last_updated"] = datetime.now().isoformat()
    save_legal_config(config)

    return {
        "message": "Section personnalisée ajoutée avec succès",
        "section_key": section["key"],
        "updated_at": config["last_updated"]
    }


@router.delete("/api/admin/legal/custom-section/{section_key}")
async def admin_delete_custom_section(
    section_key: str,
    token: str = Depends(verify_token)
):
    """
    Supprime une section légale personnalisée
    Nécessite authentification
    """
    config = load_legal_config()

    if "custom_sections" not in config or section_key not in config["custom_sections"]:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Section personnalisée non trouvée"
        )

    del config["custom_sections"][section_key]
    config["last_updated"] = datetime.now().isoformat()
    save_legal_config(config)

    return {
        "message": "Section personnalisée supprimée avec succès",
        "section_key": section_key,
        "updated_at": config["last_updated"]
    }


@router.get("/api/admin/legal/history")
async def admin_get_legal_history(token: str = Depends(verify_token)):
    """
    Récupère l'historique des mises à jour légales
    Nécessite authentification
    """
    config = load_legal_config()

    return {
        "last_updated": config["last_updated"],
        "metadata": config["metadata"],
        "sections": {
            "cgu": {"updated": config["last_updated"]},
            "cgv": {"updated": config["last_updated"]},
            "custom_sections": list(config.get("custom_sections", {}).keys())
        }
    }


@router.post("/api/admin/legal/reset")
async def admin_reset_legal(token: str = Depends(verify_token)):
    """
    Réinitialise la configuration légale aux valeurs par défaut
    Nécessite authentification
    ATTENTION: Opération irréversible
    """
    default_config = {
        "cgu": CGU_CONTENT,
        "cgv": CGV_CONTENT,
        "metadata": LEGAL_METADATA,
        "last_updated": datetime.now().isoformat(),
        "custom_sections": {}
    }

    save_legal_config(default_config)

    return {
        "message": "Configuration légale réinitialisée aux valeurs par défaut",
        "reset_at": default_config["last_updated"]
    }
