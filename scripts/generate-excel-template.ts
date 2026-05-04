import ExcelJS from "exceljs";
import * as fs from "fs";
import * as path from "path";

async function generateExcelTemplate() {
  const workbook = new ExcelJS.Workbook();

  // Categories Sheet
  const categoriesSheet = workbook.addWorksheet("Catégories");
  categoriesSheet.columns = [
    { header: "Nom", key: "name", width: 30 },
    { header: "Description", key: "description", width: 50 },
    { header: "Ordre d'affichage", key: "order", width: 15 },
    { header: "URL Image", key: "image", width: 50 },
  ];

  // Style header row
  categoriesSheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  categoriesSheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF1E40AF" },
  };

  // Add sample data
  categoriesSheet.addRow({
    name: "Football",
    description: "Équipements et vêtements de football",
    order: 1,
    image: "https://example.com/football.jpg",
  });

  categoriesSheet.addRow({
    name: "Basketball",
    description: "Équipements et vêtements de basketball",
    order: 2,
    image: "https://example.com/basketball.jpg",
  });

  // Products Sheet
  const productsSheet = workbook.addWorksheet("Produits");
  productsSheet.columns = [
    { header: "Nom du produit", key: "name", width: 30 },
    { header: "Description", key: "description", width: 50 },
    { header: "Catégorie", key: "categoryName", width: 20 },
    { header: "Prix (en centimes)", key: "price", width: 15 },
    { header: "Prix comparaison (optionnel)", key: "compareAtPrice", width: 20 },
    { header: "Stock", key: "stock", width: 10 },
    { header: "En vedette?", key: "featured", width: 12 },
    { header: "Actif?", key: "active", width: 10 },
    { header: "URLs Images (séparées par ;)", key: "images", width: 50 },
  ];

  // Style header row
  productsSheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  productsSheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF1E40AF" },
  };

  // Add sample data
  productsSheet.addRow({
    name: "Ballon de Football Professionnel",
    description: "Ballon de football de haute qualité pour compétition",
    categoryName: "Football",
    price: 15000,
    compareAtPrice: 20000,
    stock: 50,
    featured: true,
    active: true,
    images: "https://example.com/ball1.jpg;https://example.com/ball2.jpg",
  });

  productsSheet.addRow({
    name: "Chaussures de Basketball",
    description: "Chaussures de basketball confortables et durables",
    categoryName: "Basketball",
    price: 45000,
    compareAtPrice: 60000,
    stock: 30,
    featured: false,
    active: true,
    images: "https://example.com/shoes1.jpg",
  });

  // Instructions Sheet
  const instructionsSheet = workbook.addWorksheet("Instructions");
  instructionsSheet.columns = [{ header: "Instructions", key: "text", width: 100 }];

  const instructions = [
    "GUIDE DE REMPLISSAGE DU FORMULAIRE",
    "",
    "FEUILLE CATÉGORIES:",
    "• Nom: Le nom de la catégorie (ex: Football, Basketball, Tennis)",
    "• Description: Description courte de la catégorie",
    "• Ordre d'affichage: Numéro pour l'ordre d'affichage (1, 2, 3, etc.)",
    "• URL Image: Lien complet vers l'image de la catégorie (https://...)",
    "",
    "FEUILLE PRODUITS:",
    "• Nom du produit: Nom complet du produit",
    "• Description: Description détaillée du produit",
    "• Catégorie: Doit correspondre exactement à un nom de catégorie",
    "• Prix: Prix en centimes (ex: 15000 = 150 €)",
    "• Prix comparaison: Prix barré (optionnel, en centimes)",
    "• Stock: Quantité disponible",
    "• En vedette?: Oui ou Non (affichage en avant)",
    "• Actif?: Oui ou Non (produit visible ou caché)",
    "• URLs Images: Liens séparés par des points-virgules (;)",
    "",
    "NOTES IMPORTANTES:",
    "• Ne modifiez pas les en-têtes des colonnes",
    "• Assurez-vous que les catégories existent avant d'ajouter des produits",
    "• Les URLs d'images doivent être complètes (commencer par https://)",
    "• Les prix doivent être des nombres entiers (pas de décimales)",
  ];

  instructions.forEach((instruction) => {
    instructionsSheet.addRow({ text: instruction });
  });

  // Style instructions
  instructionsSheet.getRow(1).font = { bold: true, size: 14 };
  const boldRows = [3, 9, 19];
  boldRows.forEach((rowNum) => {
    instructionsSheet.getRow(rowNum).font = { bold: true, size: 12 };
  });

  // Save file
  const outputPath = path.join(
    process.cwd(),
    "public",
    "dakar-sport-shop-template.xlsx"
  );

  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ Fichier Excel généré: ${outputPath}`);
}

generateExcelTemplate().catch(console.error);
