<div align="center">
  <a href="https://www.hessian.ai">
    <img src="https://hessian.ai/wp-content/themes/hessianai/img/hessian-ai-logo.svg" alt="hessian.AI" width="500" height="auto" />
  </a>
  <p align="center">
    <b>A HUB FOR IDEAS THAT SHAPE TOMORROW</b>
  </p>
</div>

<hr />

# Hessian AI Researcher Hub


Das **Hessian AI Researcher Hub** ist eine Plattform zum Sammeln, Verwalten und Präsentieren von wissenschaftlichen Arbeiten aus verschiedenen APIs. Das Projekt wird im Rahmen des Bachelorpraktikums im Auftrag von hessian.AI entwickelt. Ziel ist es, relevante Papers von Hessian AI zu sammeln, die wichtigsten Metadaten zu speichern und die Informationen auf einer ansprechenden Website darzustellen.

## Ziel des Projekts

Das Hauptziel des Projekts ist es, eine benutzerfreundliche und effiziente Möglichkeit zur Interaktion mit wissenschaftlichen Arbeiten zu schaffen, die die Forschung und das Verständnis von Hessian AI und den damit verbundenen Themen fördert.

## Technologien

- **Backend**: Python, FastAPI
- **Datenbank**: MongoDB
- **Frontend**: HTML, LESS, TypeScript, Angular
- **API Integration**: Verbindung zu verschiedenen APIs zur Sammlung von Paper-Metadaten (z.B. Arxiv, PubMed, etc.)
- **Chatbot**: LLM zur Verarbeitung von Anfragen und zur Interaktion mit den Nutzern


---

## Voraussetzungen
### Allgemein
- **Python** (mindestens Version 3.8)
- **FastAPI** als Backend-Framework
- **uvicorn** als ASGI-Server

### Für macOS-Nutzer
1. **Prüfen, ob Python installiert ist**
   ```bash
   python3 --version
   ```
2. **Python installieren (falls nicht vorhanden)**
   ```bash
   brew install python
   ```
3. **Installation überprüfen**
   ```bash
   python3 --version
   ```

---

## Setup und Installation
### Frontend einrichten
1. Installiere Node Version Manager (MacOS & Linux):

    https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating
    
    (Windows)

    https://github.com/coreybutler/nvm-windows/releases

2. Installiere die richtige NPM Version
    ```bash
        nvm install 22.11.0
    ```
3. und aktiviere diese
    ```bash
        nvm use 22.11.0
    ```
4. Installiere angular cli
    ```bash
        npm i -g @angular/cli
    ```
5.  Installiere aus dem Projektordner alle dependencies
    ```bash
        npm install
    ```
6.  Navigiere in das Hauptverzeichnis des Projekts:
    ```bash
        cd h.Ai-frontend
    ```
7. Starte das Frontend 
    ```bash
        ng serve
    ```

Der Server läuft jetzt unter http://localhost:4200/

Damit Daten angezeigt werden können muss der Backendserver richtig konfiguriert und gestartet sein. Siehe dazu die Github Seite unseres [Backends](https://github.com/akyetisir/hessian.Ai-research_hub_backend)

---


## Mitwirkende
- Manuel Kolle
- Pham Diep Anh Le
- Yusuf Sahin
- Ahmet Yetisir
- Max Zimmerer

---

## Lizenz
Dieses Projekt steht unter der Open Source Lizenz

---

## Kontakt
Für Fragen oder Feedback, kontaktiere uns unter [m.kolle.97@googlemail.com](mailto:m.kolle.97@googlemail.com).