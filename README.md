# Full Stack SPA(Single Page Application) 

## Tehnologii folosite:
- **Language:** ***JavaScript***
- **Backend:**  ***Node.js*** cu framework-ul ***Express*** pentru crearea de ***API-uri RESTful***
- **Fronted:**  ***React*** pentru construirea interfeței utilizator, împreună cu ***CSS(Cascade Style Sheets)*** pentru stilizare și ***HTML*** pentru structura paginii
- **RDBMS:** ***SQLite*** cu ORM-ul ***Sequelize*** pentru manipularea datelor 

## Tema aplicatiei :
- Aplicația permite comunicarea dintre membri unei echipe ce se ocupa de gestionarea bug-urilor dintr-o aplicatie.
- Platforma este bazată pe o aplicație web cu arhitectură de tip Single Page Application
accesibilă în browser de pe desktop.


### Functionalitati implementate: 
- Un student trebuie se poate conecta la aplicație cu un cont bazat pe o adresă de email.
- Un student membru în echipa unui proiect (MP)inregistra un proiect software pentru
a fi monitorizat prin aplicație, specificând repository-ul proiectului și echipa de proiect.
- Un student care nu face parte dintr-un proiect înregistrat se poate adauga ca tester (TST) la
proiect.
- Ca TST se poate înregistra un bug în aplicație. Bug-ul conține o severitate, o prioritate de
rezolvare, o descriere și un link la commit-ul la care se referă.
- Ca MP se pot vedea bug-urile înregistrate pentru proiectele partase.
- Un MP poate aloca rezolvarea unui bug. Un singur MP poate să aibă alocată rezolvarea
unui bug la un moment dat.
- Un MP, după rezolvarea unui bug, poate adăuga un status al rezolvării cu un link la commit-ul
prin care s-a rezolvat. 
